// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="jdspec.d.ts" />

export function isRegister(pkt: jdspec.PacketInfo): boolean {
    return pkt && (pkt.kind == "const" || pkt.kind == "ro" || pkt.kind == "rw");
}

export function packetsToRegisters(packets: jdspec.PacketInfo[]) {
    return packets
        .filter(pkt => !pkt.derived && isRegister(pkt))
}
export function lookupRegister(
    spec: jdspec.ServiceSpec,
    id: string
): jdspec.PacketInfo {
    return spec.packets.find((pkt) => isRegister(pkt) && pkt.name === id);
}

export function lookupField(
    pkt: jdspec.PacketInfo,
    field: string
): jdspec.PacketMember {
    return pkt.fields.find((member) => member.name === field);
}

export interface RegField {
    pkt: jdspec.PacketInfo;
    fld?: jdspec.PacketMember;
}


export function getRegister(spec: jdspec.ServiceSpec, w: string): RegField {
    const ret: RegField = { pkt: null };
    if (/^\w+$/.test(w)) {
        ret.pkt = lookupRegister(spec, w);
        if (!ret.pkt) {
            throw new Error(
                `no register ${w} found in service ${spec.shortName}`
            );
        }
    } else if (/^\w+\.\w+$/.test(w)) {
        const [reg, field] = /^(\w+)\.(\w+)$/.exec(w);
        ret.pkt = lookupRegister(spec, reg);
        if (!ret.pkt) {
            throw new Error(
                `no register ${reg} found in service ${spec.shortName}`
            );
        } else {
            ret.fld = lookupField(ret.pkt, field);
            if (!ret.fld)
                throw new Error(
                    `no field ${field} found in register ${reg} of service ${spec.shortName}`
                );
        }
    }
    return ret;
}

export function parseIntFloat(
    spec: jdspec.ServiceSpec,
    w: string,
    allowFloat = false
): number {
    if (/^-?0x[a-f\d_]+$/i.test(w) || /^-?[\d_]+$/.test(w)) {
        const v = parseInt(w.replace(/_/g, "")); // allow for 0x3fff_ffff syntax
        if (isNaN(v)) throw new Error("can't parse int: " + w);
        return v;
    }

    if (allowFloat && /^-?\d*(\.\d*)?(e(-?)\d+)?$/.test(w)) {
        const v = parseFloat(w);
        if (isNaN(v)) throw new Error("can't parse float: " + w);
        return v;
    }

    const ww = w.split(/\./);
    if (ww.length != 2) {
        throw new Error(`expecting int or enum member here`);
    }
    const en = spec.enums[ww[0]];
    if (!en) {
        throw new Error(`${ww[0]} is not an enum type`);
    }
    // eslint-disable-next-line no-prototype-builtins
    if (!en.members.hasOwnProperty(ww[1]))
        throw new Error(`${ww[1]} is not a member of ${ww[0]}`);
    return en.members[ww[1]] || 0;
}

