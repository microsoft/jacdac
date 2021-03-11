/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import { parseIntFloat, getRegister } from "./jdutils"
import { testCommandFunctions, testExpressionFunctions } from "./jdtestfuns"
import jsep, { ExpressionType } from "jsep"

const supportedExpressions: ExpressionType[] = [
    "BinaryExpression",
    "CallExpression",
    "Identifier",
    "Literal",
    "UnaryExpression",
    "LogicalExpression",
]

export function getExpressionsOfType(expr: jsep.Expression | jsep.Expression[], type: string, returnParent = false) {
    const results: jsep.Expression[] = []
    visit(null, expr)
    return results

    function visit(parent: any, current: any) {
        if (Array.isArray(current)) {
            (current as any[]).forEach(c => visit(current, c))
        } else if (typeof current === "object") {
            if (parent && current?.type === type)
                results.push(returnParent ? parent : current)
            Object.keys(current).forEach((key: string) => {
                visit(current, current[key])
            })
        }
    }
}

// we parse a test with respect to an existing ServiceSpec
export function parseSpecificationTestMarkdownToJSON(
    filecontent: string,
    spec: jdspec.ServiceSpec,
    filename = ""
): jdtest.ServiceTestSpec {
    filecontent = (filecontent || "").replace(/\r/g, "")
    const info: jdtest.ServiceTestSpec = {
        description: "",
        serviceClassIdentifier: spec.classIdentifier,
        tests: [],
    }

    let backticksType = ""
    const errors: jdspec.Diagnostic[] = []
    let lineNo = 0
    let currentTest: jdtest.TestSpec = null
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

    if (currentTest) finishTest()

    if (errors.length) info.errors = errors

    return info

    function processLine(line: string) {
        if (backticksType) {
            if (line.trim() == "```") {
                backticksType = null
                if (backticksType == "default") return
            }
        } else {
            const m = /^```(.*)/.exec(line)
            if (m) {
                backticksType = m[1] || "default"
                if (backticksType == "default") return
            }
        }

        const interpret =
            backticksType == "default" || line.slice(0, 4) == "    "

        if (!interpret) {
            const m = /^(#+)\s*(.*)/.exec(line)
            if (m) {
                testHeading = ""
                testPrompt = ""
                const [, hd, cont] = m
                if (hd == "#" && !info.description) {
                    info.description = cont.trim()
                } else if (hd == "##") {
                    if (currentTest) finishTest()
                    testHeading = cont.trim()
                }
            } else {
                testPrompt += line
            }
        } else {
            const expanded = line.replace(/\/\/.*/, "").trim()
            if (!expanded) return
            processCommand(expanded)
        }
    }

    function processCommand(expanded: string) {
        if (!currentTest) {
            if (!testHeading)
                error(`every test must have a description (via ##)`)
            currentTest = {
                description: testHeading,
                registers: [],
                commands: [],
            }
            testHeading = ""
        }
        const call = /^([a-zA-Z]\w*)\(.*\)$/.exec(expanded)
        if (!call) {
            error(
                `a command must be a call to a registered test function (JavaScript syntax)`
            )
            return
        }
        const [, callee] = call
        const index = testCommandFunctions.findIndex(r => callee == r.id)
        if (index < 0) {
            error(`${callee} is not a registered test command function.`)
            return
        }
        const root: jsep.CallExpression = <jsep.CallExpression>jsep(expanded)
        if (
            !root ||
            !root.type ||
            root.type != "CallExpression" ||
            !root.callee ||
            !root.arguments
        ) {
            error(`a command must be a call expression in JavaScript syntax`)
        } else {
            // check for unsupported expression types
            if (supportedExpressions.indexOf(root.type) < 0)
                error(`Expression of type ${root.type} not currently supported`)
            // check arguments
            const expected = testCommandFunctions[index].args.length
            if (expected !== root.arguments.length)
                error(
                    `${callee} expects ${expected} arguments; got ${root.arguments.length}`
                )
            else {
                root.arguments.forEach((arg,a) => {
                    if (testCommandFunctions[index].args[a] === "register" && arg.type !== "Identifier") {
                        error (
                            `${callee} expects a register in argument position ${a+1}`
                        )
                    }
                })
                const callers = <jsep.CallExpression[]>getExpressionsOfType(root,'CallExpression')
                callers.forEach(callExpr => {
                    if (callExpr.callee.type !== "Identifier")
                        error(`all calls must be direct calls`)
                    const id = (<jsep.Identifier>callExpr.callee).name
                    const indexFun = testExpressionFunctions.findIndex(
                        r => id == r.id
                    )
                    if (indexFun < 0)
                        error(
                            `${id} is not a registered test expression function.`
                        )
                    if (id === 'start') {
                        if (callee !== 'check')
                            error("start expression function can only be used inside check test function")
                        const callsUnder = <jsep.CallExpression[]>getExpressionsOfType(callExpr,'CallExpression')
                        callsUnder.forEach(ce => {
                            if (ce.callee.type === "Identifier" && (<jsep.Identifier>ce.callee).name === "start")
                                error("cannot nest start underneath start")
                        })
                    }
                    const expected =
                        testExpressionFunctions[indexFun].args.length
                    if (expected !== callExpr.arguments.length)
                        error(
                            `${callee} expects ${expected} arguments; got ${callExpr.arguments.length}`
                        )
                })
            }
            // now visit all (p,c), c an Identifier that is not a callee child of CallExpression
            // or a property child of a MemberExpression
            const exprs = <any[]>getExpressionsOfType(root, 'Identifier', true)
            let visited: any[] = []
            exprs.forEach(parent => {
                if (visited.indexOf(parent) < 0) {
                    visited.push(parent)
                    lookupReplace(parent)
                }
            })
            currentTest.commands.push({ prompt: testPrompt, call: root })
            testPrompt = ""
        }
    }

    function lookupReplace(parent: any) {
        if (Array.isArray(parent)) {
            const exprs: jsep.Expression[] = parent
            exprs.forEach((child: jsep.Expression) => {
                if (child.type === "Identifier")
                    lookup(parent, <jsep.Identifier>child)
            })
        } else {
            Object.keys(parent).forEach((key: string) => {
                const child = parent[key]
                if (child?.type !== "Identifier") return
                if (
                    (parent.type !== "MemberExpression" &&
                        parent.type !== "CallExpression") ||
                    (parent.type === "MemberExpression" &&
                        child !== (<jsep.MemberExpression>parent).property) ||
                    (parent.type === "CallExpression" &&
                        child !== (<jsep.CallExpression>parent).callee)
                ) {
                    lookup(parent, <jsep.Identifier>child)
                }
            })
        }

        function lookup(parent: any, child: jsep.Identifier) {
            try {
                try {
                    const val = parseIntFloat(spec, child.name)
                    const lit: jsep.Literal = {
                        type: "Literal",
                        value: val,
                        raw: val.toString(),
                    }
                    /*TODO: replace the Identifier by the (resolved) Literal
                    if (parent.type) {
                        Object.keys(parent).forEach((key:string) => {
                            if (Object.getOwnPropertyDescriptor(parent,key) == child)
                                Object.defineProperty(parent, key, lit);
                        })
                    } else {
    
                    }*/
                } catch (e) {
                    getRegister(spec, child.name)
                    if (currentTest.registers.indexOf(child.name) < 0)
                        currentTest.registers.push(child.name)
                    // TODO: if parent is MemberExpression, continue to do lookup
                }
            } catch (e) {
                error(`${child.name} not found in specification`)
            }
        }
    }

    function finishTest() {
        info.tests.push(currentTest)
        currentTest = null
    }

    function error(msg: string) {
        if (!msg) msg = "syntax error"
        if (errors.some(e => e.line == lineNo && e.message == msg)) return
        errors.push({ file: filename, line: lineNo, message: msg })
    }
}
