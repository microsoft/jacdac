/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import { parseIntFloat, getRegister } from "./utils";

// we parse a test with respect to an existing ServiceSpec
export function parseSpecificationTestMarkdownToJSON(filecontent: string, spec: jdspec.ServiceSpec, filename = ""): jdtest.ServiceTest {
    filecontent = (filecontent || "").replace(/\r/g, "")
    let info: jdtest.ServiceTest = {
        description: null,
        serviceClassIdentifier: spec.classIdentifier,
        tests: []
    }

    let backticksType = ""
    let errors: jdspec.Diagnostic[] = []
    let lineNo = 0
    let currentTest: jdtest.UnitTest = null;
    let testHeading: string = ""

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
                testHeading = "";
                let [_full, hd, cont] = m
                cont = cont.trim()
                if (hd == "#" && !info.description) {
                    info.description = cont
                } else if (hd =="##") {
                    testHeading = cont;
                }
            }
            if (currentTest)
                finishTest();
        } else {
            const expanded = line
                .replace(/\/\/.*/, "")
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
        let cmd = <jdtest.ServiceTestCommandKind>words[0]
        let command: jdtest.ServiceTestCommand = {
            kind: cmd
        }
        if (!currentTest) {
            if (!testHeading)
                error("every test must have a description via ##")
            currentTest = {
                description: testHeading,
                commands: []
            }
            testHeading = "";
        }
        currentTest.commands.push(command);
        switch (cmd) {
            case "say": 
            case "ask":
                command.message = words.slice(1).join(" ");
                break
            case "changes":
            case "observe": {
                try {
                    let r = getRegister(spec, words[1]);
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

    function getValue(w: string): jdtest.ServiceTestValue {
        let info: jdtest.ServiceTestValue = {}
        info.negate = false
        if (/^-/.test(w)) {
            info.negate = true;
            w = w.slice(1);
        }
        try {
            info.const = parseIntFloat(spec, w, true)
        } catch (e) {
            // error(e.message);
            try {
                let r = getRegister(spec, w);
                info.id = r.pkt.name;
                info.field = r.fld?.name;
            } catch (e) {
                error(e.message)
            }
        }
        return info;
    }

    function getOperator(op: string): jdtest.ServiceTestComparisonKind {
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

