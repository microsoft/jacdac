/// <reference path="jdspec.d.ts" />
/// <reference path="./jsep/jsep.d.ts" />

import { parseIntFloat, getRegister, packetsToRegisters } from "./jdutils";
import { camelize, capitalize } from "./jdspec"
import { parse }  from "./jsep/jsep";

export const testFunctions: jdtest.TestFunctionDescription[] = [
    { id: "reset", prompt: "sends a reset command to the module"},
    { id: "changes", prompt: "did the value of $1 change?"},
    { id: "ask", prompt: ""},
    { id: "check", prompt: ""},
    { id: "increases", prompt: ""},
    { id: "decreases", prompt: ""},
    { id: "rangesFromUpTo", prompt: ""},
    { id: "rangesFromDownTo", prompt: ""}
]

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
    let currentTest: jdtest.UnitTest = null
    let testHeading: string = ""
    let testPrompt: string = ""

    try {
        for (let line of filecontent.split(/\n/)) {
            lineNo++
            processLine(line)
        }
    } catch (e) {
        error("exception: " + e.message)
    }

    if (!info.description)
        error("file is missing a header description (#)")

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
                testHeading = ""
                testPrompt = ""
                let [_full, hd, cont] = m
                cont = cont.trim()
                if (hd == "#" && !info.description) {
                    info.description = cont
                } else if (hd =="##") {
                    testHeading = cont;
                }
            } else {
                testPrompt += line;
            }
            if (currentTest)
                finishTest();
        } else {
            const expanded = line
                .replace(/\/\/.*/, "")
                .trim()
            if (!expanded)
                return
            processCommand(expanded)
        }
    }

    function processCommand(expanded: string)  {
        if (!currentTest) {
            if (!testHeading)
                error("every test must have a description (via ##)")
            currentTest = {
                description: testHeading,
                prompt: testPrompt,
                commands: []
            }
            testHeading = ""
            testPrompt = ""
        }
        const call = /^([a-zA-Z]\w*)\(.*\)$/.exec(expanded);
        if (!call) {
            error("a command must be a call to a test function (JavaScript syntax)");
        }
        const [_full, callee] = call;
        let index = testFunctions.findIndex(r => callee == r.id)
        if (index < 0)
            error(callee + " is not a registered test function.")
        let expr: jsep.CallExpression = <jsep.CallExpression>parse(expanded);
        if (!expr.callee) {
            error("a command must be a call expression in JavaScript syntax");
        } else {
            // must be a direct call
            currentTest.commands.push(expr);
        }
    }

    // check expression
    // all calls are direct calls

    /*
    function getValue(w: string): jdtest.ServiceTestToken {
        let info: jdtest.ServiceTestToken = {}
        try {
            info.const = parseIntFloat(spec, w, true)
        } catch (e) {
            return getReg(w);
        }
        return info;
    }

    function getReg(w: string) {
        let info: jdtest.ServiceTestToken = {}
        let r = getRegister(spec, w);
        info.id = r.pkt.name;
        if (r.fld) info.id += ("." + r.fld.name);
        return info;
    }
*/

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
