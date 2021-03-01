/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import { parseIntFloat, getRegister } from "./jdutils";
import { JSONPath } from "jsonpath-plus"
import jsep = require("jsep");

const testCommandFunctions: jdtest.TestFunctionDescription[] = [
    { id: "reset", args:[], prompt: "sends a reset command to the module"},
    { id: "changes", args:["reg"], prompt: "did the value of $1 change?"},
    { id: "ask", args:["string"], prompt: undefined },
    { id: "check", args:["boolean"], prompt: "does the condition $1 hold?"},
    { id: "increases", args:["reg"], prompt: "did the value of register $1 increase?"},
    { id: "decreases", args:["reg"], prompt: "did the value of register $1 decrease?"},
    { id: "increasesBy", args:["reg","number"], prompt: "did the value of register $1 increase by $2?"},
    { id: "decreasesBy", args:["reg","number"], prompt: "did the value of register $1 decrease by $2?"},
    { id: "rangesFromUpTo", args:["reg", "number", "number"], prompt: "register $1 should range in value from $2 up to $3"},
    { id: "rangesFromDownTo", args:["reg", "number", "number"], prompt: "register $1 should range in value from $2 down to $3"}
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
        const [ , callee] = call;
        const index = testCommandFunctions.findIndex(r => callee == r.id)
        if (index < 0)
            error(callee + " is not a registered test function.")
        const expr: jsep.CallExpression = <jsep.CallExpression>jsep(expanded);
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
                    const expected = testCommandFunctions[indexFun].args.length
                    if (expected !== callExpr.arguments.length)
                        error(callee+" expects "+expected+" arguments; got "+callExpr.arguments.length)
                })
            })
            // now visit all (p,c), c an Identifier that is not a callee child of CallExpression 
            // or a property child of a MemberExpression
            const exprs = <jsep.Expression[]>JSONPath({path: "$..*[?(@.type=='Identifier')]^", json: expr})
            exprs.forEach(parent => {
                const ids = <jsep.Identifier[]>JSONPath({path: "$.*[?(@.type=='Identifier')]", json: parent})
                ids.forEach(id => { lookupReplace(parent, id) })
            })
            currentTest.commands.push(expr);
        }
    }

    function lookupReplace(parent: jsep.Expression, idChild: jsep.Identifier) {
        if (parent.type === "CallExpression" && idChild !== (<jsep.CallExpression>parent).callee
        || parent.type === "MemberExpression" && idChild != (<jsep.MemberExpression>parent).property) {
            try {
                try {
                    const val = parseIntFloat(spec, idChild.name)
                    const lit: jsep.Literal = {
                        type: 'Literal',
                        value: val,
                        raw: val.toString()
                    };
                    // replace the Identifier by the (resolved) Literal
                    Object.keys(parent).forEach((key:string) => {
                        if (Object.getOwnPropertyDescriptor(parent,key) == idChild)
                            Object.defineProperty(parent, key, lit);
                    })
                } catch(e) {
                    getRegister(spec, idChild.name)
                    // TODO: if parent is MemberExpression, continue to do lookup
                }
            } catch (e) {
                error(idChild.name + " not found in specification")
            }
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
