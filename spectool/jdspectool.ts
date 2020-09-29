/// <reference path="jdspec.d.ts" />
import { parseDeviceMarkdownToJSON } from "./devices";
import { converters, parseSpecificationMarkdownToJSON } from "./jdspec"

declare var process: any;
declare var require: any;
let fs: any

function values<T>(o: jdspec.SMap<T>): T[] {
    let r: T[] = []
    for (let k of Object.keys(o))
        r.push(o[k])
    return r
}

function processSpec(dn: string) {
    const path = require("path")

    console.log("processing directory " + dn + "...")
    const files: string[] = fs.readdirSync(dn)
    const includes: jdspec.SMap<jdspec.ServiceSpec> = {}
    files.sort()

    const outp = path.join(dn, "generated")
    mkdir(outp)
    for (let n of Object.keys(converters()))
        mkdir(path.join(outp, n))

    const concats: jdspec.SMap<string> = {}
    for (let fn of files) {
        if (!/\.md$/.test(fn) || fn[0] == ".")
            continue
        console.log(`process ${fn}`)
        const cont = readString(dn, fn)
        const json = parseSpecificationMarkdownToJSON(cont, includes, fn)
        const key = fn.replace(/\.md$/, "")
        includes[key] = json

        reportErrors(json.errors, dn, fn)
        const cnv = converters()
        for (let n of Object.keys(cnv)) {
            const convResult = cnv[n](json)
            fs.writeFileSync(path.join(outp, n, fn.slice(0, -3) + "." + n), convResult)
            if (!concats[n]) concats[n] = ""
            concats[n] += convResult
        }
    }

    fs.writeFileSync(path.join(outp, "services.json"), JSON.stringify(values(includes), null, 2))
    fs.writeFileSync(path.join(outp, "specconstants.ts"), concats["ts"])

}

function readString(folder: string, file: string) {
    const path = require("path")
    const cont: string = fs.readFileSync(path.join(folder, file), "utf8")
    return cont
}

function processDevices(upperName: string) {
    const path = require("path")

    console.log("processing devices in directory " + upperName + "...")
    const folders: string[] = fs.readdirSync(upperName)
    folders.sort()

    const defName = "_default.md"

    const allDevices: jdspec.DeviceSpec[] = []
    const usedIds: jdspec.SMap<string> = {}

    for (const folderBaseName of folders) {
        const folder = path.join(upperName, folderBaseName)
        const deflName = path.join(folder, defName)
        if (fs.existsSync(deflName)) {
            const defl = parseDeviceMarkdownToJSON(readString(folder, defName), null, usedIds, deflName)
            const devs = fs.readdirSync(folder)
            for (const dev of devs) {
                if (dev[0] != "_" && dev[0] != "." && /\.md$/.test(dev)) {
                    const fn = path.join(folder, dev)
                    const res = parseDeviceMarkdownToJSON(readString(folder, dev), defl, usedIds, fn)
                    reportErrors(res.errors, folder, dev)
                    const image = fn.replace(/\.md$/, ".jpg")
                    if (fs.existsSync(image))
                        res.image = folderBaseName + "/" + dev.replace(/\.md$/, ".jpg")
                    res.id = folderBaseName + "-" + dev.replace(/\.md$/, "")
                    allDevices.push(res)
                }
            }
        }
    }

    //for (const dev of allDevices)
    //    console.log(`0x${(dev.firmwares[0] || 0).toString(16)} ${dev.name}`)

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
