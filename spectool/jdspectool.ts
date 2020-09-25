/// <reference path="jdspec.d.ts" />
import { converters, parseSpecificationMarkdownToJSON } from "./jdspec"

declare var process: any;
declare var require: any;

function values<T>(o: jdspec.SMap<T>): T[] {
    let r: T[] = []
    for (let k of Object.keys(o))
        r.push(o[k])
    return r
}

function nodeMain() {
    const fs = require("fs")
    const path = require("path")
    if (process.argv.length != 3) {
        console.error("usage: node spectool.js DIRECTORY")
        process.exit(1)
    }

    const dn = process.argv[2]
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
        const cont: string = fs.readFileSync(path.join(dn, fn), "utf8")
        const json = parseSpecificationMarkdownToJSON(cont, includes, fn)
        const key = fn.replace(/\.md$/, "")
        includes[key] = json

        if (json.errors) {
            for (let e of json.errors) {
                const fn2 = e.file ? path.join(dn, e.file) : fn
                console.error(`${fn2}(${e.line}): ${e.message}`)
            }
            process.exit(1)
        } else {
            const cnv = converters()
            for (let n of Object.keys(cnv)) {
                const convResult = cnv[n](json)
                fs.writeFileSync(path.join(outp, n, fn.slice(0, -3) + "." + n), convResult)
                if (!concats[n]) concats[n] = ""
                concats[n] += convResult
            }
        }
    }

    fs.writeFileSync(path.join(outp, "spec.json"), JSON.stringify(values(includes))
    fs.writeFileSync(path.join(outp, "specconstants.ts"), concats["ts"])

    function mkdir(n: string) {
        try {
            fs.mkdirSync(n, "777")
        } catch { }
    }
}

if (typeof process != "undefined")
    nodeMain();
