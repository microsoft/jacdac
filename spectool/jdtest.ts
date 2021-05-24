import { 
    exprVisitor,
    SpecSymbolResolver,
    SpecAwareMarkDownParser
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
    const symbolResolver = new SpecSymbolResolver(spec, undefined, (e) => error(e))
    const parser = new SpecAwareMarkDownParser(symbolResolver,  supportedExpressions, jsep, (e) => error(e))

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
 
        const ret = parser.processLine(expanded, getTestCommandFunctions());

        if (ret) {
            const [command, root] = ret
            // check all calls in subexpressions
            processCalls(command, root)
            currentTest.testCommands.push({ prompt: testPrompt, call: root })
            testPrompt = ""
        }

        // this checking is specific to test functions (for now)
        function processCalls(command: jdtest.TestFunctionDescription, root: jsep.CallExpression) {
            const args = root.arguments
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
                            `Expected ${expected} arguments; got ${callExpr.arguments.length}`
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
