export function isBoolOrNumericFormat(fmt: string) {
    return fmt === "bool" || /^[ui]\d+/i.test(fmt)
}

export function isMixinService(serviceClass: number) {
    return (serviceClass & 0x2000_0000) == 0x2000_0000
}

export function isRegister(pkt: jdspec.PacketInfo): boolean {
    return pkt && (pkt.kind == "const" || pkt.kind == "ro" || pkt.kind == "rw")
}

export function isCommand(pkt: jdspec.PacketInfo) {
    return pkt.kind == "command"
}

export function packetsToRegisters(packets: jdspec.PacketInfo[]) {
    return packets.filter(pkt => !pkt.derived && isRegister(pkt))
}
export function lookupRegister(
    spec: jdspec.ServiceSpec,
    id: string
): jdspec.PacketInfo {
    return spec.packets.find(pkt => isRegister(pkt) && pkt.name === id)
}

export function lookupField(
    pkt: jdspec.PacketInfo,
    field: string
): jdspec.PacketMember {
    return pkt.fields.find(member => member.name === field)
}

export interface RegField {
    pkt: jdspec.PacketInfo
    fld: jdspec.PacketMember
}

export function getRegister(
    spec: jdspec.ServiceSpec,
    root: string,
    fld = ""
): RegField {
    const ret: RegField = { pkt: undefined, fld: undefined }
    ret.pkt = lookupRegister(spec, root)
    if (!ret.pkt) {
        throw new Error(
            `no register ${root} found in service ${spec.shortName}`
        )
    } else if (fld) {
        ret.fld = lookupField(ret.pkt, fld)
        if (!ret.fld)
            throw new Error(
                `no field ${fld} found in register ${root} of service ${spec.shortName}`
            )
    }
    return ret
}

export function parseIntFloat(
    spec: jdspec.ServiceSpec,
    w: string,
    allowFloat = false
): number {
    if (/^-?0x[a-f\d_]+$/i.test(w) || /^-?[\d_]+$/.test(w)) {
        const v = parseInt(w.replace(/_/g, "")) // allow for 0x3fff_ffff syntax
        if (isNaN(v)) throw new Error("can't parse int: " + w)
        return v
    }

    if (allowFloat && /^-?\d*(\.\d*)?(e(-?)\d+)?$/.test(w)) {
        const v = parseFloat(w)
        if (isNaN(v)) throw new Error("can't parse float: " + w)
        return v
    }

    const ww = w.split(/\./)
    if (ww.length != 2) {
        throw new Error(`expecting int or enum member here`)
    }
    const en = spec.enums[ww[0]]
    if (!en) {
        throw new Error(`${ww[0]} is not an enum type`)
    }
    // eslint-disable-next-line no-prototype-builtins
    if (!en.members.hasOwnProperty(ww[1]))
        throw new Error(`${ww[1]} is not a member of ${ww[0]}`)
    return en.members[ww[1]] || 0
}

export class SpecAwareMarkDownParser {

    constructor(
        private readonly resolver: SpecSymbolResolver,        
        private readonly supportedExpressions: jsep.ExpressionType[],
        private readonly parser: (
            line: string | jsep.Expression
        ) => jsep.Expression,
        private readonly error: (m: string) => void
        ) {
    }

    processLine(
        line: string,
        funs: jdtest.TestFunctionDescription[]
    ): [jdtest.TestFunctionDescription, jsep.CallExpression] {
        const root: jsep.CallExpression = <jsep.CallExpression>this.parser(line)
        if (!root || !root.type || root.type != "CallExpression") {
            this.error(
                `a command must be a call expression in JavaScript syntax`
            )
            return undefined
        }
        // check for unsupported expression types
        exprVisitor(null, root, (p, c) => {
            if (this.supportedExpressions.indexOf(c.type) < 0)
                this.error(
                    `Expression of type ${c.type} not currently supported`
                )
        })

        // first lookup in known functions
        const callee = (root.callee as jsep.Identifier)?.name
        const cmdIndex = funs.findIndex(r => callee == r.id)
        let theCommand: jdspec.PacketInfo = undefined
        if (cmdIndex < 0) {
            if (root.callee.type === "MemberExpression") {
                let [role, spec, rest] = this.resolver.specResolve(
                    root.callee as jsep.MemberExpression
                )
                let [command, _] = this.resolver.destructAccessPath(rest)
                if (!role) {
                    this.error(
                        `command does not conform to expected call expression`
                    )
                    return undefined
                } else {
                    // we have a spec, now look for command
                    const commands = spec.packets?.filter(
                        pkt => pkt.kind === "command"
                    )
                    theCommand = commands.find(
                        c => c?.identifierName === command
                    )
                    if (!theCommand) {
                        this.error(
                            `cannot find command named ${command} in spec ${spec}`
                        )
                    } else
                        this.processCommandFunction(root, theCommand)
                }
            } else {
                if (callee)
                    this.error(`${callee} is not a registered function.`)
                else
                    this.error(
                        `command does not conform to expected call expression`
                    )
                return undefined
            }
        } else 
            this.processTestFunction(funs, root, cmdIndex)
    }

    private processCommandFunction(root: jsep.CallExpression, command: jdspec.PacketInfo) {

    }

    private processTestFunction(
        funs: jdtest.TestFunctionDescription[],
        root: jsep.CallExpression,
        cmdIndex: number
    ) {
        const callee = (root.callee as jsep.Identifier)?.name
        // check arguments
        const command = funs[cmdIndex]
        const minArgs = argsRequiredOptional(command.args).length
        const maxArgs = command.args.length
        if (root.arguments.length < minArgs) {
            this.error(
                `${callee} expects at least ${minArgs} arguments; got ${root.arguments.length}`
            )
            return undefined
        } else if (root.arguments.length > maxArgs) {
            this.error(
                `${callee} expects at most ${maxArgs} arguments; got ${root.arguments.length}`
            )
            return undefined
        }
        // deal with optional arguments
        let newExpressions: jsep.Expression[] = []
        for (let i = root.arguments.length; i < command.args.length; i++) {
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
        this.processArguments(command, root)
        return [command, root]
        function argsRequiredOptional(args: any[], optional: boolean = false) {
            return args.filter(
                a =>
                    (!optional && typeof a === "string") ||
                    (optional && typeof a === "object")
            )
        }
    }

    private processArguments(
        command: jdtest.TestFunctionDescription,
        root: jsep.CallExpression
    ) {
        const args = root.arguments
        const eventSymTable: jdspec.PacketInfo[] = []
        args.forEach((arg, a) => {
            let argType = command.args[a]

            if (typeof argType === "object") argType = command.args[a][0]

            if (
                argType === "register" ||
                argType === "event" ||
                argType == "Identifier"
            ) {
                if (argType == "Identifier") {
                    this.resolver.check(arg, "Identifier")
                } else if (argType === "event" && a === 0) {
                    let pkt = this.resolver.lookupEvent(arg)
                    if (pkt && eventSymTable.indexOf(pkt) === -1)
                        eventSymTable.push(pkt)
                } else if (argType === "register") {
                    try {
                        this.resolver.lookupRegister(arg)
                    } catch (e) {
                        this.error(e.message)
                    }
                }
            } else if (argType === "events") {
                if (arg.type != "ArrayExpression")
                    this.error(
                        `events function expects a list of service events`
                    )
                else {
                    ;(arg as jsep.ArrayExpression).elements.forEach(e =>
                        this.resolver.lookupEvent(e)
                    )
                }
            } else if (argType === "number" || argType === "boolean") {
                exprVisitor(root, arg, (p, c) => {
                    // TODO
                    if (
                        p.type !== "MemberExpression" &&
                        c.type === "Identifier"
                    ) {
                        this.resolver.lookupReplace(
                            eventSymTable,
                            p,
                            c as jsep.Identifier
                        )
                    } else if (c.type === "ArrayExpression") {
                        this.error(
                            `array expression not allowed in this context`
                        )
                    } else if (c.type === "MemberExpression") {
                        const member = c as jsep.MemberExpression
                        // A member expression must be of form <Identifier>.<memberExpression|Identifier>
                        if (
                            member.object.type !== "Identifier" ||
                            member.computed
                        ) {
                            this.error(
                                "property access must be of form id.property"
                            )
                        } else {
                            this.resolver.lookupReplace(
                                eventSymTable,
                                p,
                                c as jsep.MemberExpression
                            )
                        }
                    }
                })
            } else {
                this.error(`unexpected argument type (${argType})`)
            }
        })
    }

}

export class SpecSymbolResolver {
    registers: string[]
    events: string[]

    constructor(
        private readonly spec: jdspec.ServiceSpec,
        private readonly role2spec: (role: string) => jdspec.ServiceSpec,
        private readonly error: (m: string) => void
    ) {
        this.reset()
    }

    reset() {
        this.registers = []
        this.events = []
    }

    // TODO: OR
    public check(e: jsep.Expression, type: string) {
        if (e.type !== type) this.error(`expected ${type}; got ${e.type}`)
    }

    public specResolve(
        e: jsep.Expression
    ): [string, jdspec.ServiceSpec, jsep.Expression] {
        if (this.spec) {
            return [this.spec.shortName, this.spec, e]
        }
        // otherwise, we must have a memberexpression at top-level
        // where the object references a role variable or specification shortName
        this.check(e, "MemberExpression")
        this.check((e as jsep.MemberExpression).object, "Identifier")
        if (this.role2spec) {
            const obj = (e as jsep.MemberExpression).object as jsep.Identifier
            if (!this.role2spec(obj.name)) {
                this.error(`no specification found for ${obj.name}`)
            }
            return [
                obj.name,
                this.role2spec(obj.name),
                (e as jsep.MemberExpression).property,
            ]
        }
    }

    public destructAccessPath(e: jsep.Expression, expectIdentifier = false) {
        if (e.type === "Identifier") {
            return [(e as jsep.Identifier).name, ""]
        } else if (!expectIdentifier && e.type === "MemberExpression") {
            let object = (e as jsep.MemberExpression).object as jsep.Identifier
            let property = (e as jsep.MemberExpression)
                .property as jsep.Identifier
            this.check(object, "Identifier")
            this.check(property, "Identifier")
            return [object.name, property.name]
        } else {
            if (!expectIdentifier)
                this.error(
                    `expected Identifier or MemberExpression; got ${e.type}`
                )
            else this.error(`expected Identifier; got ${e.type}`)
            return undefined
        }
    }

    public lookupEvent(e: jsep.Expression) {
        let [role, spec, rest] = this.specResolve(e)
        let [id, _] = this.destructAccessPath(rest, true)
        const events = spec.packets?.filter(pkt => pkt.kind == "event")
        const pkt = events.find(p => p.name === id)
        if (!pkt) {
            this.error(`no event ${id} in specification`)
            return undefined
        } else {
            let ev = `${role}.${id}`
            if (this.events.indexOf(ev) < 0) this.events.push(ev)
            return pkt
        }
    }

    public lookupRegister(e: jsep.Expression) {
        let [role, spec, rest] = this.specResolve(e)
        let [root, fld] = this.destructAccessPath(rest)
        this.lookupRegisterRaw(spec, root, fld)
        let reg = `${role}.${root}`
        if (this.registers.indexOf(reg) < 0) this.registers.push(reg)
    }

    private lookupRegisterRaw(
        spec: jdspec.ServiceSpec,
        root: string,
        fld: string
    ) {
        let reg = getRegister(spec, root, fld)
        if (
            reg.pkt &&
            ((!reg.fld && !isBoolOrNumericFormat(reg.pkt.packFormat)) ||
                (reg.fld &&
                    reg.fld.type &&
                    !isBoolOrNumericFormat(reg.fld.type)))
        )
            this.error("only bool/numeric registers allowed")
        // if (!fld && regField.pkt.fields.length > 0)
        //    error(`register ${root} has fields, but no field specified`)
    }

    public lookupReplace(
        events: jdspec.PacketInfo[],
        parent: jsep.Expression,
        child: jsep.Identifier | jsep.MemberExpression
    ) {
        if (Array.isArray(parent)) {
            let replace = this.lookup(events, parent, child)
            parent.forEach(i => {
                if (parent[i] === child) parent[i] = replace
            })
        } else {
            // don't process identifiers that are callees of CallExpression
            if (
                parent?.type === "CallExpression" &&
                child === (<jsep.CallExpression>parent).callee
            )
                return
            let replace = this.lookup(events, parent, child)
            if (replace) {
                Object.keys(parent).forEach(k => {
                    if ((parent as any)[k] === child)
                        (parent as any)[k] = replace
                })
            }
        }
    }

    private lookup(
        events: jdspec.PacketInfo[],
        parent: jsep.Expression,
        child: jsep.Identifier | jsep.MemberExpression
    ) {
        let [role, spec, rest] = this.specResolve(child)
        let [root, fld] = this.destructAccessPath(rest)
        try {
            try {
                const val = parseIntFloat(spec, fld ? `${root}.${fld}` : root)
                const lit: jsep.Literal = {
                    type: "Literal",
                    value: val,
                    raw: val.toString(),
                }
                return lit
            } catch (e) {
                this.lookupRegisterRaw(spec, root, fld)
                let reg = `${role}.${root}`
                if (this.registers.indexOf(reg) < 0) this.registers.push(reg)
            }
        } catch (e) {
            if (events.length > 0) {
                let pkt = events.find(pkt => pkt.name === root)
                if (!pkt) this.error(`event ${root} not bound correctly`)
                else if (!fld && pkt.fields.length > 0)
                    this.error(
                        `event ${root} has fields, but no field specified`
                    )
                else if (fld && !pkt.fields.find(f => f.name === fld))
                    this.error(
                        `Field ${fld} of event ${root} not found in specification`
                    )
            } else {
                this.error(e.message)
            }
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exprVisitor(
    parent: any,
    current: any,
    structVisit: (par: jsep.Expression, curr: jsep.Expression) => void
) {
    if (Array.isArray(current)) {
        ;(current as any[]).forEach(c => exprVisitor(current, c, structVisit))
    } else if (typeof current === "object") {
        if (parent && current) structVisit(parent, current)
        Object.keys(current).forEach((key: string) => {
            exprVisitor(current, current[key], structVisit)
        })
    }
}
