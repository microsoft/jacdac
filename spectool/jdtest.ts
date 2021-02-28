/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />
/// <reference path="./jsep/jsep.d.ts" />

import { parseIntFloat, getRegister, packetsToRegisters } from "./jdutils";
import { camelize, capitalize } from "./jdspec"
import { JSONPath } from "jsonpath-plus"
import { parse } from "./jsep/jsep"

const testCommandFunctions: jdtest.TestFunctionDescription[] = [
    { id: "reset", args:[], prompt: "sends a reset command to the module"},
    { id: "changes", args:["reg"], prompt: "did the value of $1 change?"},
    { id: "ask", args:["string"], prompt: ""},
    { id: "check", args:["boolean"], prompt: ""},
    { id: "increases", args:["reg"], prompt: ""},
    { id: "decreases", args:["reg"], prompt: ""},
    { id: "increasesBy", args:["reg","number"], prompt: ""},
    { id: "decreasesBy", args:["reg","number"], prompt: ""},
    { id: "rangesFromUpTo", args:["reg", "number", "number"], prompt: ""},
    { id: "rangesFromDownTo", args:["reg", "number", "number"], prompt: ""}
]

const testExpressionFunctions: jdtest.TestFunctionDescription[] = [
    { id: "start", args:["any"], prompt: "value at beginning of test" }
]

// we parse a test with respect to an existing ServiceSpec
export function parseSpecificationTestMarkdownToJSON(filecontent: string, spec: jdspec.ServiceSpec, filename = ""): jdtest.ServiceTest {
    filecontent = (filecontent || "").replace(/\r/g, "")
    const info: jdtest.ServiceTest = {
        description: null,
        serviceClassIdentifier: spec.classIdentifier,
        tests: []
    }

    let backticksType = ""
    const errors: jdspec.Diagnostic[] = []
    let lineNo = 0
    let currentTest: jdtest.UnitTest = null
    let testHeading = ""
    let testPrompt = ""

    try {
        for (const line of filecontent.split(/\n/)) {
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
                const [ , hd, cont] = m
                if (hd == "#" && !info.description) {
                    info.description = cont.trim()
                } else if (hd =="##") {
                    testHeading = cont.trim();
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
            error("a command must be a call to a registered test function (JavaScript syntax)");
        }
        const [_full, callee] = call;
        const index = testCommandFunctions.findIndex(r => callee == r.id)
        if (index < 0)
            error(callee + " is not a registered test function.")
        const expr: jsep.CallExpression = <jsep.CallExpression>parse(expanded);
        if (!expr.callee) {
            error("a command must be a call expression in JavaScript syntax");
        } else {
            // check arguments
            const expected = testCommandFunctions[index].args.length
            if (expected !== expr.arguments.length)
                error(callee+" expects "+expected+" arguments; got "+expr.arguments.length)
            expr.arguments.forEach(arg => {
                const callees = <jsep.CallExpression[]> JSONPath({path: "$..*[?(@.type=='CallExpression')]", json: arg})
                callees.forEach(callExpr => {
                    if (callExpr.callee.type !== 'Identifier')
                        error("all calls must be direct calls")
                    const id = (<jsep.Identifier>callExpr.callee).name;
                    const indexFun = testExpressionFunctions.findIndex(r => id == r.id)
                    if (indexFun < 0)
                        error(id + " is not a registered test function.")
                    // check the arguments
                })
            })
            // now visit all (p,c), c an Identifier that is not a child of CallExpression or a MEMBER_EXP operator
            const exprs = <jsep.Expression[]>JSONPath({path: "$..*[?(@.type!='CallExpression')]", json: expr})
            exprs.forEach(e => {
                // TODO: lookup all identifiers in spec and resolve constants (replacing Id with Const)
            })
            currentTest.commands.push(expr);
        }
    }

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
