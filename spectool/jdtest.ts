/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import { parseIntFloat, getRegister } from "./jdutils";
import { JSONPath } from "jsonpath-plus"
import { testCommandFunctions, testExpressionFunctions } from "./jdtestfuns"
import jsep, { ExpressionType } from "jsep";

const supportedExpressions: ExpressionType[] = [ 'BinaryExpression', 'CallExpression', 'Identifier',
    'Literal', 'UnaryExpression', 'LogicalExpression' ]

// we parse a test with respect to an existing ServiceSpec
export function parseSpecificationTestMarkdownToJSON(filecontent: string, spec: jdspec.ServiceSpec, filename = ""): jdtest.ServiceTest {
    filecontent = (filecontent || "").replace(/\r/g, "")
    const info: jdtest.ServiceTest = {
        description: "",
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

    if (currentTest)
        finishTest();

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
                    if (currentTest)
                        finishTest();
                    testHeading = cont.trim();
                }
            } else {
                testPrompt += line;
            }
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
                registers: [],
                commands: []
            }
            testHeading = ""
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
            // check for unsupported expression types
            if (supportedExpressions.indexOf(expr.type) < 0)
                error('Expression of type ' + expr.type + ' not currently supported')
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
            currentTest.commands.push({prompt: testPrompt, call: expr});
            testPrompt = "";
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
                    if (currentTest.registers.indexOf(idChild.name) < 0)
                        currentTest.registers.push(idChild.name)
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
