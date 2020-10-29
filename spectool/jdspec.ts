/// <reference path="jdspec.d.ts" />

export const SenMLUnitDescription: jdspec.SMap<string> = {
    "m": "meter",
    "kg": "kilogram",
    "s": "second",
    "A": "ampere",
    "K": "kelvin",
    "cd": "candela",
    "mol": "mole",
    "Hz": "hertz",
    "rad": "radian",
    "sr": "steradian",
    "N": "newton",
    "Pa": "pascal",
    "J": "joule",
    "W": "watt",
    "C": "coulomb",
    "V": "volt",
    "F": "farad",
    "Ohm": "ohm",
    "S": "siemens",
    "Wb": "weber",
    "T": "tesla",
    "H": "henry",
    "Cel": "degrees Celsius",
    "lm": "lumen",
    "lx": "lux",
    "Bq": "becquerel",
    "Gy": "gray",
    "Sv": "sievert",
    "kat": "katal",
    "m2": "square meter (area)",
    "m3": "cubic meter (volume)",
    "m/s": "meter per second (velocity)",
    "m/s2": "meter per square second (acceleration)",
    "m3/s": "cubic meter per second (flow rate)",
    "W/m2": "watt per square meter (irradiance)",
    "cd/m2": "candela per square meter (luminance)",
    "bit": "bit (information content)",
    "bit/s": "bit per second (data rate)",
    "lat": "degrees latitude",
    "lon": "degrees longitude",
    "pH": "pH value (acidity; logarithmic quantity)",
    "dB": "decibel (logarithmic quantity)",
    "dBW": "decibel relative to 1 W (power level)",
    "count": "1 (counter value)",
    "/": "1 (ratio e.g., value of a switch)",
    "%RH": "Percentage (Relative Humidity)",
    "%EL": "Percentage (remaining battery energy level)",
    "EL": "seconds (remaining battery energy level)",
    "1/s": "1 per second (event rate)",
    "S/m": "Siemens per meter (conductivity)",
    "B": "Byte (information content)",
    "VA": "volt-ampere (Apparent Power)",
    "VAs": "volt-ampere second (Apparent Energy)",
    "var": "volt-ampere reactive (Reactive Power)",
    "vars": "volt-ampere-reactive second (Reactive Energy)",
    "J/m": "joule per meter (Energy per distance)",
    "kg/m3": "kilogram per cubic meter (mass density, mass concentration)"
}

export const SenMLSecondaryUnitConverters: jdspec.SMap<{
    name: string;
    unit: senml.Unit | "#";
    scale: number;
    offset: number;
}> = {
    "ms": { name: "millisecond", unit: "s", scale: 1 / 1000, offset: 0 },
    "min": { name: "minute", unit: "s", scale: 60, offset: 0 },
    "h": { name: "hour", unit: "s", scale: 3600, offset: 0 },
    "MHz": { name: "megahertz", unit: "Hz", scale: 1000000, offset: 0 },
    "kW": { name: "kilowatt", unit: "W", scale: 1000, offset: 0 },
    "kVA": { name: "kilovolt-ampere", unit: "VA", scale: 1000, offset: 0 },
    "kvar": { name: "kilovar", unit: "var", scale: 1000, offset: 0 },
    "Ah": { name: "ampere-hour", unit: "C", scale: 3600, offset: 0 },
    "Wh": { name: "watt-hour", unit: "J", scale: 3600, offset: 0 },
    "kWh": { name: "kilowatt-hour", unit: "J", scale: 3600000, offset: 0 },
    "varh": { name: "var-hour", unit: "vars", scale: 3600, offset: 0 },
    "kvarh": { name: "kilovar-hour", unit: "vars", scale: 3600000, offset: 0 },
    "kVAh": { name: "kilovolt-ampere-hour", unit: "VAs", scale: 3600000, offset: 0 },
    "Wh/km": { name: "watt-hour per kilometer", unit: "J/m", scale: 3.6, offset: 0 },
    "KiB": { name: "kibibyte", unit: "B", scale: 1024, offset: 0 },
    "GB": { name: "gigabyte", unit: "B", scale: 1.00E+09, offset: 0 },
    "Mbit/s": { name: "megabit per second", unit: "bit/s", scale: 1000000, offset: 0 },
    "B/s": { name: "byte per second", unit: "bit/s", scale: 8, offset: 0 },
    "MB/s": { name: "megabyte per second", unit: "bit/s", scale: 8000000, offset: 0 },
    "mV": { name: "millivolt", unit: "V", scale: 1 / 1000, offset: 0 },
    "mA": { name: "milliampere", unit: "A", scale: 1 / 1000, offset: 0 },
    "dBm": { name: "decibel (milliwatt)", unit: "dBW", scale: 1, offset: -30 },
    "ug/m3": { name: "microgram per cubic meter", unit: "kg/m3", scale: 1.00E-09, offset: 0 },
    "mm/h": { name: "millimeter per hour", unit: "m/s", scale: 1 / 3600000, offset: 0 },
    "m/h": { name: "meter per hour", unit: "m/s", scale: 1 / 3600, offset: 0 },
    "ppm": { name: "parts per million", unit: "/", scale: 1.00E-06, offset: 0 },
    "/100": { name: "percent", unit: "/", scale: 1 / 100, offset: 0 },
    "/1000": { name: "permille", unit: "/", scale: 1 / 1000, offset: 0 },
    "hPa": { name: "hectopascal", unit: "Pa", scale: 100, offset: 0 },
    "mm": { name: "millimeter", unit: "m", scale: 1 / 1000, offset: 0 },
    "cm": { name: "centimeter", unit: "m", scale: 1 / 100, offset: 0 },
    "km": { name: "kilometer", unit: "m", scale: 1000, offset: 0 },
    "km/h": { name: "kilometer per hour", unit: "m/s", scale: 1 / 3.6, offset: 0 },

    // compat with previous JACDAC versions
    "frac": { name: "ratio", unit: "/", scale: 1, offset: 0 },
    "us": { name: "micro seconds", unit: "s", scale: 1e-6, offset: 0 },
    "mWh": { name: "micro watt-hour", unit: "J", scale: 3.6e-3, offset: 0 },
    "g": { name: "earth gravity", unit: "m/s2", scale: 9.80665, offset: 0 },
    "#": { name: "count", unit: "#", scale: 1, offset: 0 },
}

export function resolveUnit(unit: string) {
    if (unit === "")
        return { name: "", unit: "", scale: 1, offset: 1 }; // indentifier

    // seconary unit?
    const su = SenMLSecondaryUnitConverters[unit];
    if (su)
        return su;

    const name = SenMLUnitDescription[unit];
    if (name)
        return { name, unit, scale: 1, offset: 0 }

    return undefined;
}

export function parseSpecificationMarkdownToJSON(filecontent: string, includes?: jdspec.SMap<jdspec.ServiceSpec>, filename = ""): jdspec.ServiceSpec {
    filecontent = (filecontent || "").replace(/\r/g, "")
    let info: jdspec.ServiceSpec = {
        name: "",
        shortId: filename.replace(/\.md$/, "").replace(/.*\//, ""),
        camelName: "",
        shortName: "",
        extends: [],
        notes: {},
        classIdentifier: 0,
        enums: {},
        packets: [],
        source: filecontent,
    }

    let backticksType = ""
    let enumInfo: jdspec.EnumInfo = null
    let packetInfo: jdspec.PacketInfo = null
    let pipePacket: jdspec.PacketInfo = null
    let errors: jdspec.Diagnostic[] = []
    let lineNo = 0
    let noteId = "short"
    let lastCmd: jdspec.PacketInfo
    let packetsToDescribe: jdspec.PacketInfo[]
    let nextRepeats: boolean = undefined

    const baseInfo = includes ? includes["_base"] : undefined
    const usedIds: jdspec.SMap<string> = {}
    for (const prev of values(includes || {})) {
        if (prev.classIdentifier)
            usedIds[prev.classIdentifier + ""] = prev.name
    }

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

    for (const k of Object.keys(info.notes))
        info.notes[k] = normalizeMD(info.notes[k])
    for (const v of info.packets)
        v.description = normalizeMD(v.description)

    if (!info.camelName)
        info.camelName = info.name
            .replace(/\s+/g, " ")
            .replace(/[ -](.)/g, (f, l) => l.toUpperCase())
            .replace(/[^\w]+/g, "_")
    if (!info.shortName)
        info.shortName = info.camelName

    if (info.camelName == "base")
        info.classIdentifier = 0x1fff_fff1
    else if (info.camelName == "sensor")
        info.classIdentifier = 0x1fff_fff2

    if (info.shortName != "control" && !info.classIdentifier)
        error("identifier: not specified")

    return info

    function processLine(line: string) {
        if (backticksType) {
            if (line.trim() == "```") {
                backticksType = null
                if (backticksType == "default")
                    return
            }
        } else {
            const m = /^```(.*)/.exec(line)
            if (m) {
                backticksType = m[1] || "default"
                if (backticksType == "default")
                    return
            }
        }

        const interpret = backticksType == "default" || line.slice(0, 4) == "    "

        if (!interpret) {
            const m = /^(#+)\s*(.*)/.exec(line)
            if (m) {
                let [_full, hd, cont] = m
                packetsToDescribe = null
                cont = cont.trim()
                const newNoteId = cont.toLowerCase()
                if (hd == "#" && !info.name) {
                    info.name = cont
                    line = ""
                } else if (newNoteId == "registers" || newNoteId == "commands" || newNoteId == "events" || newNoteId == "examples") {
                    noteId = newNoteId
                    line = ""
                } else {
                    if (noteId == "short")
                        noteId = "long"
                    // keep line
                }
            }

            if (packetsToDescribe) {
                for (const iface of packetsToDescribe)
                    iface.description += line + "\n"
            } else {
                if (line || info.notes[noteId]) {
                    if (!info.notes[noteId])
                        info.notes[noteId] = ""
                    info.notes[noteId] += line + "\n"
                }
            }
        } else {
            if (packetsToDescribe && packetsToDescribe[0].description)
                packetsToDescribe = null
            const expanded = line
                .replace(/\/\/.*/, "")
                .replace(/[\?@:=,\{\};]/g, s => " " + s + " ")
                .trim()
            if (!expanded)
                return
            const words = expanded.split(/\s+/)
            if (/^[;,]/.test(words[words.length - 1]))
                words.pop()
            let cmd = words[0]
            // allow for `command = Foo.Bar` etc (ie. command is not a keyword there)
            if (words[1] == ":" || words[1] == "=")
                cmd = ":"
            switch (cmd) {
                case "enum":
                case "flags":
                    startEnum(words)
                    break
                case "meta":
                case "pipe":
                case "report":
                case "command":
                case "const":
                case "ro":
                case "rw":
                case "event":
                    startPacket(words)
                    break
                case "}":
                    if (packetInfo) {
                        finishPacket()
                    } else if (enumInfo) {
                        enumInfo = null
                    } else {
                        error("nothing to end here")
                    }
                    break
                default:
                    if (packetInfo) packetField(words)
                    else if (enumInfo) enumMember(words)
                    else metadataMember(words)
            }
        }
    }

    function finishPacket() {
        packetInfo.packed = hasNaturalAlignment(packetInfo) ? undefined : true
        packetInfo = null
    }

    function normalizeMD(md: string) {
        return md
            .replace(/^\s+/, "")
            .replace(/\s+$/, "")
    }

    function checkBraces(words: string[]) {
        if (enumInfo || packetInfo)
            error("already in braces")
        if (words) {
            if (words[2] != "{")
                error(`expecting: ${words[0]} NAME {`)
        }

        enumInfo = null
        packetInfo = null
    }

    function startPacket(words: string[]) {
        checkBraces(null)
        const kindSt = words.shift()
        let kind: jdspec.PacketKind = "command"
        if (kindSt == "meta") {
            let w2 = words.shift()
            if (w2 == "pipe")
                w2 = words.shift()
            if (w2 == "report" || w2 == "command")
                kind = ("meta_pipe_" + w2) as any
            else
                error("invalid token after meta")
        } else if (kindSt == "pipe") {
            let w2 = words.shift()
            if (w2 == "report" || w2 == "command")
                kind = ("pipe_" + w2) as any
            else
                error("invalid token after pipe")
        } else {
            kind = kindSt as any
        }
        let name = words.shift()
        const isReport = kind == "report"
        if (isReport && lastCmd && !/^\w+$/.test(name)) {
            words.unshift(name)
            name = lastCmd.name
        }
        packetInfo = {
            kind,
            name: normalizeName(name),
            identifier: undefined,
            description: "",
            fields: []
        }
        if (isReport && lastCmd && name == lastCmd.name) {
            packetInfo.secondary = true
            lastCmd.hasReport = true
        }
        if (!packetsToDescribe)
            packetsToDescribe = []
        packetsToDescribe.push(packetInfo)
        if (words[0] == "?") {
            words.shift()
            packetInfo.optional = true
        }

        const prev = info.packets.filter(p => p.name == packetInfo.name)
        if (prev.length == 0) {
            // OK
        } else if (prev.length == 1 && prev[0].kind == "command" && packetInfo.kind == "report") {
            // OK
        } else {
            error("packet redefinition")
        }

        if (/pipe/.test(kind)) {
            if (!pipePacket)
                error("pipe definitions can only occur after the pipe-open packet")
            else
                packetInfo.pipeType = pipePacket.pipeType
        }

        const atat = words.indexOf("@")
        if (kind == "pipe_command" || kind == "pipe_report") {
            // no identifier
            packetInfo.identifier = 0
        } else if (atat >= 0) {
            const w = words[atat + 1]
            let v = parseInt(w)
            let isSet = true
            if (isNaN(v)) {
                v = 0
                isSet = false
                if (baseInfo) {
                    const basePacket = baseInfo.packets.find(p => p.name == w)
                    if (basePacket) {
                        v = basePacket.identifier
                        packetInfo.identifierName = w
                        if (basePacket.kind != kind)
                            error(`kind mismatch on ${w}: ${basePacket.kind} vs ${kind}`)
                        else
                            isSet = true
                    } else
                        error(`${w} not found in _base`)
                } else {
                    error(`${w} cannot be resolved, since _base is missing`)
                }
            }

            let isUser = false
            let isSystem = false
            let isHigh = 0x200 <= v && v <= 0xeff
            switch (kind) {
                case "const":
                case "ro":
                    isSystem = 0x100 <= v && v <= 0x17f
                    isUser = 0x180 <= v && v <= 0x1ff
                    break
                case "rw":
                    isSystem = 0x00 <= v && v <= 0x7f
                    isUser = 0x80 <= v && v <= 0xff
                    break
                case "report":
                case "command":
                    isSystem = 0x00 <= v && v <= 0x7f
                    isUser = 0x80 <= v && v <= 0xff
                    isHigh = 0x100 <= v && v <= 0xeff
                    break
                case "event":
                    isUser = 0x0000 <= v && v <= 0xffff
                    isHigh = 0x1_0000 <= v && v <= 0xffff_ffff
                    break
            }

            if (isUser) {
                // ok
            } else if (isSystem) {
                if (!packetInfo.identifierName)
                    warn(`${kind} @ ${toHex(v)} should be expressed with a name from _base.md`)
            } else if (isHigh) {
                if (!info.highCommands)
                    warn(`${kind} @ ${toHex(v)} is from the extended range but 'high: 1' missing`)
            }

            packetInfo.identifier = v
            words.splice(atat, 2)
        } else {
            if (isReport && lastCmd)
                packetInfo.identifier = lastCmd.identifier
            else
                error(`@ not found at ${packetInfo.name}`)
        }

        if (info.packets.some(p =>
            p.kind == packetInfo.kind &&
            (!/pipe/.test(p.kind) || p.pipeType == packetInfo.pipeType) &&
            p.identifier == packetInfo.identifier
        )) {
            error("packet identifier already used")
        }

        info.packets.push(packetInfo)

        if (kind == "command")
            lastCmd = packetInfo
        else
            lastCmd = null

        if (words[0] == "=" || words[0] == ":") {
            words.unshift("_")
            packetField(words)
            finishPacket()
        } else {
            const last = words.shift()
            if (last == "{") {
                if (words[0] == "...")
                    words.shift()
                if (words[0] == "}") {
                    words.shift()
                    finishPacket()
                }
                if (words.length)
                    error(`excessive tokens: ${words[0]}...`)
            } else {
                if (last === undefined && kind == "event") {
                    finishPacket()
                } else {
                    error("expecting '{'")
                }
            }
        }
    }

    function packetField(words: string[]) {
        if (words.length == 2 && words[0] == "repeats") {
            nextRepeats = true
            return
        }
        const name = normalizeName(words.shift())
        let defaultValue: number = undefined
        let op = words.shift()
        if (op == "=") {
            defaultValue = parseIntCheck(words.shift())
            op = words.shift()
        }

        if (op != ":")
            error("expecting ':'")

        let tp = words.shift()
        const [storage, type, typeShift] = normalizeStorageType(tp)
        const isFloat = typeShift === null

        let tok = words.shift()
        let unit: jdspec.Unit = ""
        if (tok != "{") {
            unit = normalizeUnit(tok)
            tok = words.shift()
        }

        let shift = typeShift || undefined
        if (unit == "/") {
            shift = Math.abs(storage) * 8
            if (storage < 0)
                shift -= 1
        }

        const field: jdspec.PacketMember = {
            name,
            unit,
            shift,
            isFloat,
            type,
            storage,
            isSimpleType: canonicalType(storage) == type || undefined,
            defaultValue,
            startRepeats: nextRepeats
        }

        if (tok == "{") {
            while (words.length) {
                tok = words.shift()
                if (tok == "}")
                    break
                tok = camelize(tok)
                switch (tok) {
                    case "typicalMin":
                    case "typicalMax":
                    case "absoluteMin":
                    case "absoluteMax":
                        (field as any)[tok] = parseVal()
                        break
                    default:
                        error("unknown constraint: " + tok)
                        break
                }
                if (words[0] == ",") words.shift()
            }
            if (tok == "}") tok = null

            function parseVal() {
                const eq = words.shift()
                if (eq != "=" && eq != ":")
                    error("expecting '='")
                const val = words.shift()
                return parseIntCheck(val, true)
            }
        }

        if (tok)
            error(`excessive tokens at the end of member: ${tok}...`)

        if (field.typicalMin === undefined && field.typicalMax !== undefined && storage > 0)
            field.typicalMin = 0

        if (field.absoluteMin === undefined && field.absoluteMax !== undefined && storage > 0)
            field.absoluteMin = 0

        if (/pipe/.test(type)) {
            packetInfo.pipeType = packetInfo.name
            if (pipePacket && pipePacket.name == packetInfo.name && packetInfo.kind == "report") {
                // keep old pipePacket
            } else {
                pipePacket = packetInfo
            }
        }

        packetInfo.fields.push(field)
        nextRepeats = undefined
    }

    function startEnum(words: string[]) {
        checkBraces(null)
        if (words[2] != ":" || words[4] != "{")
            error("expecting: enum NAME : TYPE {")
        enumInfo = {
            name: normalizeName(words[1]),
            storage: normalizeStorageType(words[3])[0],
            isFlags: words[0] == "flags" || undefined,
            members: {}
        }
        if (info.enums[enumInfo.name])
            error("enum redefinition")
        info.enums[enumInfo.name] = enumInfo
    }


    function enumMember(words: string[]) {
        if (words[1] != "=" || words.length != 3)
            error(`expecting: FILD_NAME = INTEGER`)
        enumInfo.members[normalizeName(words[0])] = parseIntCheck(words[2])
    }

    function parseIntCheck(w: string, allowFloat = false) {
        if (/^-?0x[a-f\d_]+$/i.test(w) || /^-?[\d_]+$/.test(w)) {
            const v = parseInt(w.replace(/_/g, "")) // allow for 0x3fff_ffff syntax
            if (isNaN(v))
                error("can't parse int: " + w)
            return v
        }

        if (allowFloat && /^-?\d*(\.\d*)?(e(-?)\d+)?$/.test(w)) {
            const v = parseFloat(w)
            if (isNaN(v))
                error("can't parse float: " + w)
            return v
        }

        const ww = w.split(/\./)
        if (ww.length != 2) {
            error(`expecting int or enum member here`)
            return 0
        }
        const en = info.enums[ww[0]]
        if (!en) {
            error(`${ww[0]} is not an enum type`)
            return 0
        }
        if (!en.members.hasOwnProperty(ww[1]))
            error(`${ww[1]} is not a member of ${ww[0]}`)
        return en.members[ww[1]] || 0
    }

    function looksRandom(n: number) {
        const s = n.toString(16)
        const h = "0123456789abcdef"
        for (let i = 0; i < h.length; ++i) {
            const hh = h[i]
            if (s.indexOf(hh + hh + hh) >= 0)
                return false
        }
        if (/f00d|dead|deaf|beef/.test(s))
            return false
        return true
    }

    function genRandom() {
        for (; ;) {
            const m = (Math.random() * 0xfff_ffff) | 0x1000_0000
            if (looksRandom(m))
                return m
        }
    }

    function metadataMember(words: string[]) {
        if ((words[1] != "=" && words[1] != ":") || words.length != 3)
            error(`expecting: FILD_NAME = VALUE or FIELD_NAME : VALUE`)
        switch (words[0]) {
            case "extends":
                processInclude(words[2])
                break
            case "class":
            case "identifier":
                info.classIdentifier = parseIntCheck(words[2])
                if (info.name != "Control" && info.classIdentifier == 0)
                    info.classIdentifier = 1
                const gen = `how about ${toHex(genRandom())}`
                if (!(info.classIdentifier == 0 || (0x1000_0001 <= info.classIdentifier && info.classIdentifier <= 0x1fff_ff00)))
                    error(`class identifier out of range; ${gen}`)
                if (!looksRandom(info.classIdentifier))
                    error(`class identifier doesn't look random; ${gen}`)
                if (usedIds[info.classIdentifier + ""])
                    error(`class identifier ${toHex(info.classIdentifier)} already used in ${usedIds[info.classIdentifier + ""]}; ${gen}`)
                break
            case "camel":
                info.camelName = words[2]
                break
            case "short":
                info.shortName = words[2]
                break
            case "high":
                info.highCommands = !!parseIntCheck(words[2])
                break
            case "status":
                if (["stable", "experimental", "deprecated"].indexOf(words[2]) > -1)
                    info.status = <any>words[2];
                break;
            default:
                error("unknown metadata field: " + words[0])
                break
        }
    }

    function processInclude(name: string) {
        if (name == "base")
            return
        const inner = includes[name]
        if (!inner)
            return error("include file not found: " + name)
        if (Object.keys(info.packets).length || Object.keys(info.enums).length)
            error("extends: only allowed on top of the .md file")
        if (inner.errors)
            errors = errors.concat(inner.errors)
        info.enums = clone(inner.enums)
        info.packets = clone(inner.packets)
        for (const pkt of info.packets)
            pkt.derived = true
        if (inner.highCommands)
            info.highCommands = true
        info.notes = {}
        info.extends = inner.extends.concat([name])
    }

    function clone<T>(v: T): T {
        return JSON.parse(JSON.stringify(v))
    }

    function error(msg: string) {
        if (!msg) msg = "syntax error"
        if (errors.some(e => e.line == lineNo && e.message == msg))
            return
        errors.push({ file: filename, line: lineNo, message: msg })
    }

    function warn(msg: string) {
        if (info.camelName == "base")
            return // no warnings in _base
        if (errors.some(e => e.line == lineNo && e.message == msg))
            return
        errors.push({ file: filename, line: lineNo, message: msg })
    }

    function normalizeName(n: string) {
        if (!/^\w+$/.test(n))
            error("expecting name here")
        return n
    }

    function normalizeStorageType(tp: string): [jdspec.StorageType, string, number] {
        if (info.enums[tp])
            return [info.enums[tp].storage, tp, 0]
        if (!tp)
            error("expecting type here")
        let tp2 = tp.replace(/_t$/, "").toLowerCase()
        const m = /^([ui])(\d+)\.(\d+)$/.exec(tp2)
        if (m) {
            const a = parseIntCheck(m[2])
            const b = parseIntCheck(m[3])
            const len = a + b
            if (!(len == 8 || len == 16 || len == 32 || len == 64))
                error(`fixed point ${tp} can't be ${len} bits`)
            return [(m[1] == "i" ? -1 : 1) * (len >> 3), tp2, b]
        }

        switch (tp2) {
            case "bool":
                return [1, tp2, 0]
            case "i8":
            case "u8":
            case "i16":
            case "u16":
            case "i32":
            case "u32":
            case "i64":
            case "u64":
                let sz = parseIntCheck(tp2.replace(/^./, "")) >> 3
                if (tp2[0] == "i") sz = -sz
                return [sz, tp2, 0]
            case "f16":
                return [2, tp2, null]
            case "f32":
                return [4, tp2, null]
            case "f64":
                return [8, tp2, null]
            case "pipe":
                return [12, tp2, 0]
            case "pipe_port":
                return [2, tp2, 0]
            case "bytes":
            case "string":
                return [0, tp2, 0]
            default:
                const m = /^u8\[(\d+)\]$/.exec(tp2)
                if (m)
                    return [parseIntCheck(m[1]), tp2, 0]
                error("unknown type: " + tp + " " + tp2)
                return [4, tp2, 0]
        }
    }

    function normalizeUnit(unit: string): jdspec.Unit {
        if (unit === undefined || unit === null)
            return "";

        if (SenMLUnitDescription[unit] || SenMLSecondaryUnitConverters[unit])
            return unit as jdspec.Unit;
        error(`expecting unit, got '${unit}'`)
        return ""
    }

    function hasNaturalAlignment(iface: jdspec.PacketInfo) {
        let byteOffset = 0

        for (let m of iface.fields) {
            let sz = byteSize(m.storage)
            if (sz == 0)
                continue
            if (!/^u8\[/.test(m.type) && byteOffset % sz != 0)
                return false
            byteOffset += sz
        }

        return true
    }
}

function values<T>(o: jdspec.SMap<T>): T[] {
    let r: T[] = []
    for (let k of Object.keys(o))
        r.push(o[k])
    return r
}

function fail(msg: string) {
    throw new Error(msg)
}

function byteSize(tp: jdspec.StorageType) {
    return Math.abs(tp)
}

function toUpper(name: string) {
    return name?.replace(/([a-z])([A-Z])/g, (x, a, b) => a + "_" + b).toUpperCase()

}

function toLower(name: string) {
    return name?.replace(/([a-z])([A-Z])/g, (x, a, b) => a + "_" + b).toLowerCase()
}

function packed(iface: jdspec.PacketInfo) {
    if (!iface.packed) return ""
    else return " __attribute__((packed))"
}

function cStorage(tp: jdspec.StorageType) {
    if (tp == 0 || [1, 2, 4, 8].indexOf(Math.abs(tp)) < 0)
        return "bytes"
    if (tp < 0)
        return `int${-tp * 8}_t`
    else
        return `uint${tp * 8}_t`
}

function canonicalType(tp: jdspec.StorageType): string {
    if (tp == 0)
        return "bytes"
    if (tp < 0)
        return `i${-tp * 8}`
    else
        return `u${tp * 8}`
}

function isRegister(k: jdspec.PacketKind) {
    return (k == "ro" || k == "rw" || k == "const")
}

function toHex(n: number): string {
    if (n === undefined)
        return "";
    if (n < 0)
        return "-" + toHex(n)
    return "0x" + n.toString(16)
}

function unitPref(f: jdspec.PacketMember) {
    if (!f.unit) return ""
    else return prettyUnit(f.unit) + " "
}

function prettyUnit(u: jdspec.Unit): string {
    switch (u) {
        case "us": return "μs"
        case "C": return "°C"
        case "/": return "ratio"
        default: return u
    }
}

function toH(info: jdspec.ServiceSpec) {
    let r = "// Autogenerated C header file for " + info.name + "\n"
    const hdDef = `_JACDAC_${toUpper(info.camelName)}_H`
    r += `#ifndef ${hdDef}\n`
    r += `#define ${hdDef} 1\n`
    const pref = "JD_" + toUpper(info.shortName) + "_"
    for (let en of values(info.enums)) {
        const enPref = pref + toUpper(en.name)
        r += `\n// enum ${en.name} (${cStorage(en.storage)})\n`
        for (let k of Object.keys(en.members))
            r += "#define " + enPref + "_" + toUpper(k) + " " + en.members[k] + "\n"
    }
    for (const pkt of info.packets) {
        if (pkt.derived)
            continue

        const cmt = addComment(pkt)
        r += cmt.comment

        if (!pkt.secondary) {
            let inner = "CMD"
            if (isRegister(pkt.kind))
                inner = "REG"
            else if (pkt.kind == "event")
                inner = "EV"
            let val = toHex(pkt.identifier)
            if (pkt.identifierName)
                val = "JD_" + inner + "_" + toUpper(pkt.identifierName)
            r += `#define ${pref}${inner}_${toUpper(pkt.name)} ${val}\n`
        }

        if (cmt.needsStruct) {
            let tname = "jd_" + toLower(info.camelName) + "_" + toLower(pkt.name)
            if (pkt.kind == "report")
                tname += "_report"
            r += `typedef struct ${tname} {\n`
            for (let f of pkt.fields) {
                let def = ""
                if (f.storage == 0) {
                    def = `char ${f.name}[0]`
                } else {
                    def = `${cStorage(f.storage)} ${f.name}`
                }
                def += ";"
                if (!f.isSimpleType)
                    def += "  // " + unitPref(f) + f.type
                else if (f.unit)
                    def += " // " + prettyUnit(f.unit)
                r += "    " + def + "\n"
            }
            r += `}${packed(pkt)} ${tname}_t;\n\n`
        }
    }
    r += "\n#endif\n"
    return r
}

const tsNumFmt: jdspec.SMap<string> = {
    "1": "UInt8LE:B",
    "2": "UInt16LE:H",
    "4": "UInt32LE:L",
    "-1": "Int8LE:b",
    "-2": "Int16LE:h",
    "-4": "Int32LE:l",
}


function camelize(name: string) {
    return name?.replace(/_([a-z])/g, (_, l) => l.toUpperCase())
}

function upperCamel(name: string) {
    name = camelize(name)
    if (!name?.length) return name
    return name[0].toUpperCase() + name.slice(1)
}

function snakify(name: string) {
    return name?.replace(/([a-z])([A-Z])/g, (_, a, b) => a + "_" + b)
}

function addComment(pkt: jdspec.PacketInfo) {
    let comment = ""

    let typeInfo = ""
    let needsStruct = false
    if (pkt.fields.length == 0) {
        if (pkt.kind != "event")
            typeInfo = "No args"
    } else if (pkt.fields.length == 1) {
        const f0 = pkt.fields[0]
        typeInfo = cStorage(f0.storage)
        if (!f0.isSimpleType)
            typeInfo = f0.type + " (" + typeInfo + ")"
        typeInfo = unitPref(f0) + typeInfo
        if (f0.name != "_")
            typeInfo = f0.name + " " + typeInfo
    } else {
        needsStruct = true
    }

    if (pkt.fields.length == 1) {
        if (isRegister(pkt.kind)) {
            let info = ""
            if (pkt.kind == "ro") info = "Read-only"
            else if (pkt.kind == "const") info = "Constant"
            else info = "Read-write"
            if (typeInfo)
                typeInfo = info + " " + typeInfo
            else
                typeInfo = info
        } else if (typeInfo) {
            typeInfo = "Argument: " + typeInfo
        }
    }

    if (pkt.kind == "report" && pkt.secondary) {
        comment += "// Report: " + typeInfo + "\n"
    } else {
        if (pkt.description) {
            let desc = pkt.description.replace(/\n\n[^]*/, "")
            if (typeInfo)
                desc = typeInfo + ". " + desc
            if (desc.indexOf("\n") > 0)
                comment += "\n/**\n * " + desc.replace(/\n/g, "\n * ") + "\n */\n"
            else
                comment += "\n/** " + desc + " */\n"
        }
    }

    return { comment, needsStruct }

}

function toTS(info: jdspec.ServiceSpec) {
    let r = "// Service: " + info.name + "\n"
    if (info.shortId[0] != "_")
        r += `export const SRV_${info.name.replace(/ /g, "_").toUpperCase()} = ${toHex(info.classIdentifier)}\n`
    const pref = upperCamel(info.camelName)
    for (let en of values(info.enums)) {
        const enPref = pref + upperCamel(en.name)
        r += `\nexport enum ${enPref} { // ${cStorage(en.storage)}\n`
        for (let k of Object.keys(en.members))
            r += "    " + k + " = " + toHex(en.members[k]) + ",\n"
        r += "}\n\n"
    }
    const tsEnums: jdspec.SMap<string> = {}

    for (const pkt of info.packets) {
        if (pkt.derived)
            continue

        const cmt = addComment(pkt)

        if (!pkt.secondary && pkt.kind != "pipe_command" && pkt.kind != "pipe_report") {
            let inner = "Cmd"
            if (isRegister(pkt.kind))
                inner = "Reg"
            else if (pkt.kind == "event")
                inner = "Event"
            else if (pkt.kind == "meta_pipe_command" || pkt.kind == "meta_pipe_report")
                inner = "PipeCmd"
            let val = toHex(pkt.identifier)
            tsEnums[inner] = (tsEnums[inner] || "") +
                `${cmt.comment}${upperCamel(pkt.name)} = ${val},\n`
        }
    }

    for (const k of Object.keys(tsEnums)) {
        const inner = tsEnums[k]
            .replace(/^\n+/, "")
            .replace(/\n$/, "")
            .replace(/\n/g, "\n    ")
        r += `export enum ${pref}${k} {\n    ${inner}\n}\n\n`
    }

    return r
}

function toStaticTypescript(info: jdspec.ServiceSpec) {
    const indent = "    ";
    let r = "namespace jacdac {\n";
    r += indent + "// Service: " + info.name + "\n"
    if (info.shortId[0] != "_")
        r += indent + `export const SRV_${info.name.replace(/ /g, "_").toUpperCase()} = ${toHex(info.classIdentifier)}\n`
    const pref = upperCamel(info.camelName)
    for (let en of values(info.enums)) {
        const enPref = pref + upperCamel(en.name)
        r += `\n${indent}export const enum ${enPref} { // ${cStorage(en.storage)}\n`
        for (let k of Object.keys(en.members))
            r += indent + indent + k + " = " + toHex(en.members[k]) + ",\n"
        r += indent + "}\n\n"
    }
    const tsEnums: jdspec.SMap<string> = {}

    for (const pkt of info.packets) {
        if (pkt.derived)
            continue

        const cmt = addComment(pkt)

        if (!pkt.secondary && pkt.kind != "pipe_command" && pkt.kind != "pipe_report") {
            let inner = "Cmd"
            if (isRegister(pkt.kind))
                inner = "Reg"
            else if (pkt.kind == "event")
                inner = "Event"
            else if (pkt.kind == "meta_pipe_command" || pkt.kind == "meta_pipe_report")
                inner = "PipeCmd"
            let val = toHex(pkt.identifier)
            tsEnums[inner] = (tsEnums[inner] || "") +
                `${cmt.comment}${indent}${upperCamel(pkt.name)} = ${val},\n`
        }
    }

    for (const k of Object.keys(tsEnums)) {
        const inner = tsEnums[k]
            .replace(/^\n+/, "")
            .replace(/\n$/, "")
            .replace(/\n/g, "\n    ")
        r += indent + `export const enum ${pref}${k} {\n    ${inner}\n${indent}}\n\n`
    }
    r += "}\n"

    return r
}

export function converters(): jdspec.SMap<(s: jdspec.ServiceSpec) => string> {
    return {
        "json": (j: jdspec.ServiceSpec) => JSON.stringify(j, null, 2),
        "c": toH,
        "ts": toTS,
        "sts": toStaticTypescript,
        /*
        "cpp": toHPP,
        */
    }
}

