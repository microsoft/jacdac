/// <reference path="jdspec.d.ts" />

export const DEVICE_IMAGE_WIDTH = 600
export const DEVICE_IMAGE_HEIGHT = 450

// modified subset of SenML
export const unitDescription: jdspec.SMap<string> = {
    "°": "angle",
    "°/s": "rotation rate",
    "°/s2": "rotation acceleration",
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
    "°C": "degrees Celsius",
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
    "kg/m3": "kilogram per cubic meter (mass density, mass concentration)",
    "s/60°": "servo speed (time to travel 60°)",
    "kg/cm": "servo torque",
}

export const secondaryUnitConverters: jdspec.SMap<{
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
    const su = secondaryUnitConverters[unit];
    if (su)
        return su;

    const name = unitDescription[unit];
    if (name)
        return { name, unit, scale: 1, offset: 0 }

    return undefined;
}

export function units(): { name: string, description: string }[] {
    const r: { name: string, description: string }[] = []
    Object.keys(unitDescription).forEach(k => {
        r.push({ name: k, description: unitDescription[k] })
        Object.keys(secondaryUnitConverters)
            .filter(scd => secondaryUnitConverters[scd].unit === k)
            .forEach(scd => r.push({ name: scd, description: secondaryUnitConverters[scd].name }))
    })
    r.sort((l, r) => l.name.localeCompare(r.name))
    return r;
}

/* check ranges, see system.md
Registers `0x001-0x07f` - r/w common to all services
Registers `0x080-0x0ff` - r/w defined per-service
Registers `0x100-0x17f` - r/o common to all services
Registers `0x180-0x1ff` - r/o defined per-service
Registers `0x200-0xeff` - custom, defined per-service
Registers `0xf00-0xfff` - reserved for implementation, should not be seen on the wire
*/
const identifierRanges: { [index: string]: [number, number][] } = {
    "rw": [
        [0x001, 0x07f],
        [0x080, 0x0ff],
        [0x200, 0xeff], // custom
        [0xf00, 0xfff], // impl
    ],
    "ro": [
        [0x100, 0x17f],
        [0x180, 0x1ff],
        [0x200, 0xeff], // custom
        [0xf00, 0xfff], // impl
    ],
    "command": [
        [0x000, 0x07f],
        [0x080, 0xeff],
        [0xf00, 0xfff],
    ],
    "event": [
        [0x00, 0x7f], // system
        [0x80, 0xff],
    ],
};

export function parseServiceSpecificationMarkdownToJSON(filecontent: string, includes?: jdspec.SMap<jdspec.ServiceSpec>, filename = ""): jdspec.ServiceSpec {
    filecontent = (filecontent || "").replace(/\r/g, "")
    let info: jdspec.ServiceSpec = {
        name: "",
        status: "experimental",
        shortId: filename.replace(/\.md$/, "").replace(/.*\//, ""),
        camelName: "",
        shortName: "",
        extends: [],
        notes: {},
        classIdentifier: 0,
        enums: {},
        packets: []
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
    let nextModifier: "" | "segmented" | "multi-segmented" | "repeats" = ""

    const systemInfo = includes?.["_system"]
    const usedIds: jdspec.SMap<string> = {}
    for (const prev of values(includes || {})) {
        if (prev.classIdentifier)
            usedIds[prev.classIdentifier + ""] = prev.name
    }

    try {
        if (includes["_system"] && includes["_base"])
            processInclude("_base")
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
        info.camelName = camelize(info.name
            .replace(/\s+/g, " ")
            .replace(/[ -](.)/g, (f, l) => l.toUpperCase())
            .replace(/[^\w]+/g, "_"))
    if (!info.shortName)
        info.shortName = info.camelName

    if (info.camelName == "system")
        info.classIdentifier = 0x1fff_fff1
    else if (info.camelName == "base")
        info.classIdentifier = 0x1fff_fff3
    else if (info.camelName == "sensor")
        info.classIdentifier = 0x1fff_fff2

    if (info.shortName != "control" && !info.classIdentifier)
        error("identifier: not specified")

    info.packets.forEach(pkt => pkt.packFormat = packFormat(info, pkt));

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
        if (packetInfo.packed)
            warn(`you may want to use explicit padding in ${packetInfo.name}`)

        const pid = packetInfo.identifier;
        const ranges = identifierRanges[packetInfo.kind];
        if (packetInfo.name != "set_register"
            && packetInfo.name != "get_register"
            && ranges && !ranges.some(range => range[0] <= pid && pid <= range[1]))
            error(`${packetInfo.name} identifier 0x${pid.toString(16)} out of range, expected in ${ranges.map(range => `[${range.map(r => `0x${r.toString(16)}`).join(', ')}]`).join(', ')}`)

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

        let internal: boolean = undefined;
        if (words[0] === "internal") {
            internal = true;
            words.shift();
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
            fields: [],
            internal
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
                if (systemInfo) {
                    const systemPacket = systemInfo.packets.find(p => p.name == w)
                    if (systemPacket) {
                        v = systemPacket.identifier
                        packetInfo.identifierName = w
                        if (systemPacket.kind != kind)
                            error(`kind mismatch on ${w}: ${systemPacket.kind} vs ${kind}`)
                        else
                            isSet = true
                    } else
                        error(`${w} not found in _system`)
                } else {
                    error(`${w} cannot be resolved, since _system is missing`)
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
                    isSystem = 0x00 <= v && v <= 0x7f
                    isUser = 0x80 <= v && v <= 0xff
                    break
            }

            if (isUser) {
                // ok
            } else if (isSystem) {
                if (!packetInfo.identifierName)
                    warn(`${kind} @ ${toHex(v)} should be expressed with a name from _system.md`)
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
        if (words.length == 2 && (words[0] == "repeats" || words[0] == "segmented" || words[0] == "multi-segmented")) {
            nextModifier = words[0]
            return
        }
        const name = normalizeName(words.shift())
        let defaultValue: number = undefined
        let isOptional: boolean = undefined
        let op = words.shift()
        if (op == "?") {
            isOptional = true
            op = words.shift()
        }
        if (op == "=") {
            defaultValue = parseIntCheck(words.shift())
            op = words.shift()
        }

        if (op != ":")
            error("expecting ':'")

        let tp = words.shift()
        const [storage, type, typeShift] = normalizeStorageType(tp)
        const isFloat = typeShift === null || undefined

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
            isOptional,
            multiSegmented: nextModifier == "multi-segmented" || undefined,
            segmented: nextModifier == "segmented" || nextModifier == "multi-segmented" || undefined,
            startRepeats: nextModifier == "repeats" || undefined
        }

        if (tok == "{") {
            while (words.length) {
                tok = words.shift()
                if (tok == "}")
                    break
                tok = camelize(tok)
                switch (tok) {
                    case "maxBytes":
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

        if (!field.storage && field.maxBytes)
            field.storage = field.maxBytes

        if (/pipe/.test(type)) {
            packetInfo.pipeType = packetInfo.name
            if (pipePacket && pipePacket.name == packetInfo.name && packetInfo.kind == "report") {
                // keep old pipePacket
            } else {
                pipePacket = packetInfo
            }
        }

        if (!field.isOptional && packetInfo.fields[packetInfo.fields.length - 1]?.isOptional) {
            error(`all fields after an optional field have to optional`)
        }

        packetInfo.fields.push(field)
        nextModifier = undefined
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
                else
                    error("unknown status");
                break;
            default:
                error("unknown metadata field: " + words[0])
                break
        }
    }

    function processInclude(name: string) {
        if (name == "_system")
            return
        const inner = includes[name]
        if (!inner)
            return error("include file not found: " + name)
        if (info.packets.some(pkt => !pkt.derived)
            || values(info.enums).some(e => !e.derived))
            error("extends: only allowed on top of the .md file")
        if (inner.errors)
            errors = errors.concat(inner.errors)
        const innerEnums = clone(inner.enums);
        Object.keys(innerEnums).filter(k => !info.enums[k])
            .forEach(k => {
                const ie = innerEnums[k];
                ie.derived = name
                info.enums[k] = ie;
            })
        const innerPackets = clone(inner.packets
            .filter(pkt => !info.packets.find(ipkt => ipkt.identifier === pkt.identifier)));
        innerPackets.forEach(pkt => pkt.derived = name)
        info.packets = [...info.packets, ...innerPackets]
        if (inner.highCommands)
            info.highCommands = true
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
        if (info.camelName == "system")
            return // no warnings in _system
        if (errors.some(e => e.line == lineNo && e.message == msg))
            return
        errors.push({ file: filename, line: lineNo, message: msg })
    }

    function normalizeName(n: string) {
        if (!/^\w+$/.test(n))
            error("expecting name here")
        if (n.length > 31)
            error(`name '${n}' too long`)
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
            case "devid":
                return [8, tp2, 0]
            case "bytes":
            case "string":
            case "string0":
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

        if (unitDescription[unit] || secondaryUnitConverters[unit])
            return unit as jdspec.Unit;
        error(`expecting unit, got '${unit}'`)
        return ""
    }

    function hasNaturalAlignment(iface: jdspec.PacketInfo) {
        let byteOffset = 0

        for (let m of iface.fields) {
            let sz = memberSize(m)
            if (sz == 0)
                continue
            const pad = sz > 4 ? 4 : sz
            if (!/^u8\[/.test(m.type) && byteOffset % pad != 0)
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
    const hdDef = `_JACDAC_SPEC_${toUpper(info.camelName)}_H`
    r += `#ifndef ${hdDef}\n`
    r += `#define ${hdDef} 1\n`

    let pref = "JD_" + toUpper(info.shortName) + "_"

    if (info.shortId[0] == "_")
        pref = "JD_"

    if (info.shortId[0] != "_")
        r += `\n#define JD_SERVICE_CLASS_${toUpper(info.shortName)}  ${toHex(info.classIdentifier)}\n`

    for (let en of values(info.enums).filter(en => !en.derived)) {
        const enPref = pref + toUpper(en.name)
        r += `\n// enum ${en.name} (${cStorage(en.storage)})\n`
        for (let k of Object.keys(en.members))
            r += "#define " + enPref + "_" + toUpper(k) + " " + toHex(en.members[k]) + "\n"
    }
    for (const pkt of info.packets) {
        if (pkt.derived)
            continue

        const cmt = addComment(pkt)
        r += wrapComment(cmt.comment)

        if (!pkt.secondary && pkt.kind != "pipe_command" && pkt.kind != "pipe_report") {
            let inner = "CMD"
            if (isRegister(pkt.kind))
                inner = "REG"
            else if (pkt.kind == "event")
                inner = "EV"
            else if (pkt.kind == "meta_pipe_command" || pkt.kind == "meta_pipe_report")
                inner = "PIPE"
            let val = toHex(pkt.identifier)
            if (pkt.identifierName)
                val = "JD_" + inner + "_" + toUpper(pkt.identifierName)
            let name = pref + inner + "_" + toUpper(pkt.name)
            if (name != val)
                r += `#define ${name} ${val}\n`
        }

        const isMetaPipe = pkt.kind == "meta_pipe_report" || pkt.kind == "meta_pipe_command"

        if (cmt.needsStruct || isMetaPipe) {
            let tname = "jd_" + toLower(info.camelName) + "_" + toLower(pkt.name)
            if (pkt.kind == "report")
                tname += "_report"
            r += `typedef struct ${tname} {\n`
            if (isMetaPipe) {
                r += `    uint32_t identifier; // ${toHex(pkt.identifier)}\n`
            }
            let unaligned = ""
            for (let i = 0; i < pkt.fields.length; ++i) {
                const f = pkt.fields[i]
                let def = ""
                const cst = cStorage(f.storage)
                const sz = memberSize(f)
                if (f.type == "string" || f.type == "string0")
                    def = `char ${f.name}[${sz}]`
                else if (cst == "bytes")
                    def = `uint8_t ${f.name}[${sz}]`
                else
                    def = `${cst} ${f.name}`
                // if it's the last field and it start repeats, treat it as an array
                if (f.startRepeats && i == pkt.fields.length - 1)
                    def += "[0]";
                def += ";"
                if (!f.isSimpleType && f.type != "devid")
                    def += "  // " + unitPref(f) + f.type
                else if (f.unit)
                    def += " // " + prettyUnit(f.unit)
                r += "    " + unaligned + def + "\n"
                if (f.type == "string0")
                    unaligned = "// "
            }
            r += `}${packed(pkt)} ${tname}_t;\n\n`
        }
    }
    r += "\n#endif\n"
    return r
}

export function camelize(name: string) {
    if (!name) return name;
    return name[0].toLowerCase() + name.slice(1).replace(/_([a-z])/g, (_, l) => l.toUpperCase())
}

function upperCamel(name: string) {
    name = camelize(name)
    if (!name?.length) return name
    return name[0].toUpperCase() + name.slice(1)
}

export function snakify(name: string) {
    return name?.replace(/([a-z])([A-Z])/g, (_, a, b) => a + "_" + b)
}

export function dashify(name: string) {
    if (!name) return name;
    return snakify(name.replace(/^_+/, '')).replace(/_/g, '-').toLowerCase();
}

function addComment(pkt: jdspec.PacketInfo) {
    let comment = ""

    let typeInfo = ""
    let needsStruct = false
    if (pkt.fields.length == 0) {
        if (pkt.kind != "event")
            typeInfo = "No args"
    } else if (pkt.fields.length == 1 && !pkt.fields[0].startRepeats) {
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
        comment += "Report: " + typeInfo + "\n"
    } else {
        if (pkt.description) {
            let desc = pkt.description.replace(/\n\n[^]*/, "")
            if (typeInfo)
                desc = typeInfo + ". " + desc
            comment = desc + "\n" + comment;
        }
    }

    return {
        comment,
        needsStruct
    }

}

function wrapComment(comment: string) {
    return "\n/**\n * " + comment.replace(/\n+$/, '').replace(/\n/g, "\n * ") + "\n */\n";
}

function wrapSnippet(code: string) {
    if (!code) return code;
    return `
\`\`\`
${code.replace(/^\n+/, '').replace(/\n+$/, '')}
\`\`\`
`
}

function packFormatForField(info: jdspec.ServiceSpec, fld: jdspec.PacketMember) {
    const sz = memberSize(fld)
    const szSuff = sz ? `[${sz}]` : ``
    let tsType = "number"
    let fmt = ""
    if (/^[fiu]\d+(\.\d+)?$/.test(fld.type) && 1 <= sz && sz <= 8) {
        fmt = fld.type
    } else if (/^u8\[\d*\]$/.exec(fld.type)) {
        fmt = "b" + szSuff
    } else if (info.enums[fld.type]) {
        fmt = canonicalType(info.enums[fld.type].storage)
        tsType = upperCamel(info.camelName) + upperCamel(fld.type)
    } else {
        switch (fld.type) {
            case "string":
                fmt = "s" + szSuff
                tsType = "string"
                break
            case "bytes":
                fmt = "b" + szSuff
                break
            case "string0":
                fmt = "z"
                tsType = "string"
                break
            case "devid":
                fmt = "b[8]"
                break
            case "pipe_port":
                fmt = "u16"
                break
            case "pipe":
                fmt = "b[12]"
                break
            case "bool":
                // TODO native bool support
                fmt = "u8"
                break
            default:
                return null
        }
    }

    if (tsType == "number" && fmt && fmt[0] == 'b')
        tsType = "Buffer"
    return { fmt, tsType }
}

/**
 * Generates the format to pack/unpack a data payload for this packet
 * @param pkt 
 * TODO fix this
 */
export function packFormat(sinfo: jdspec.ServiceSpec, pkt: jdspec.PacketInfo): string {
    if (pkt.packed || !pkt.fields?.length)
        return undefined;

    const fmt: string[] = []
    for (const fld of pkt.fields) {
        if (fld.startRepeats)
            fmt.push("r:")
        const ff = packFormatForField(sinfo, fld);
        if (!ff)
            return undefined;
        fmt.push(ff.fmt)
    }

    return fmt.join(" ");
}

function packInfo(info: jdspec.ServiceSpec, pkt: jdspec.PacketInfo, isStatic: boolean) {
    const vars: string[] = []
    const vartp: string[] = []
    let fmt = ""
    let repeats: string[]
    let reptp: string[]

    for (let i = 0; i < pkt.fields.length; ++i) {
        const fld = pkt.fields[i]
        let isArray = ""
        if (fld.startRepeats) {
            if (i == pkt.fields.length - 1) {
                isArray = "[]"
            } else {
                fmt += "r: "
                repeats = []
                reptp = []
                vars.push("rest")
            }
        }
        const varname = camelize(fld.name == "_" ? pkt.name : fld.name)
        const f0 = packFormatForField(info, fld)
        if (!f0 || /(reserved|padding)/.test(fld.name)) {
            if (!f0)
                console.log(`${pkt.name}/${fld.name} - can't get format for '${fld.type}'`)
            fmt += `x[${memberSize(fld)}] `
        } else {
            fmt += f0.fmt + isArray + " "
            let tp = f0.tsType
            if (tp == "Buffer" && !isStatic)
                tp = "Uint8Array"
            tp += isArray
            if (repeats) {
                repeats.push(varname)
                reptp.push(tp)
            } else {
                vars.push(varname)
                vartp.push(tp)
            }
        }
    }

    fmt = fmt.replace(/ *$/, "")

    if (reptp)
        vartp.push("([" + reptp.join(", ") + "])[]")

    let buffers = ""
    buffers += `const [${vars.join(", ")}] = jdunpack<[${vartp.join(", ")}]>(buf, "${fmt}")\n`
    if (repeats)
        buffers += `const [${repeats.join(", ")}] = rest[0]\n`

    buffers = buffers.replace(/\n*$/, "")

    return buffers
}

function memberSize(fld: jdspec.PacketMember) {
    return Math.abs(fld.storage)
}

function toTypescript(info: jdspec.ServiceSpec, staticTypeScript: boolean) {
    const indent = staticTypeScript ? "    " : "";
    const indent2 = indent + "    "
    const enumkw = staticTypeScript ? indent + "export const enum" : "export enum"
    let r = staticTypeScript ? "namespace jacdac {\n" : "";
    r += indent + "// Service: " + info.name + "\n"
    if (info.shortId[0] != "_") {
        r += indent + `export const SRV_${snakify(info.camelName).toLocaleUpperCase()} = ${toHex(info.classIdentifier)}\n`
    }
    const pref = upperCamel(info.camelName)
    for (let en of values(info.enums)) {
        const enPref = pref + upperCamel(en.name)
        r += `\n${enumkw} ${enPref} { // ${cStorage(en.storage)}\n`
        for (let k of Object.keys(en.members))
            r += indent2 + k + " = " + toHex(en.members[k]) + ",\n"
        r += indent + "}\n\n"
    }
    const tsEnums: jdspec.SMap<string> = {}

    for (const pkt of info.packets) {
        if (pkt.derived)
            continue

        const cmt = addComment(pkt)
        let pack = pkt.fields.length ? packInfo(info, pkt, staticTypeScript) : ""

        let inner = "Cmd"
        if (isRegister(pkt.kind))
            inner = "Reg"
        else if (pkt.kind == "event")
            inner = "Event"
        else if (pkt.kind == "meta_pipe_command" || pkt.kind == "meta_pipe_report")
            inner = "PipeCmd"
        else if (pkt.kind == "pipe_command" || pkt.kind == "pipe_report")
            inner = "info"

        let text = ""
        let meta = ""
        if (pkt.secondary || inner == "info") {
            if (pack)
                text = wrapComment(`${pkt.kind} ${upperCamel(pkt.name)}${wrapSnippet(pack)}`);
        } else {
            let val = toHex(pkt.identifier)
            if (staticTypeScript && pkt.kind === "event") {
                meta = `//% block="${snakify(pkt.name).replace(/_/g, ' ')}"\n`
            }
            text = `${wrapComment(cmt.comment + wrapSnippet(pack)) + meta}${upperCamel(pkt.name)} = ${val},\n`
        }

        if (text)
            tsEnums[inner] = (tsEnums[inner] || "") + text

        // don't line const strings in makecode,
        // they don't get dropped efficiently
    }

    for (const k of Object.keys(tsEnums)) {
        if (k == "info")
            r += tsEnums[k].replace(/^/mg, indent) + "\n\n"
        else {
            const inner = tsEnums[k]
                .replace(/^\n+/, "")
                .replace(/\n$/, "")
                .replace(/\n/g, "\n    " + indent)
            r += `${enumkw} ${pref}${k} {\n    ${indent}${inner}\n${indent}}\n\n`
        }
    }

    if (staticTypeScript)
        r += "}\n"

    return r.replace(/ *$/mg, "")
}


export function normalizeDeviceSpecification(dev: jdspec.DeviceSpec) {
    // reorder fields
    const clone: jdspec.DeviceSpec = {
        id: dev.id = escapeDeviceIdentifier(dev.company) + '-' + escapeDeviceNameIdentifier(dev.name),
        name: dev.name,
        company: dev.company,
        description: dev.description,
        repo: dev.repo,
        link: dev.link,
        services: dev.services || [],
        firmwares: dev.firmwares || []
    }
    return clone;
}

export function escapeDeviceIdentifier(text: string) {
    if (!text) text = ""
    const escaped = text.trim().toLowerCase().replace(/([^a-z0-9\_-])+/ig, '-')
        .replace(/^-+/, '').replace(/-+$/, '');
    const id = snakify(escaped)
    return id;
}

export function escapeDeviceNameIdentifier(text: string) {
    return escapeDeviceIdentifier(text).replace(/-/g, "")
}

export function converters(): jdspec.SMap<(s: jdspec.ServiceSpec) => string> {
    return {
        "json": (j: jdspec.ServiceSpec) => JSON.stringify(j, null, 2),
        "c": toH,
        "ts": j => toTypescript(j, false),
        "sts": j => toTypescript(j, true),
        /*
        "cpp": toHPP,
        */
    }
}

