/// <reference path="jdspec.d.ts" />
import { camelize, capitalize, converters, dashify, humanify, normalizeDeviceSpecification, packInfo, parseServiceSpecificationMarkdownToJSON, snakify } from "./jdspec"

declare var process: any;
declare var require: any;
let fs: any

const builtins = [
    "control",
    "logger",
    "rolemanager"
]

function values<T>(o: jdspec.SMap<T>): T[] {
    let r: T[] = []
    for (let k of Object.keys(o))
        r.push(o[k])
    return r
}

function toPxtJson(spec: jdspec.ServiceSpec) {
    const { shortId, notes } = spec;
    return JSON.stringify({
        "name": `jacdac-${shortId}`,
        "version": "0.0.0",
        "description": notes["short"],
        "files": [
            "constants.ts",
            "client.ts"
        ],
        "testFiles": [
            "test.ts"
        ],
        "supportedTargets": [
            "arcade",
            "microbit",
            "maker"
        ],
        "dependencies": {
            "core": "*",
            "jacdac": "github:microsoft/pxt-jacdac"
        },
        "testDependencies": {
            "nucleo-f411re": "*"
        }
    }, null, 4);
}

function toMakeCodeClient(spec: jdspec.ServiceSpec) {
    const { shortId, name, camelName, packets } = spec;
    const Reading = 0x101;
    const registers = packets.filter(pkt => !pkt.derived && (pkt.kind === 'ro' || pkt.kind === 'rw' || pkt.kind === 'const'));
    let baseType = "Client";
    const ctorArgs = [
        `jacdac.SRV_${shortId.toUpperCase()}`,
        `role`
    ]
    const reading = registers.find(reg => reg.identifier === Reading);
    if (reading) {
        const { names, types } = packInfo(spec, reading, true);
        baseType = `SensorClient<[${types}]>`
        ctorArgs.push(`"${reading.packFormat}"`)
    }

    return `namespace modules {
    //% fixedInstances
    export class ${capitalize(camelName)}Client extends jacdac.${baseType} {
        constructor(role: string) {
            super(${ctorArgs.join(", ")});
        }
    
${registers.map(reg => {
        const { names, types } = packInfo(spec, reg, true);
        const array = types.length > 1
        const isReading = reg.identifier === Reading ;
        const useServiceName = isReading && camelize(reg.name) === spec.camelName;
        const name = useServiceName ? "reading" : camelize(reg.name);
        
        return `        /**
        * ${reg.description || ""}
        */
        //% blockId=jacdac${shortId}${reg.identifier.toString(16)} block="%sensor ${humanify(reg.name).toLowerCase()}"
        //% group="${name}"
        ${name}(): ${array ? `[${types}]` : types} {
            // ${names}
            const values = ${isReading ? "this.values()" : `jacdac.jdunpack<[${types}]>(this.??? , "${reg.packFormat}")`};
            return values${!array && " && values[0]"};
        }

`;
    }).join("")}            
    }

    //% fixedInstance whenUsed
    export const humidity = new HumidityClient("humidity");
}`;
}

function processSpec(dn: string) {
    const path = require("path")

    console.log("processing directory " + dn + "...")
    const files: string[] = fs.readdirSync(dn)
    const includes: jdspec.SMap<jdspec.ServiceSpec> = {}
    files.sort()
    // ensure _system is first
    files.splice(files.indexOf("_system.md"), 1);
    files.unshift("_system.md");

    const outp = path.join(dn, "generated")
    mkdir(outp)
    for (let n of Object.keys(converters()))
        mkdir(path.join(outp, n))

    // generate makecode file structure
    const mkcdir = path.join(outp, "makecode")
    mkdir(mkcdir)

    const fmtStats: { [index: string]: number; } = {};
    const concats: jdspec.SMap<string> = {}
    const markdowns: jdspec.ServiceMarkdownSpec[] = [];
    for (let fn of files) {
        if (!/\.md$/.test(fn) || fn[0] == ".")
            continue
        console.log(`process ${fn}`)
        const cont = readString(dn, fn)
        const json = parseServiceSpecificationMarkdownToJSON(cont, includes, fn)
        const key = fn.replace(/\.md$/, "")
        includes[key] = json

        markdowns.push({
            classIdentifier: json.classIdentifier,
            shortId: json.shortId,
            source: cont
        })

        json.packets.map(pkt => pkt.packFormat)
            .filter(fmt => !!fmt)
            .forEach(fmt => fmtStats[fmt] = (fmtStats[fmt] || 0) + 1);

        reportErrors(json.errors, dn, fn)
        const cnv = converters()
        for (let n of Object.keys(cnv)) {
            const convResult = cnv[n](json)
            const ext =
                n == "sts" ? "ts" :
                    n == "c" ? "h" :
                        n;

            const cfn = path.join(outp, n, fn.slice(0, -3) + "." + ext);
            fs.writeFileSync(cfn, convResult)
            console.log(`written ${cfn}`)
            if (!concats[n]) concats[n] = ""
            concats[n] += convResult

            if (n === "sts") {
                const srvdir = path.join(mkcdir, dashify(json.camelName))
                mkdir(srvdir);
                fs.writeFileSync(path.join(srvdir, "constants.ts"), convResult)
                // generate project file and client template
                fs.writeFileSync(path.join(srvdir, "pxt.json"), toPxtJson(json));
                fs.writeFileSync(path.join(srvdir, "client.ts"), toMakeCodeClient(json));
            }
        }
    }

    fs.writeFileSync(path.join(outp, "services-sources.json"), JSON.stringify(markdowns), "utf-8")
    fs.writeFileSync(path.join(outp, "services.json"), JSON.stringify(values(includes)), "utf-8")
    fs.writeFileSync(path.join(outp, "specconstants.ts"), concats["ts"])
    fs.writeFileSync(path.join(outp, "specconstants.sts"), concats["sts"])

    const fms = Object.keys(fmtStats).sort((l, r) => -fmtStats[l] + fmtStats[r])
    console.log(fms.map(fmt => `${fmt}: ${fmtStats[fmt]}`))
}

function readString(folder: string, file: string) {
    const path = require("path")
    const cont: string = fs.readFileSync(path.join(folder, file), "utf8")
    return cont
}

function processDevices(upperName: string) {
    const path = require("path")

    console.log("processing devices in directory " + upperName + "...")
    const allDevices: jdspec.DeviceSpec[] = []
    const todo = [upperName];
    while (todo.length) {
        const dir = todo.pop();
        const files: string[] = fs.readdirSync(dir)
        files.sort()
        for (const fn of files) {
            const f = path.join(dir, fn)
            const stat = fs.statSync(f)
            if (stat.isDirectory())
                todo.push(f);
            else if (/\.json/.test(f)) {
                const dev = JSON.parse(readString(dir, fn)) as jdspec.DeviceSpec;
                allDevices.push(normalizeDeviceSpecification(dev));
            }
        }
    }
    fs.writeFileSync(path.join("../dist", "devices.json"), JSON.stringify(allDevices, null, 2))
}

function reportErrors(errors: jdspec.Diagnostic[], folderName: string, fn: string) {
    if (!errors)
        return
    const path = require("path")
    for (let e of errors) {
        const fn2 = e.file ? path.join(folderName, e.file) : fn;
        console.error(`${fn2}(${e.line}): ${e.message}`);
    }
    process.exit(1);
}

function nodeMain() {
    fs = require("fs")
    const args: string[] = process.argv.slice(2)
    let deviceMode = false
    if (args[0] == "-d") {
        args.shift()
        deviceMode = true
    }
    if (args.length != 1) {
        console.error("usage: node spectool.js [-d] DIRECTORY")
        process.exit(1)
    }

    if (deviceMode) processDevices(args[0])
    else processSpec(args[0])
}

function mkdir(n: string) {
    try {
        fs.mkdirSync(n, "777")
    } catch { }
}

if (typeof process != "undefined")
    nodeMain();
