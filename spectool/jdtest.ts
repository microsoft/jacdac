/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import * as utils from "./utils";

// we parse a test with respect to an existing ServiceSpec
export function parseSpecificationTestMarkdownToJSON(filecontent: string, spec: jdspec.ServiceSpec, filename = ""): jdtest.ServiceTest {
    filecontent = (filecontent || "").replace(/\r/g, "")
    let info: jdtest.ServiceTest = {
        description: "experimental",
        service: spec,
        tests: []
    }

    let backticksType = ""
    let errors: jdspec.Diagnostic[] = []
    let lineNo = 0
    let currentTest: jdtest.UnitTest = null;
    let testsToDescribe: jdtest.UnitTest[] = null;
    let currentCommand: jdtest.Command = null;
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
                testsToDescribe = null;
                let [_full, hd, cont] = m
                cont = cont.trim()
                if (hd == "#" && !info.description) {
                    info.description = cont
                    line = ""
                }
            }
            if (testsToDescribe) {
                for (const iface of testsToDescribe)
                    iface.description += line + "\n"
            }
            if (!currentTest)
                finishTest();
        } else {
            if (testsToDescribe && testsToDescribe[0].description)
                testsToDescribe = null
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
            switch (cmd) {
                case "observe":
                case "check":
                case "ask":
                case "say":
                case "establish":
                case "changes":
                    processCommand(words)
                    break
                default:
                    error(`Expected a command: ${cmd} is unknown`)
            }
        }
    }

    function processCommand(words: string[])  {
        let cmd = <jdtest.CommandKind>words[0]
        let command: jdtest.Command = {
            kind: cmd
        }
        if (!currentTest) {
            currentTest = {
                description: "",
                commands: [{ kind: cmd }]
            }
            if (!testsToDescribe)
                testsToDescribe = []
            testsToDescribe.push(currentTest)
        }
        switch (cmd) {
            case "say": 
            case "ask":
                command.message = words.slice(1).join(" ");
                break
            case "changes":
            case "observe": {
                try {
                    let r = utils.getRegister(spec, words[1]);
                    command.expr = { left: { id: r.pkt.name }}
                    command.expr.left.field = r.fld?.name;
                    if (cmd == "observe") {
                        // TODO: parse the trace
                    }
                } catch (e) {
                    error(e.message)
                }
                break
            }
            case "check":
            case "establish":
                command.expr = {
                    left: getValue(words[1]),
                    op: getOperator(words[2]),
                    right: getValue(words[3])
                }
                break
        }
    }

    function getValue(w: string): jdtest.Value {
        let info: jdtest.Value = {}
        info.negate = false
        if (/^-/.test(w)) {
            info.negate = true;
            w = w.slice(1);
        }
        try {
            info.const = utils.parseIntCheck(spec, w, true)
        } catch (e) {
            error(e.message);
            try {
                let r = utils.getRegister(spec, w);
                info.id = r.pkt.name;
                info.field = r.fld?.name;
            } catch (e) {
                error(e.message)
            }
        }
        return info;
    }

    function getOperator(op: string): jdtest.ComparisonKind {
        switch(op) {
            case "==": return "eq";
            case "!=": return "ne";
            case "<": return "lt";
            case ">": return "gt";
            case "<=": return "le";
            case ">=": return "ge";
            default:
                error(`expected comparison operator, got ${op}`)
        }
    }

    function finishTest()  {
        info.tests.push(currentTest);
        currentTest = null
    }
    
    function error(msg: string) {
        if (!msg) msg = "syntax error"
        if (errors.some(e => e.line == lineNo && e.message == msg))
            return
        errors.push({ file: filename, line: lineNo, message: msg })
    }
}

