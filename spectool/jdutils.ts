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

// three-level of resolution
// 1. specification provided to constructor: there is only this specification
//    lookups are done against it directly (no roles)
//
// 2. undefined spec provided to constructor, role mapping provided instead
//    lookups are done against the role mnapping (multiple specs possible)
//
// 3. both above undefined, then we assume short names of services at top-level

export class SpecSymbolResolver {
    registers: string[];
    events: string[];
    
    constructor(private readonly spec: jdspec.ServiceSpec, 
                private readonly role2spec: (role: string) => jdspec.ServiceSpec,
                private readonly error: (m:string) => void) {
        this.reset()
    }

    reset() {
        this.registers = []
        this.events = []
    }

    // TODO: OR
    private check(e: jsep.Expression, type: string) {
        if (e.type !== type)
            this.error(`expected ${type}; got ${e.type}`)
    }

    private specResolve(e: jsep.Expression): [jdspec.ServiceSpec, jsep.Expression] {
        if (this.spec) {
            return [this.spec, e]
        }
        // otherwise, we must have a memberexpression at top-level
        // where the object references a role variable or specification shortName
        this.check(e,"MemberExpression");
        this.check((e as jsep.MemberExpression).object, "Identifier");
        if (this.role2spec) {
            const obj = (e as jsep.MemberExpression).object as jsep.Identifier
            if (!this.role2spec(obj.name)) {
                this.error(`no specification found for ${obj.name}`)
            }
            return [this.role2spec(obj.name), (e as jsep.MemberExpression).property]
        }
    }

    private destructAccessPath(e: jsep.Expression, expectIdentifier = false) {
        if (e.type === "Identifier") {
            return [(e as jsep.Identifier).name, ""]
        } else if (!expectIdentifier && e.type === "MemberExpression") {
            let object = (e as jsep.MemberExpression).object as jsep.Identifier
            let property = (e as jsep.MemberExpression).property as jsep.Identifier
            this.check(object, "Identifier")
            this.check(property, "Identifier");
            return [object.name, property.name]
        } else {
            if (!expectIdentifier)
               this.error(`expected Identifier or MemberExpression; got ${e.type}`)
            else 
                this.error(`expected Identifier; got ${e.type}`)
            return undefined
        }

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
                        this.lookupRegister(arg)
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

    private lookupEvent(e: jsep.Expression) {
        let [spec,rest] = this.specResolve(e)
        let [id, _] = this.destructAccessPath(rest,true)
        const events = spec.packets?.filter(pkt => pkt.kind == "event")
        const pkt = events.find(p => p.name === id)
        if (!pkt) {
            this.error(`no event ${id} in specification`)
            return undefined;
        } else {
            if (this.events.indexOf(id) < 0)
                this.events.push(id)
            return pkt;
        }
    }

    private lookupRegister(e: jsep.Expression)  {
        let [spec,rest] = this.specResolve(e)
        let [root, fld] = this.destructAccessPath(rest)
        let reg = getRegister(spec, root, fld)
        if (reg.pkt && (!reg.fld && !isBoolOrNumericFormat(reg.pkt.packFormat) ||
                        reg.fld && reg.fld.type && !isBoolOrNumericFormat(reg.fld.type)))
            this.error("only bool/numeric registers allowed in tests")
        // if (!fld && regField.pkt.fields.length > 0)
        //    error(`register ${root} has fields, but no field specified`)
        if (this.registers.indexOf(root) < 0)
            this.registers.push(root)
    }

    private lookupReplace(events: jdspec.PacketInfo[], parent: jsep.Expression, child: jsep.Identifier | jsep.MemberExpression) {
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
        let [spec,rest] = this.specResolve(child)
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
                this.lookupRegister(rest)
            }
        } catch (e) {
            if (events.length > 0) {
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
