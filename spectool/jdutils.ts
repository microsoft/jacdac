// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="jdspec.d.ts" />

export function isBoolOrNumericFormat(fmt: string) {
    return fmt === "bool" || /^[ui]\d+/i.test(fmt)
}

export function isMixinService(serviceClass: number) {
    return (serviceClass & 0x2000_0000) == 0x2000_0000
}

export function isRegister(pkt: jdspec.PacketInfo): boolean {
    return pkt && (pkt.kind == "const" || pkt.kind == "ro" || pkt.kind == "rw")
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

export function getRegister(spec: jdspec.ServiceSpec, root: string, fld = ""): RegField {
    const ret: RegField = { pkt: undefined, fld: undefined }
    ret.pkt = lookupRegister(spec, root)
    if (!ret.pkt) {
        throw new Error(
            `no register ${root} found in service ${spec.shortName}`
        )
    } else if (fld){
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

// static resolution of accesses to service specification
export class SpecSymbolResolver {
    registers: string[];
    events: string[];
    
    constructor(private readonly spec: jdspec.ServiceSpec, 
                private readonly error: (m:string) => void) {
        this.reset()
    }

    reset() {
        this.registers = []
        this.events = []
    }

    processArguments(command: jdtest.TestFunctionDescription, root: jsep.CallExpression) {
        const args = root.arguments
        const eventSymTable: jdspec.PacketInfo[] = []
        args.forEach((arg, a) => {
            let argType = command.args[a]
            if (typeof(argType) === "object")
                argType = command.args[a][0]
            if (argType === "register" || argType === "event") {
            if (arg.type !== "Identifier")
                    this.error(
                        `Expected a ${argType} in argument position ${a + 1}`
                    )
            else if (argType === "event" && a === 0) { 
                    let pkt = this.lookupEvent(arg)
                    if (pkt && eventSymTable.indexOf(pkt) === -1)
                    eventSymTable.push(pkt)
            } else if (argType === "register") {
                    try {
                        this.lookupRegister((arg as jsep.Identifier).name, "")
                    } catch (e) {
                        this.error(e.message)
                    }
            }
            } else if (argType === "events") {
                if (arg.type != 'ArrayExpression')
                    this.error(`events function expects a list of service events`)
                else {
                    (arg as jsep.ArrayExpression).elements.forEach((e) => this.lookupEvent(e))
                }
            } else if (argType === "number" || argType === "boolean") {
                exprVisitor(root, arg, (p, c) => {
                    if (p.type !== 'MemberExpression' && c.type === 'Identifier') {
                        this.lookupReplace(eventSymTable, p, c as jsep.Identifier)
                    } else if (c.type === 'ArrayExpression') {
                        this.error(
                            `array expression not allowed in this context`
                        )
                    } else if (c.type === 'MemberExpression') {
                        const member = c as jsep.MemberExpression;
                        // A member expression must be of form id1.id2
                        if (member.object.type !== 'Identifier' || member.property.type !== 'Identifier' || member.computed) {
                            this.error('property access must be of form id.property')
                        } else {
                            this.lookupReplace(eventSymTable, p, c as jsep.MemberExpression)
                        }
                    }
                })
            } else {
                this.error(`unexpected argument type (${argType})`)
            }
        })
    }

    lookupEvent(e: jsep.Expression) {
        const events = this.spec.packets?.filter(pkt => pkt.kind == "event")
        if (e.type !== 'Identifier') {
            this.error(`event identifier expected`)
        } else {
            const id = (e as jsep.Identifier).name
            const pkt = events.find(p => p.name === id)
            if (!pkt) {
                this.error(`no event ${id} in specification`)
            } else {
                if (this.events.indexOf(id) < 0)
                    this.events.push(id)
                return pkt;
            }
        }
        return null;
    }

    lookupRegister(root:string, fld:string)  {
        let reg = getRegister(this.spec, root, fld)
        if (reg.pkt && (!reg.fld && !isBoolOrNumericFormat(reg.pkt.packFormat) ||
                        reg.fld && reg.fld.type && !isBoolOrNumericFormat(reg.fld.type)))
            this.error("only bool/numeric registers allowed in tests")
        // if (!fld && regField.pkt.fields.length > 0)
        //    error(`register ${root} has fields, but no field specified`)
        if (this.registers.indexOf(root) < 0)
            this.registers.push(root)
    }

    lookupReplace(events: jdspec.PacketInfo[], parent: jsep.Expression, child: jsep.Identifier | jsep.MemberExpression) {
        if (Array.isArray(parent)) {
            let replace = this.lookup(events, parent, child)
            parent.forEach(i => {
                if (parent[i] === child)
                    parent[i] = replace
            })
        } else {
            // don't process identifiers that are callees of CallExpression
            if (parent?.type === "CallExpression" && child === (<jsep.CallExpression>parent).callee)
                return;
            let replace = this.lookup(events, parent, child)
            if (replace) {
                Object.keys(parent).forEach(k => {
                    if ((parent as any)[k] === child)
                        (parent as any)[k] = replace
                })
            }
        }
    }

    private lookup(events: jdspec.PacketInfo[], parent: jsep.Expression, child: jsep.Identifier | jsep.MemberExpression) {
        try {
            try {
                let [root,fld] = toName()
                const val = parseIntFloat(this.spec, fld ? `${root}.${fld}` : root)
                const lit: jsep.Literal = {
                    type: "Literal",
                    value: val,
                    raw: val.toString(),
                }
                return lit
            } catch (e) {
                let [root,fld] = toName()
                this.lookupRegister(root, fld)
            }
        } catch (e) {
            if (events.length > 0) {
                let [root,fld] = toName()
                let pkt = events.find(pkt => pkt.name === root)
                if (!pkt)
                    this.error(`event ${root} not bound correctly`)
                else if (!fld && pkt.fields.length > 0)
                    this.error(`event ${root} has fields, but no field specified`)
                else if (fld && !pkt.fields.find(f => f.name === fld))
                    this.error(`Field ${fld} of event ${root} not found in specification`)
            } else {
                this.error(e.message)
            }
        }
        function toName() {
            if (child.type !== 'MemberExpression')
                return [child.name, ""];
            else {
                return [(child.object as jsep.Identifier).name,
                        (child.property as jsep.Identifier).name]
            }
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exprVisitor(parent: any, current: any, structVisit: (par:jsep.Expression, curr:jsep.Expression) => void) {
    if (Array.isArray(current)) {
        (current as any[]).forEach(c => exprVisitor(current, c, structVisit))
    } else if (typeof current === "object") {
        if (parent && current)
            structVisit(parent, current)
        Object.keys(current).forEach((key: string) => {
            exprVisitor(current, current[key], structVisit)
        })
    }
}
