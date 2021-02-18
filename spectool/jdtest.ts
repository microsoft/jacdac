/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

// we parse a test with respect to an an existing ServiceSpec
export function parseSpecificationTestMarkdownToJSON(filecontent: string, spec: jdspec.ServiceSpec, filename = ""): jdtest.ServiceTest {
    filecontent = (filecontent || "").replace(/\r/g, "")
    let info: jdtest.ServiceTest = {
        service: spec,
        tests: []
    }

    let backticksType = ""
    let errors: jdspec.Diagnostic[] = []
    let lineNo = 0
    let nextModifier: "" | "segmented" | "multi-segmented" | "repeats" = ""

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

    return info;

    function processLine(line: string) {
        
    }
    
    function error(msg: string) {
        if (!msg) msg = "syntax error"
        if (errors.some(e => e.line == lineNo && e.message == msg))
            return
        errors.push({ file: filename, line: lineNo, message: msg })
    }
}

