/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import { 
    parseIntFloat, 
    getRegister, 
    exprVisitor
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
            const expected = testCommandFunctions[cmdIndex].args.length
            if (expected !== root.arguments.length)
                error(
                    `${callee} expects ${expected} arguments; got ${root.arguments.length}`
                )
            else {
                // type checking of arguments.
                processArguments();
                // check all calls in subexpressions
                processCalls()
            }
            currentTest.testCommands.push({ prompt: testPrompt, call: root })
            testPrompt = ""
        }

        function processArguments() {
            let eventSymTable: jdspec.PacketInfo[] = []
            root.arguments.forEach((arg, a) => {
                const argType = testCommandFunctions[cmdIndex].args[a]
                if (argType === "register" || argType === "event") {
                   if (arg.type !== "Identifier")
                        error(
                            `${callee} expects a ${argType} in argument position ${a + 1}`
                        )
                   else if (argType === "event" && a === 0) { 
                        let pkt = lookupEvent(arg)
                        if (pkt && eventSymTable.indexOf(pkt) === -1)
                        eventSymTable.push(pkt)
                   }
                } else if (argType === "events") {
                    if (arg.type != 'ArrayExpression')
                        error(`events function expects a list of service events`)
                    else {
                        (arg as jsep.ArrayExpression).elements.forEach(lookupEvent)
                    }
                } else if (argType === "number" || argType === "boolean") {
                    exprVisitor(root, arg, (p, c) => {
                        if (c.type === 'Identifier') {
                            lookupReplace(eventSymTable, p, c as jsep.Identifier)
                        } else if (c.type === 'ArrayExpression') {
                            error(
                                `array expression not allowed in this context`
                            )
                        } else if (c.type === 'MemberExpression') {
                            const member = c as jsep.MemberExpression;
                            // A member expression must be of form id1.id2
                            if (member.object.type !== 'Identifier' || member.property.type !== 'Identifier' || member.computed) {
                                error('property access must be of form id.property')
                            }
                        }
                    })
                } else {
                    error(`unexpected argument type (${argType}) in jdtestfuns.ts`)
                }
            })
        }

        function processCalls() { 
            const testExpressionFunctions = getTestExpressionFunctions()
            root.arguments.forEach((arg, a) => {
                const argType = testCommandFunctions[cmdIndex].args[a]
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
                        const rootFun = testCommandFunctions[cmdIndex]
                        if (rootFun.context === "expression" || rootFun.context === "either") 
                            error(`cannot nest ${tef.id} underneath ${rootFun.id}`)
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

        function lookupEvent(e: jsep.Expression) {
            const events = spec.packets?.filter(pkt => pkt.kind == "event")
            if (e.type !== 'Identifier') {
                error(`event identifier expected`)
            } else {
                const id = (e as jsep.Identifier).name
                const pkt = events.find(p => p.name === id)
                if (!pkt) {
                    error(`no event ${id} in specification`)
                } else {
                    if (currentTest.events.indexOf(id) < 0)
                        currentTest.events.push(id)
                    return pkt;
                }
            }
            return null;
        }
    }

    function lookupReplace(events: jdspec.PacketInfo[], parent: jsep.Expression, child: jsep.Identifier) {
        if (Array.isArray(parent)) {
            lookup(events, parent, child)
        } else {
            // don't process identifiers that are callees of CallExpression or RHS of MemberExpressions
            if (parent?.type === "CallExpression" && child === (<jsep.CallExpression>parent).callee ||
                parent.type === "MemberExpression" && child === (<jsep.MemberExpression>parent).property
            )
                return;
            lookup(events, parent, child)
        }

        function lookup(events: jdspec.PacketInfo[], parent: jsep.Expression, child: jsep.Identifier) {
            try {
                try {
                    let [root,fld] = toName()
                    const val = parseIntFloat(spec, fld ? `${root}.${fld}` : root)
                    const lit: jsep.Literal = {
                        type: "Literal",
                        value: val,
                        raw: val.toString(),
                    }
                } catch (e) {
                    let [root,fld] = toName()
                    let regField = getRegister(spec, root, fld)
                    // if (!fld && regField.pkt.fields.length > 0)
                    //    error(`register ${root} has fields, but no field specified`)
                    if (currentTest.registers.indexOf(root) < 0)
                        currentTest.registers.push(root)
                }
            } catch (e) {
                if (events.length > 0) {
                    let [root,fld] = toName()
                    let pkt = events.find(pkt => pkt.name === root)
                    if (!pkt)
                        error(`event ${root} not bound correctly`)
                    else if (!fld && pkt.fields.length > 0)
                        error(`event ${root} has fields, but no field specified`)
                    else if (fld && !pkt.fields.find(f => f.name === fld))
                        error(`Field ${fld} of event ${root} not found in specification`)
                } else {
                    error(e.message)
                }
            }
            function toName() {
                if (parent?.type !== 'MemberExpression')
                    return [child.name, ""];
                else {
                    const member = parent as jsep.MemberExpression
                    return [(member.object as jsep.Identifier).name,
                            (member.property as jsep.Identifier).name]
                }
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
