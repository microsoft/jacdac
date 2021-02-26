/// <reference path="jdspec.d.ts" />
/// <reference path="jdtest.d.ts" />

import { parseIntFloat, getRegister, packetsToRegisters } from "./jdutils";
import { camelize, capitalize } from "./jdspec"

const exprTokens = ["(", ")", "+", "-", "<", ">", "<=", ">=", "==", "/", 
"*", "&&", "||", ",", "[", "]", "%", ">>", "<<", "&", "|",
"^", "**", "~", ">>>", "!", "true", "false"
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
                case "let":
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
            kind: cmd,
            expr: []
        }
        if (!currentTest) {
            if (!testHeading)
                error("every test must have a description (via ##)")
            currentTest = {
                description: testHeading,
                letVariables: [],
                commands: []
            }
            testHeading = "";
        }
        currentTest.commands.push(command);
        switch (cmd) {
            case "let":
                command.lhs = words[1];
                if (!/^[a-zA-Z]+\w*$/.exec(command.lhs))
                    error(command.lhs + " is not a valid identifier");
                if (currentTest.letVariables.indexOf(command.lhs) >= 0)
                    error("variable "+command.lhs+" already declared in this test.")
                try {
                    let inSpec = getReg(words[1]);
                    if (inSpec.id)
                        error("variable "+command.lhs+" already declared in specification")
                } catch (e) { 
                    // nothing here
                }
                currentTest.letVariables.push(command.lhs)
                if (words[2] != "=")
                    error("missing = sign (let <var> = <expr>")
                command.expr = processExpression(words.slice(3));
                break;
            case "say": 
            case "ask":
                let prompt = words.slice(1).join(" ");
                if (/^".*"$/.exec(prompt))
                    command.expr.push({js: prompt});
                else
                    error("say/ask must be followed by a string constant");
                break
            case "changes":
            case "observe": {
                try {
                    command.lhs = getReg(words[1]).id;
                    if (cmd == "observe") {
                        command.expr = processExpression(words.slice(2));
                    }
                } catch (e) {
                    error(e.message)
                }
                break
            }
            case "check":
                command.expr = processExpression(words.slice(1));
                break
        }
    }

    function processExpression(tokens: string[]): jdtest.ServiceTestToken[] {
        let res: jdtest.ServiceTestToken[] = []
        tokens.forEach(t => {
            if (exprTokens.indexOf(t) == -1) {
                try {
                    res.push(getValue(t));
                } catch (e) {
                    if (currentTest.letVariables.indexOf(t) >= 0)
                        res.push({id: t})
                    else
                        error(e.message)
                }
            } else {
                res.push({js: t})
            }
        })
        return res;
    }

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

function gatherLocals(serviceTest: jdtest.ServiceTest) {
    let locals: string[] = []
    serviceTest.tests.forEach(t => {
        t.letVariables.forEach(l => {
            if (locals.indexOf(l) < 0)
                locals.push(l);
        })
    })
    return locals;
}

// create a file to check syntax of expressions, if this file passes tsc
// then toTestMonitorClient code will be fine

export function testSyntax(spec: jdspec.ServiceSpec, serviceTest: jdtest.ServiceTest) {
    const { shortId, name, camelName, packets } = spec;
    const Reading = 0x101;

    const registers = packetsToRegisters(packets);
    const regs = registers.filter(r => !!r);
    const locals = gatherLocals(serviceTest);

    return `namespace test_syntax {
${regs.map(reg => `
        let ${reg.name} = 0;`).join("")}            
${locals.map(l => `
        let ${l} = 0;`).join("")}      
${serviceTest.tests.map(t => t.commands.map(c => `
        ${c.expr.map(exprToString).join(" ")};
`).join("")).join("")}
    }`;
    
    function exprToString(token: jdtest.ServiceTestToken) {
        return (token.js ? token.js : "") + (token?.const ? token.const.toString() : "") + (token.id ? token.id : "");
    }
}

// create a test monitor as a helper for manual tests

// use reg.subscribe(CHANGE, () =>. ....) to listen for changes
// await regchange(reg, v => v > 5), but need a hook for cancelling

export function toTestMonitor(spec: jdspec.ServiceSpec, serviceTest: jdtest.ServiceTest) {
    const { camelName, packets } = spec;

    const registers = packetsToRegisters(packets);
    const regs = registers.filter(r => !!r);
    const locals = gatherLocals(serviceTest);
    const capName = capitalize(camelName);
    const className = `${capName}TestClient`

    return `
    import { JDService } from "../../../src/jdom/service"
    import { JDServiceClient } from "../../../src/jdom/serviceclient"
    import { JDRegister } from "../../../src/jdom/register"
    import { useRegisterUnpackedValue } from "../../../docs/src/jacdac/useRegisterValue";
    import { ${capName}Reg } from "../specconstants";

    export class ${className} extends JDServiceClient {
${regs.map(reg => `
        private ${camelize(reg.name)}Reg: JDRegister
        private ${camelize(reg.name)}: number;
        `).join("")}            
${locals.map(l => `
        private ${l}: number = 0;`).join("")}  
    
        constructor(service: JDService) {
            super(service);
${regs.map(reg => `
            this.${camelize(reg.name)}Reg = service.register(${capName}Reg.${capitalize(camelize(reg.name))});
            `).join("")}
        }
${serviceTest.tests.map((t,t_index) => t.commands.map((c,c_index) => `
        public test${t_index}_cmd${c_index}() {
            let expr = ${c.expr.map(exprToString).join(" ")};
            ${(c.kind === "let") ? `this.${c.lhs} = expr;` : `return expr`}
        };
        `
        ).join("")).join("")}
    }`;

    function exprToString(token: jdtest.ServiceTestToken) {
        return (token.js ? token.js : "") + (token?.const ? token.const.toString() : "") + (token.id ? `this.${camelize(token.id)}` : "");
    }
}
