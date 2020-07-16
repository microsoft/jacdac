/*
Usage:
    tsc tools/spectool.ts && node tools/spectool.js services/
Files are written in services/generated
*/

type SMap<T> = { [v: string]: T; }
interface ServiceInfo {
    name: string;
    description: string;
    class: number;
    dependencies: string[];
    mode: string;
    enums: SMap<EnumInfo>;
    interfaces: SMap<InterfaceInfo>;
    errors?: Diagnostic[]; // possible parse errors
}

interface EnumInfo {
    name: string;
    storage: string;
    members: SMap<number>;
}

interface InterfaceInfo {
    // TODO drop "interface"
    kind: "report" | "command" | "control";
    name: string;
    hasNaturalAlignment: boolean;
    members: InterfaceMember[];
}

interface InterfaceMember {
    name: string;
    type: string;
    storage: string;
    fixedValue?: number;
    fixedValueName?: string;
}

interface Diagnostic {
    file: string;
    line: number;
    message: string;
}

function toJSON(filecontent: string, includes?: SMap<string>, filename = ""): ServiceInfo {
    let info: ServiceInfo = {
        name: "",
        mode: "",
        dependencies: [],
        description: "",
        class: 0,
        enums: {},
        interfaces: {},
    }

    let backticksType = ""
    let enumObject: EnumInfo = null
    let interfaceObject: InterfaceInfo = null
    let metadataObject: ServiceInfo = null
    let errors: Diagnostic[] = []
    let lineNo = 0

    try {
        for (let line of filecontent.split(/\n/)) {
            lineNo++
            processLine(line)
        }
    } catch (e) {
        error("exception: " + e.message)
    }

    if (errors.length)
        info.errors = errors
    return info

    function processLine(line: string) {
        if (!info.description) {
            const m = /^#([^#]+)/.exec(line)
            if (m) {
                info.description = m[1].trim()
                if (!info.name)
                    info.name = info.description.replace(/\s+/g, "")
            }
        }
        if (backticksType) {
            if (line.trim() == "```") {
                backticksType = null
                return
            }
        } else {
            const m = /^```(.*)/.exec(line)
            if (m) {
                backticksType = m[1] || "default"
                return
            }
        }

        if (backticksType == "default") {
            const expanded = line
                .replace(/\/\/.*/, "")
                .replace(/[:=,{};]+/g, s => " " + s + " ")
                .trim()
            if (!expanded)
                return
            const words = expanded.split(/\s+/)
            if (/^[;,]/.test(words[words.length - 1]))
                words.pop()
            let cmd = words[0]
            // allow for `command = Foo.Bar` etc (ie. command is not a keyword there)
            if (words[1] == ":" || words[1] == "=")
                cmd = "n/a"
            switch (cmd) {
                case "enum":
                    startEnum(words)
                    break
                case "metadata":
                    startMetadata(words)
                    break
                case "report":
                case "command":
                case "control":
                    startInterface(words)
                    break
                case "}":
                    if (interfaceObject) {
                        interfaceObject.hasNaturalAlignment = hasNaturalAlignment(interfaceObject)
                        interfaceObject = null
                    } else if (enumObject) {
                        enumObject = null
                    } else if (metadataObject) {
                        metadataObject = null
                    } else {
                        error("nothing to end here")
                    }
                    break
                default:
                    if (interfaceObject) interfaceMember(words)
                    else if (enumObject) enumMember(words)
                    else if (metadataObject) metadataMember(words)
                    else error("line outside of enum or interface")
            }
        }
    }


    function checkBraces(words: string[]) {
        if (enumObject || interfaceObject || metadataObject)
            error("already in braces")
        if (words) {
            if (words[2] != "{")
                error(`expecting: ${words[0]} NAME {`)
        }

        enumObject = null
        interfaceObject = null
        metadataObject = null
    }

    function startInterface(words: string[]) {
        checkBraces(words)
        interfaceObject = {
            kind: words[0] as any,
            name: normalizeName(words[1]),
            hasNaturalAlignment: false,
            members: []
        }
        if (info.interfaces[interfaceObject.name])
            error("interface redefinition")
        info.interfaces[interfaceObject.name] = interfaceObject
    }

    function interfaceMember(words: string[]) {
        if ((words[1] != "=" && words[1] != ":") || words.length != 3)
            return error(`expecting: FILD_NAME : TYPE or FILED_NAME = ENUM_MEMBER`)
        let tp = ""
        let fixedValue: number = undefined
        let fixedValueName: string = undefined

        if (words[1] == "=") {
            const w = words[2].split(/\./)
            if (w.length != 2)
                return error(`expecting enum member here`)
            const en = info.enums[w[0]]
            if (!en)
                return error(`${w[0]} is not an enum type`)
            tp = w[0]
            if (!en.members.hasOwnProperty(w[1]))
                return error(`${w[1]} is not a member of ${w[0]}`)
            fixedValueName = words[2]
            fixedValue = en.members[w[1]]
        } else
            tp = words[2]

        interfaceObject.members.push({
            name: normalizeName(words[0]),
            type: normalizeType(tp),
            storage: storageTypeFor(tp),
            fixedValue,
            fixedValueName
        })
    }

    function startEnum(words: string[]) {
        checkBraces(null)
        if (words[2] != ":" || words[4] != "{")
            error("expecting: enum NAME : TYPE {")
        enumObject = {
            name: normalizeName(words[1]),
            storage: normalizeStorageType(words[3]),
            members: {}
        }
        if (info.enums[enumObject.name])
            error("enum redefinition")
        info.enums[enumObject.name] = enumObject
    }


    function enumMember(words: string[]) {
        if (words[1] != "=" || words.length != 3)
            error(`expecting: FILD_NAME = INTEGER`)
        enumObject.members[normalizeName(words[0])] = parseIntCheck(words[2])
    }

    function startMetadata(words: string[]) {
        checkBraces(words)
        info.name = words[1]
        metadataObject = info
    }

    function parseIntCheck(w: string) {
        const v = parseInt(w)
        if (isNaN(v))
            error("expecting integer here")
        return v
    }

    function metadataMember(words: string[]) {
        if ((words[1] != "=" && words[1] != ":") || words.length != 3)
            error(`expecting: FILD_NAME = VALUE or FIELD_NAME : VALUE`)
        switch (words[0]) {
            case "inherits":
                processInclude(words[2])
                break
            case "mode":
                info.mode = words[2]
                break
            case "class":
            case "identifier":
                info.class = parseIntCheck(words[2])
                break
            case "dependencies":
                info.dependencies = words.slice(2)
                break
            default:
                error("unknown metadata field: " + words[0])
                break
        }
    }

    function processInclude(name: string) {
        if (!includes[name])
            return error("include file not found: " + name)
        const inner = toJSON(includes[name], includes, name)
        if (inner.errors)
            errors = errors.concat(inner.errors)
        info.enums = inner.enums
        info.interfaces = inner.interfaces
    }

    function error(msg: string) {
        if (!msg) msg = "syntax error"
        if (errors.some(e => e.line == lineNo && e.message == msg))
            return
        errors.push({ file: filename, line: lineNo, message: msg })
    }

    function normalizeName(n: string) {
        if (!/^\w+$/.test(n))
            error("expecting name here")
        return n
    }

    function normalizeStorageType(tp: string) {
        if (!tp) error("expecting type here")
        let tp2 = tp.replace(/_t$/, "")
        tp2 = tp2.toLowerCase()
        if (/u?int\d+/.test(tp2) || tp2 == "string")
            return tp2
        error("unknown type: " + tp)
    }

    function normalizeType(tp: string) {
        if (info.enums[tp])
            return tp
        return normalizeStorageType(tp)
    }

    function storageTypeFor(tp: string) {
        const norm = normalizeType(tp)
        if (info.enums[norm])
            return info.enums[norm].storage
        return norm
    }

    function hasNaturalAlignment(iface: InterfaceInfo) {
        let bitOffset = 0

        for (let m of iface.members) {
            let sz = bitSize(m.storage)
            if (sz == 0)
                continue
            if (bitOffset % sz != 0)
                return false
            bitOffset += sz
        }

        return true
    }
}

function values<T>(o: SMap<T>): T[] {
    let r: T[] = []
    for (let k of Object.keys(o))
        r.push(o[k])
    return r
}

function fail(msg: string) {
    throw new Error(msg)
}

function bitSize(tp: string) {
    const m = /^u?int(\d+)/.exec(tp)
    if (m) {
        return parseInt(m[1])
    }
    if (tp == "string")
        return 0
    fail("cannot determine size of " + tp)
    return 0
}

function toUpper(name: string) {
    return name.replace(/([a-z])([A-Z])/g, (x, a, b) => a + "_" + b).toUpperCase()
}

function packed(iface: InterfaceInfo) {
    if (iface.hasNaturalAlignment) return ""
    else return " __attribute__((packed))"
}

function toH(info: ServiceInfo) {
    let r = "// Autogenerated C header file for " + info.name + "\n"
    const hdDef = `_JACDAC_${toUpper(info.name)}_H`
    r += `#ifndef ${hdDef}\n`
    r += `#define ${hdDef} 1\n`
    for (let en of values(info.enums)) {
        const enPref = toUpper(en.name)
        r += `\n// enum ${en.name} (${en.storage}_t)\n`
        for (let k of Object.keys(en.members))
            r += "#define " + enPref + "_" + toUpper(k) + " " + en.members[k] + "\n"
    }
    for (let iface of values(info.interfaces)) {
        r += `\n// ${iface.kind} ${iface.name}\n`
        r += `typedef struct ${iface.name} {\n`
        for (let f of iface.members) {
            let def = ""
            if (f.storage == "string") {
                def = `char ${f.name}[0]`
            } else {
                def = `${f.storage}_t ${f.name}`
            }
            def += ";"
            if (f.storage != f.type)
                def += "  // " + f.type
            r += "    " + def + "\n"
        }
        r += `}${packed(iface)} ${iface.name};\n`
    }
    r += "\n#endif\n"
    return r
}

function toHPP(info: ServiceInfo) {
    let r = "// Autogenerated C++ header file for " + info.name + "\n"
    const hdDef = `_JACDAC_${toUpper(info.name)}_HPP`
    r += `#ifndef ${hdDef}\n`
    r += `#define ${hdDef} 1\n`
    for (let en of values(info.enums)) {
        r += `\nenum class ${en.name} : ${en.storage}_t {\n`
        for (let k of Object.keys(en.members))
            r += "    " + k + " = " + en.members[k] + ",\n"
        r += "}\n"
    }
    for (let iface of values(info.interfaces)) {
        r += `\n// ${iface.kind} ${iface.name}\n`
        r += `struct ${iface.name} {\n`
        for (let f of iface.members) {
            let def = ""
            if (f.storage == "string") {
                def = `char ${f.name}[0]`
            } else {
                if (f.storage != f.type)
                    def = `${f.type} ${f.name}`
                else
                    def = `${f.storage}_t ${f.name}`
            }
            def += ";"
            r += "    " + def + "\n"
        }
        r += `}${packed(iface)};\n`
    }
    r += "\n#endif\n"
    return r
}

const tsNumFmt = {
    uint8: "UInt8LE:B",
    uint16: "UInt16LE:H",
    uint32: "UInt32LE:L",
    int8: "Int8LE:b",
    int16: "Int16LE:h",
    int32: "Int32LE:l",
}

function toTS(info: ServiceInfo) {
    let r = "// Autogenerated TypeScript file for " + info.name + "\n"
    r += "namespace " + info.name + " {\n"
    for (let en of values(info.enums)) {
        r += `\nexport enum ${en.name} {\n`
        for (let k of Object.keys(en.members))
            r += "    " + k + " = " + en.members[k] + ",\n"
        r += "}\n"
    }
    for (let iface of values(info.interfaces)) {
        r += `\n// ${iface.kind} ${iface.name}\n`
        r += `export class ${iface.name} {\n`
        let offset = 0
        let stringMem = ""
        let fmtstring = "<"
        let intMems: string[] = []
        for (let f of iface.members) {
            let getter = ""
            let setter = ""
            if (f.storage == "string") {
                stringMem = f.name
                getter = `this._data.slice(${offset}).toString()`
            } else {
                intMems.push(f.name)
                let numf = tsNumFmt[f.storage]
                if (!numf)
                    fail("unknown storage type: " + f.storage)
                const [nn, py] = numf.split(":")
                fmtstring += py
                numf = "NumberFormat." + nn
                getter = `this._data.getNumber(${numf}, ${offset})`
                if (f.storage != f.type)
                    getter += " as " + f.type
                setter = `this._data.setNumber(${numf}, ${offset}, v)`
            }
            if (getter)
                r += `    get ${f.name}(): ${f.type} { return ${getter} }\n`
            if (setter)
                r += `    set ${f.name}(v: ${f.type}) { ${setter} }\n`
            offset += (bitSize(f.storage) + 7) >> 3
        }
        r += `    get byteSize() { return ${offset} }\n`
        r += `    constructor(public _data${stringMem ? "" : "?"}: Buffer) {\n`
        if (!stringMem)
            r += `         if (!this._data) this._data = control.createBuffer(${offset})\n`
        r += `    }\n`
        r += `}\n`

        r += `/* ALT option:\n`
        r += `const [${intMems.join(", ")}] = pins.unpackBuffer("${fmtstring}", buf)\n`
        if (stringMem)
            r += `const ${stringMem} = buf.slice(${offset})\n`
        r += `*/\n`
    }
    r += "\n} // end namespace\n"
    return r
}

declare var process: any;
declare var require: any;

function converters(): SMap<(s: ServiceInfo) => string> {
    return {
        "json": (j: ServiceInfo) => JSON.stringify(j, null, 2),
        "ts": toTS,
        "c": toH,
        "cpp": toHPP,
    }
}

function nodeMain() {
    const fs = require("fs")
    const path = require("path")
    if (process.argv.length != 3) {
        console.error("usage: node spectool.js DIRECTORY")
        process.exit(1)
    }

    const dn = process.argv[2]
    console.log("processing diretory " + dn + "...")
    const files: string[] = fs.readdirSync(dn)
    const includes: SMap<string> = {}
    files.sort()
    files.reverse()

    const outp = path.join(dn, "generated")
    mkdir(outp)
    for (let n of Object.keys(converters()))
        mkdir(path.join(outp, n))

    for (let fn of files) {
        if (!/\.md$/.test(fn) || fn[0] == ".")
            continue
        console.log(`process ${fn}`)
        const cont = fs.readFileSync(path.join(dn, fn), "utf8")
        if (!/^0x/.test(fn)) {
            includes[fn.replace(/\.md$/, "")] = cont
            continue
        }

        const json = toJSON(cont, includes)
        if (json.errors) {
            for (let e of json.errors) {
                const fn2 = e.file ? path.join(dn, e.file + ".md") : fn
                console.error(`${fn2}(${e.line}): ${e.message}`)
            }
            break
        } else {
            const cnv = converters()
            for (let n of Object.keys(cnv)) {
                fs.writeFileSync(path.join(outp, n, json.name + "." + n), cnv[n](json))
            }
        }
    }

    function mkdir(n: string) {
        try {
            fs.mkdirSync(n, "777")
        } catch { }
    }
}

if (typeof process != "undefined")
    nodeMain();
