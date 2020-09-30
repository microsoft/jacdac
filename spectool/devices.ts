/// <reference path="jdspec.d.ts" />

export function parseDeviceMarkdownToJSON(filecontent: string, defl: jdspec.DeviceSpec, usedFw: jdspec.SMap<string>, filename: string): jdspec.DeviceSpec {
    filecontent = filecontent.replace(/\r/g, "")

    const info: jdspec.DeviceSpec = defl ? clone(defl) : {
        id: "",
        name: "",
        description: "",
        repo: "",
        firmwares: [],
        services: [],
    }
    info.source = filecontent

    info.description = "" // just in case it came from _default

    const errors: jdspec.Diagnostic[] = []
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

    info.description = info.description.replace(/\n*$/, "")

    return info

    function processLine(line: string) {
        line = line.trim()
        if (!line)
            return
        let m = /^#\s*(.*)/.exec(line)
        if (m) {
            info.name = m[1]
            return
        }
        m = /^\*\s+(\w+):?\s*(.*)/.exec(line)
        if (m) {
            const tag = m[1]
            const val = m[2]
            switch (tag) {
                case "repo":
                    info.repo = checkLink(val)
                    break
                case "link":
                    info.link = checkLink(val)
                    break
                case "firmware":
                case "firmwares":
                    info.firmwares = val.split(/[,\s]+/).map(parseIntCheck)
                    for (const fw of info.firmwares) {
                        if (usedFw[fw + ""]) {
                            error(`firmware ID 0x${fw.toString(16)} already used in ${usedFw[fw + ""]}`)
                        }
                        usedFw[fw + ""] = filename || "file"
                    }
                    break
                case "services":
                case "service":
                    info.services = val.split(/[,\s]+/).map(parseIntCheck)
                    break
                default:
                    error(`unknown tag: ${tag}`)
            }
            return
        }

        info.description += line + "\n"
    }

    function checkLink(w: string) {
        w = w.trim()
        if (!/^https?:\/\//.test(w))
            error(`${w} doesn't look like a link`)
        return w
    }


    function parseIntCheck(w: string) {
        if (/^-?0x[a-f\d_]+$/i.test(w) || /^-?[\d_]+$/.test(w)) {
            const v = parseInt(w.replace(/_/g, "")) // allow for 0x3fff_ffff syntax
            if (isNaN(v))
                error("can't parse int: " + w)
            return v
        }
        error(`expecting int here`)
        return 0
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
}
