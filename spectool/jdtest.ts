/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import { 
    parseIntFloat, 
    getRegister, 
    exprVisitor
} from "./jdutils"
import { testCommandFunctions, testExpressionFunctions } from "./jdtestfuns"
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
            exprVisitor(null, root, (p, c) => {
                if (supportedExpressions.indexOf(c.type) < 0)
                    error(`Expression of type ${c.type} not currently supported`)
            })
            // check arguments
            const expected = testCommandFunctions[index].args.length
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
                const argType = testCommandFunctions[index].args[a]
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
                    exprVisitor(null, root, (p, c) => {
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
                    error(`unexpected argument type (${argType})in jdtestfuns.ts`)
                }
            })
        }

        function processCalls() {
            exprVisitor(null, root, (parent, callExpr: jsep.CallExpression) => {
                if (callExpr.type !== 'CallExpression')
                    return;
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
                    exprVisitor(null, callExpr, (parent, ce: jsep.CallExpression) => {
                        if (ce.type !== 'CallExpression')
                            return;
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

    // TODO: MemberExpression
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
                    let [root,fld] = toName()
                    getRegister(spec, `${root}.${fld}`)
                    if (currentTest.registers.indexOf(root) < 0)
                        currentTest.registers.push(root)
                }
            } catch (e) {
                let [root,fld] = toName()
                let pkt = events.find(pkt => pkt.name === root)
                if (!pkt)
                    error(`${root} not found in specification`)
                else {
                    if (fld && !pkt.fields.find(f => f.name === fld))
                        error(`${root}.${fld} not found in specification`)
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
