/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import {
    camelize,
    capitalize,
    converters,
    dashify,
    humanify,
    normalizeDeviceSpecification,
    packInfo,
    parseServiceSpecificationMarkdownToJSON,
    snakify,
    TYPESCRIPT_STATIC_NAMESPACE,
} from "./jdspec"
import { parseSpecificationTestMarkdownToJSON } from "./jdtest"
import { packetsToRegisters } from "./jdutils"

// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
declare var process: any
// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
declare var require: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fs: any

const makecodBuiltins = ["bootloader", "logger", "control"]

function values<T>(o: jdspec.SMap<T>): T[] {
    const r: T[] = []
    for (const k of Object.keys(o)) r.push(o[k])
    return r
}

function toPxtJson(spec: jdspec.ServiceSpec) {
    const { shortId, notes } = spec
    return JSON.stringify(
        {
            name: `jacdac-${shortId}`,
            version: "0.0.0",
            description: notes["short"],
            files: ["constants.ts", "client.g.ts"],
            testFiles: ["test.ts"],
            supportedTargets: ["arcade", "microbit", "maker"],
            dependencies: {
                core: "*",
                jacdac: "github:microsoft/pxt-jacdac",
            },
            testDependencies: {
                "nucleo-f411re": "*",
            },
        },
        null,
        4
    )
}

function pick(...values: number[]) {
    return values?.find(x => x !== undefined)
}

// add as needed
const reservedJsWords: { [index: string]: boolean } = {
    switch: true,
}

function tsify(name: string) {
    if (reservedJsWords[name]) {
        return name + "_"
    }
    return name
}

function toMakeCodeClient(spec: jdspec.ServiceSpec) {
    const { shortId, name, camelName, packets } = spec
    const Reading = 0x101
    const Intensity = 0x1
    const Value = 0x2

    const nsc = TYPESCRIPT_STATIC_NAMESPACE
    const registers = packetsToRegisters(packets)
    let baseType = "Client"
    const ctorArgs = [`${nsc}.SRV_${snakify(camelName).toUpperCase()}`, `role`]
    const reading = registers.find(reg => reg.identifier === Reading)
    const regs = registers.filter(r => !!r)
    const events = packets.filter(pkt => !pkt.derived && pkt.kind === "event")
    // TODO: pipes support
    const commands = packets.filter(
        pkt =>
            !pkt.derived &&
            pkt.kind === "command" &&
            pkt.fields.every(f => f.type !== "pipe")
    )

    // use sensor base class if reading present
    if (reading) {
        const { types } = packInfo(spec, reading, true, true)
        baseType = `SensorClient<[${types}]>`
        ctorArgs.push(`"${reading.packFormat}"`)
    }
    const className = `${capitalize(camelName)}Client`
    const group = capitalize(spec.group || name)

    const toMetaComments = (...lines: string[]) =>
        lines
            .filter(l => !!l)
            .map(l => "        //% " + l)
            .join("\n")
    let weight = 100

    return `namespace modules {
    /**
     * ${(spec.notes["short"] || "").split("\n").join("\n     * ")}
     **/
    //% fixedInstances blockGap=8
    export class ${className} extends jacdac.${baseType} {
${regs
    .filter(reg => reg.identifier !== Reading)
    .map(
        reg => `
        private readonly _${camelize(reg.name)} : jacdac.RegisterClient<[${
            packInfo(spec, reg, true, true).types
        }]>;`
    )
    .join("")}            

        constructor(role: string) {
            super(${ctorArgs.join(", ")});
${regs
    .filter(reg => reg.identifier !== Reading)
    .map(
        reg => `
            this._${camelize(reg.name)} = this.addRegister<[${
            packInfo(spec, reg, true, true).types
        }]>(${nsc}.${capitalize(spec.camelName)}Reg.${capitalize(
            camelize(reg.name)
        )}, "${reg.packFormat}");`
    )
    .join("")}            
        }
    
${regs
    .map(reg => {
        const { types } = packInfo(spec, reg, true, true)
        const { fields } = reg
        const isReading = reg.identifier === Reading
        const fieldName = `this._${isReading ? "reading" : camelize(reg.name)}`
        const enabled =
            reg.identifier === Intensity &&
            reg.name === "enabled" &&
            reg.fields.length === 1 &&
            reg.fields[0].type === "bool"
        const hasBlocks =
            reg.identifier == Reading ||
            reg.identifier == Intensity ||
            reg.identifier == Value

        return fields
            .map((field, fieldi) => {
                const name =
                    field.name === "_"
                        ? reg.name
                        : isReading
                        ? field.name
                        : `${reg.name}${capitalize(field.name)}`
                const min = pick(
                    field.typicalMin,
                    field.absoluteMin,
                    field.unit === "/"
                        ? field.type[0] === "i"
                            ? -1
                            : 0
                        : undefined
                )
                const max = pick(
                    field.typicalMax,
                    field.absoluteMax,
                    field.unit === "/" ? 1 : undefined
                )
                const defl = field.defaultValue

                return `
        /**
        * ${(reg.description || "").split("\n").join("\n        * ")}
        */
${toMetaComments(
    "callInDebugger",
    `group="${group}"`,
    hasBlocks && `block="%${shortId} ${humanify(name)}"`,
    hasBlocks && `blockId=jacdac_${shortId}_${reg.name}_${field.name}_get`,
    `weight=${weight--}`
)}
        ${camelize(name)}(): ${types[fieldi]} {${
                    isReading
                        ? `
            this.setStreaming(true);`
                        : `
            this.start();`
                }            
            const values = ${fieldName}.pauseUntilValues() as any[];
            return ${field.type === "bool" ? "!!" : ""}values[${fieldi}];
        }
${
    reg.kind === "rw"
        ? `
        /**
        * ${(reg.description || "").split("\n").join("\n        * ")}
        */
${toMetaComments(
    `group="${group}"`,
    hasBlocks && `blockId=jacdac_${shortId}_${reg.name}_${field.name}_set`,
    hasBlocks &&
        `block="${
            enabled
                ? `set %${shortId} %value=toggleOnOff`
                : `set %${shortId} ${humanify(name)} to %value`
        }"`,
    `weight=${weight--}`,
    min !== undefined && `value.min=${min}`,
    max !== undefined && `value.max=${max}`,
    defl !== undefined && `value.defl=${defl}`
)}
        set${capitalize(camelize(name))}(value: ${types[fieldi]}) {
            this.start();
            const values = ${fieldName}.values as any[];
            values[${fieldi}] = ${
              field.type === "bool" ? "value ? 1 : 0" : "value"
          };
            ${fieldName}.values = values as [${types}];
        }
`
        : ""
}`
            })
            .join("")
    })
    .join("")} 
${events
    .map(event => {
        return `
        /**
         * ${(event.description || "").split("\n").join("\n        * ")}
         */
${toMetaComments(
    `group="${group}"`,
    `blockId=jacdac_on_${spec.shortId}_${event.name}`,
    `block="on %${shortId} ${humanify(event.name)}"`,
    `weight=${weight--}`
)}
        on${capitalize(camelize(event.name))}(handler: () => void): void {
            this.registerEvent(${nsc}.${capitalize(
                spec.camelName
            )}Event.${capitalize(camelize(event.name))}, handler);
        }`
    })
    .join("")}
${commands
    .map(command => {
        const { name } = command
        const { types } = packInfo(spec, command, true, true)
        const { fields } = command
        const fnames = fields.map(f => camelize(f.name))
        const cmd = `${nsc}.${capitalize(spec.camelName)}Cmd.${capitalize(
            camelize(command.name)
        )}`
        const fmt = command.packFormat
        return `
        /**
        * ${(command.description || "").split("\n").join("\n        * ")}
        */
${toMetaComments(
    `group="${group}"`,
    `blockId=jacdac_${shortId}_${command.name}_cmd`,
    `block="%${shortId} ${humanify(name)}"`,
    `weight=${weight--}`
)}
        ${camelize(name)}(${fnames
            .map((fname, fieldi) => `${fname}: ${types[fieldi]}`)
            .join(", ")}): void {
            this.start();
            this.sendCommand(jacdac.JDPacket.${
                types.length === 0
                    ? `onlyHeader(${cmd})`
                    : `jdpacked(${cmd}, "${fmt}", [${fnames.join(", ")}])`
            })
        }
`
    })
    .join("")}    
    }
    //% fixedInstance whenUsed
    export const ${tsify(spec.camelName)} = new ${className}("${humanify(
        spec.camelName
    )}");
}`
}

function processSpec(dn: string) {
    const path = require("path")

    console.log("processing directory " + dn + "...")
    const files: string[] = fs.readdirSync(dn)
    const includes: jdspec.SMap<jdspec.ServiceSpec> = {}
    files.sort()
    // ensure _system is first
    files.splice(files.indexOf("_system.md"), 1)
    files.unshift("_system.md")

    const outp = path.join(dn, "generated")
    mkdir(outp)
    for (const n of Object.keys(converters())) mkdir(path.join(outp, n))

    // generate makecode file structure
    const mkcdir = path.join(outp, "makecode")
    mkdir(mkcdir)
    const mkcdServices: jdspec.MakeCodeServiceInfo[] = []
    const pxtJacdacDir = path.join(dn, "..", "..", "pxt-jacdac")

    const fmtStats: { [index: string]: number } = {}
    const concats: jdspec.SMap<string> = {}
    const markdowns: jdspec.ServiceMarkdownSpec[] = []
    const tests: jdtest.ServiceTestSpec[] = []
    for (const fn of files) {
        if (!/\.md$/.test(fn) || fn[0] == ".") continue
        console.log(`process ${fn}`)
        const cont = readString(dn, fn)
        const json = parseServiceSpecificationMarkdownToJSON(cont, includes, fn)
        const key = fn.replace(/\.md$/, "")
        includes[key] = json

        markdowns.push({
            classIdentifier: json.classIdentifier,
            shortId: json.shortId,
            source: cont,
        })

        json.packets
            .map(pkt => pkt.packFormat)
            .filter(fmt => !!fmt)
            .forEach(fmt => (fmtStats[fmt] = (fmtStats[fmt] || 0) + 1))

        reportErrors(json.errors, dn, fn)

        // check if there is a test for this service
        const testFile = path.join(dn, "tests", fn)
        if (fs.existsSync(testFile)) {
            const testCont = readString(testFile, "")
            const testJson = parseSpecificationTestMarkdownToJSON(
                testCont,
                json
            )
            reportErrors(testJson.errors, path.join(dn, "tests"), fn)
            tests.push(testJson)

            const cfn = path.join(outp, "json", fn.slice(0, -3) + ".test")
            fs.writeFileSync(cfn, JSON.stringify(testJson, null, 2))
            console.log(`written ${cfn}`)
        }

        // check if there is a makecode project folder for this service
        const mkcdsrvdirname = dashify(json.camelName)
        const mkcdpxtjson = path.join(pxtJacdacDir, mkcdsrvdirname, "pxt.json")
        const hasMakeCodeProject = fs.existsSync(mkcdpxtjson)
        console.log(`check exists ${mkcdpxtjson}: ${hasMakeCodeProject}`)

        if (hasMakeCodeProject) {
            mkcdServices.push({
                service: json.shortId,
                client: {
                    name: `jacdac-${mkcdsrvdirname}`,
                    repo: `microsoft/pxt-jacdac/${mkcdsrvdirname}`,
                    qName: `modules.${capitalize(json.camelName)}Client`,
                    default: `modules.${json.camelName}`,
                },
            })
        }

        const cnv = converters()
        for (const n of Object.keys(cnv)) {
            const convResult = cnv[n](json)
            const ext = n == "sts" ? "ts" : n == "c" ? "h" : n

            const cfn = path.join(outp, n, fn.slice(0, -3) + "." + ext)
            fs.writeFileSync(cfn, convResult)
            console.log(`written ${cfn}`)
            if (!concats[n]) concats[n] = ""
            concats[n] += convResult

            if (n === "sts") {
                const mkcdclient = toMakeCodeClient(json)
                const srvdir = path.join(mkcdir, mkcdsrvdirname)
                mkdir(srvdir)
                fs.writeFileSync(path.join(srvdir, "constants.ts"), convResult)
                // generate project file and client template
                if (
                    mkcdclient &&
                    !/^_/.test(json.shortId) &&
                    makecodBuiltins.indexOf(json.shortId) < 0
                ) {
                    if (!hasMakeCodeProject)
                        fs.writeFileSync(
                            path.join(srvdir, "pxt.g.json"),
                            toPxtJson(json)
                        )
                    fs.writeFileSync(
                        path.join(srvdir, "client.g.ts"),
                        mkcdclient
                    )
                }
            }
        }
    }

    fs.writeFileSync(
        path.join(outp, "services-sources.json"),
        JSON.stringify(markdowns),
        "utf-8"
    )
    fs.writeFileSync(
        path.join(outp, "services.json"),
        JSON.stringify(values(includes)),
        "utf-8"
    )
    fs.writeFileSync(
        path.join(outp, "services-tests.json"),
        JSON.stringify(tests),
        "utf-8"
    )
    fs.writeFileSync(path.join(outp, "specconstants.ts"), concats["ts"])
    fs.writeFileSync(path.join(outp, "specconstants.sts"), concats["sts"])
    if (fs.existsSync(pxtJacdacDir))
        // only available locally
        fs.writeFileSync(
            path.join(outp, "../makecode-extensions.json"),
            JSON.stringify(mkcdServices, null, 2)
        )

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
    const todo = [upperName]
    while (todo.length) {
        const dir = todo.pop()
        const files: string[] = fs.readdirSync(dir)
        files.sort()
        for (const fn of files) {
            const f = path.join(dir, fn)
            const stat = fs.statSync(f)
            if (stat.isDirectory()) todo.push(f)
            else if (/\.json/.test(f)) {
                const dev = JSON.parse(readString(dir, fn)) as jdspec.DeviceSpec
                allDevices.push(normalizeDeviceSpecification(dev))
            }
        }
    }
    fs.writeFileSync(
        path.join("../dist", "devices.json"),
        JSON.stringify(allDevices, null, 2)
    )
}

function reportErrors(
    errors: jdspec.Diagnostic[],
    folderName: string,
    fn: string
) {
    if (!errors) return
    const path = require("path")
    for (const e of errors) {
        const fn2 = e.file ? path.join(folderName, e.file) : fn
        console.error(`${fn2}(${e.line}): ${e.message}`)
    }
    process.exit(1)
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
    } catch (e) {
        console.warn(e)
    }
}

if (typeof process != "undefined") nodeMain()
