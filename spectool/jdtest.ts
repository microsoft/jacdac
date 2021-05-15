/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import { 
    parseIntFloat, 
    getRegister, 
    exprVisitor,
    isBoolOrNumericFormat,
    SpecSymbolResolver
} from "./jdutils"
import { getTestCommandFunctions, getTestExpressionFunctions } from "./jdtestfuns"
import jsep from "jsep"

const supportedExpressions: jsep.ExpressionType[] = [
    "MemberExpression",
    "ArrayExpression",
    "BinaryExpression",
    "CallExpression",
    "Identifier",
    "Literal",
    "UnaryExpression",
    "LogicalExpression",
]

// we parse a test with respect to an existing ServiceSpec
export function parseSpecificationTestMarkdownToJSON(
    filecontent: string,
    spec: jdspec.ServiceSpec,
    filename = ""
): jdtest.ServiceTestSpec {
    if (!spec)
        return undefined;

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
    const symbolResolver = new SpecSymbolResolver(spec, (e) => error(e))

    try {
        for (const line of filecontent.split(/\n/)) {
            lineNo++
            processLine(line)
        }
    } catch (e) {
        error("exception: " + e.message)
    }

    if (currentTest) finishTest(symbolResolver)

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
            backticksType == "default" || 
            line.slice(0, 4) == "    " ||
            /^\t/.exec(line)

        if (!interpret) {
            const m = /^(#+)\s*(.*)/.exec(line)
            if (m) {
                testHeading = ""
                testPrompt = ""
                const [, hd, cont] = m
                if (hd == "#") {
                    if (!info.description)
                        info.description = cont.trim()
                    else 
                        error("use ## to start a test, not #")
                } else if (hd == "##") {
                    if (currentTest) finishTest(symbolResolver)
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

    function argsRequiredOptional(args: any[], optional: boolean = false) {
        return args.filter(a => !optional && typeof(a) === "string" || optional && typeof(a) === "object")
    }

    function processCommand(expanded: string) {
        // TODO: if there is a prompt, the test has no commands, and
        // TODO: the first command is not ask/say
        // TODO: then add a say command

        if (!currentTest) {
            if (!testHeading)
                error(`every test must have a description (via ##)`)
            currentTest = {
                description: testHeading,
                prompt: testPrompt,
                registers: [],
                events: [],
                testCommands: [],
            }
            testHeading = ""
            testPrompt = ""
        }
        const call = /^([a-zA-Z]\w*)\(.*\)$/.exec(expanded)
        if (!call) {
            error(
                `a command must be a call to a registered test function (JavaScript syntax)`
            )
            return
        }
        const [, callee] = call
        const testCommandFunctions = getTestCommandFunctions();
        const cmdIndex = testCommandFunctions.findIndex(r => callee == r.id)
        if (cmdIndex < 0) {
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
            exprVisitor(null, root, (p, c) => {
                if (supportedExpressions.indexOf(c.type) < 0)
                    error(`Expression of type ${c.type} not currently supported`)
            })
            // check arguments
            const command = testCommandFunctions[cmdIndex]
            const minArgs = argsRequiredOptional(command.args).length
            const maxArgs = command.args.length
            if (root.arguments.length < minArgs)
                error(
                    `${callee} expects at least ${minArgs} arguments; got ${root.arguments.length}`
                )
            else if (root.arguments.length > maxArgs) {
                error(
                    `${callee} expects at most ${maxArgs} arguments; got ${root.arguments.length}`
                )
            }
            else {
                // deal with optional arguments
                let newExpressions: jsep.Expression[] = []
                for(let i = root.arguments.length; i<command.args.length;i++) {
                    let [name, def] = command.args[i] as [string, any] 
                    const lit: jsep.Literal = {
                        type: "Literal",
                        value: def,
                        raw: def.toString(),
                    }
                    newExpressions.push(lit)
                }
                root.arguments = root.arguments.concat(newExpressions)

                // type checking of arguments.
                symbolResolver.processArguments(command, root);
                // check all calls in subexpressions
                processCalls(command, root.arguments)
            }
            currentTest.testCommands.push({ prompt: testPrompt, call: root })
            testPrompt = ""
        }

        function processCalls(command: jdtest.TestFunctionDescription, args: jsep.Expression[]) {
            const testExpressionFunctions = getTestExpressionFunctions()
            args.forEach((arg, a) => {
                const argType = command.args[a]
                exprVisitor(root, arg, (parent, callExpr: jsep.CallExpression) => {
                    if (callExpr.type !== 'CallExpression')
                        return;
                    if (callExpr.callee.type !== "Identifier")
                        error(`all calls must be direct calls`)
                    const id = (<jsep.Identifier>callExpr.callee).name
                    const tef = testExpressionFunctions.find(r => id == r.id)
                    if (!tef)
                        error(
                            `${id} is not a registered test expression function.`
                        )
                    if (tef.context === "expression" || tef.context === "either") {
                        if (argType != "boolean")
                            error(`${id} expression function can only be used inside a boolean expression`)
                        // no nested calls
                        if (command.context === "expression" || command.context === "either") 
                            error(`cannot nest ${tef.id} underneath ${command.id}`)
                        // look under tef
                        exprVisitor(null, callExpr, (parent, ce: jsep.CallExpression) => {
                            if (ce.type !== 'CallExpression')
                                return;
                            if (ce.callee.type === "Identifier" && (<jsep.Identifier>ce.callee).name)
                                error(`cannot nest ${(<jsep.Identifier>ce.callee).name} underneath ${id}`)
                        })
                    }
                    const expected = tef.args.length
                    if (expected !== callExpr.arguments.length)
                        error(
                            `${callee} expects ${expected} arguments; got ${callExpr.arguments.length}`
                        )
                })
            })
        }
    }

    function finishTest(s: SpecSymbolResolver) {
        currentTest.registers = s.registers
        currentTest.events = s.events
        s.reset()
        info.tests.push(currentTest)
        currentTest = null
    }

    function error(msg: string) {
        if (!msg) msg = "syntax error"
        if (errors.some(e => e.line == lineNo && e.message == msg)) return
        errors.push({ file: filename, line: lineNo, message: msg })
    }
}
