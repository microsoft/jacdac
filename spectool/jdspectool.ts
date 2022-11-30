/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />

import {
    camelize,
    capitalize,
    converters,
    dashify,
    humanify,
    normalizeDeviceSpecification,
    packInfo,
    parseServiceSpecificationMarkdownToJSON,
    snakify,
    TYPESCRIPT_STATIC_NAMESPACE,
    isNumericType,
} from "./jdspec"
import { packetsToRegisters } from "./jdutils"

// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
declare var process: any
// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
declare var require: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fs: any

const serviceBuiltins = [
    "bootloader",
    "logger",
    "control",
    "infrastructure",
    "proxy",
    "uniquebrain",
    "rolemanager",
    "bridge",
    "dashboard",
    "devicescriptcloud",
    "cloudadapter",
    "devicescriptcondition",
]

function values<T>(o: jdspec.SMap<T>): T[] {
    const r: T[] = []
    for (const k of Object.keys(o)) r.push(o[k])
    return r
}

function toPxtJson(spec: jdspec.ServiceSpec) {
    const { camelName, notes } = spec
    return JSON.stringify(
        {
            name: `jacdac-${dashify(camelName)}`,
            version: "0.0.0",
            description: notes["short"],
            files: ["constants.ts", "client.g.ts"],
            testFiles: ["test.ts"],
            supportedTargets: ["microbit", "arcade", "maker"],
            dependencies: {
                core: "*",
                jacdac: "github:microsoft/pxt-jacdac",
            },
        },
        null,
        4
    )
}

function pick(...values: number[]) {
    return values?.find(x => x !== undefined)
}

// add as needed
const reservedJsWords: { [index: string]: boolean } = {
    switch: true,
}

function tsify(name: string) {
    if (reservedJsWords[name]) {
        return name + "_"
    }
    return name
}

const Reading = 0x101
const Intensity = 0x1
const Value = 0x2
function isEnabledReg(reg: jdspec.PacketInfo) {
    return (
        reg.identifier === Intensity &&
        reg.name === "enabled" &&
        reg.fields.length === 1 &&
        reg.fields[0].type === "bool"
    )
}

function toMakeCodeClient(spec: jdspec.ServiceSpec) {
    const { shortId, name, camelName, packets, tags } = spec

    const nsc = TYPESCRIPT_STATIC_NAMESPACE
    const registers = packetsToRegisters(packets)
    let baseType = "Client"
    let isSimpleSensorClient = false
    const ctorArgs = [`${nsc}.SRV_${snakify(camelName).toUpperCase()}`, `role`]
    const regs = registers.filter(r => !!r).filter(r => !r.restricted)
    const reading = regs.find(reg => reg.identifier === Reading)
    const enabledReg = regs.find(isEnabledReg)
    const events = packets.filter(pkt => !pkt.derived && pkt.kind === "event")
    const ninstances = tags?.indexOf("input") > -1 ? 2 : 1
    // TODO: pipes support
    const commands = packets.filter(
        pkt =>
            !pkt.derived &&
            !pkt.restricted &&
            pkt.kind === "command" &&
            pkt.fields.every(f => f.type !== "pipe")
    )

    // use sensor base class if reading present
    if (reading) {
        isSimpleSensorClient =
            reading.fields.length === 1 && isNumericType(reading.fields[0])
        baseType = isSimpleSensorClient ? `SimpleSensorClient` : `SensorClient`
        ctorArgs.push(
            `jacdac.${capitalize(spec.camelName)}RegPack.${capitalize(
                camelize(reading.name)
            )}`
        )
    }
    const { unit: readingUnit } = reading
        ? genFieldInfo(reading, reading.fields[0])
        : { unit: undefined }
    const readingUnitString = readingUnit ? ` (${readingUnit})` : ""

    const className = `${capitalize(camelName)}Client`
    const group = capitalize(spec.group || name)

    const registerFlags = (pkt: jdspec.PacketInfo) => {
        const flags: string[] = []
        if (pkt.optional) flags.push("Optional")
        if (pkt.kind === "const") flags.push("Const")
        return flags.length == 0
            ? ""
            : `, ${flags
                  .map(n => `jacdac.RegisterClientFlags.${n}`)
                  .join(" | ")}`
    }

    const toMetaComments = (...lines: string[]) =>
        lines
            .filter(l => !!l)
            .map(l => "        //% " + l)
            .join("\n")
    let weight = 100

    const eventEnumName = events.length
        ? `${nsc}.${capitalize(spec.camelName)}Event`
        : undefined

    return `namespace modules {
    /**
     * ${(spec.notes["short"] || "").split("\n").join("\n     * ")}
     **/
    //% fixedInstances blockGap=8
    export class ${className} extends jacdac.${baseType} {
${regs
    .filter(reg => reg.identifier !== Reading && !reg.client)
    .map(
        reg => `
        private readonly _${camelize(reg.name)} : jacdac.RegisterClient<[${
            packInfo(spec, reg, { isStatic: true, useBooleans: true }).types
        }]>;`
    )
    .join("")}            

        constructor(role: string) {
            super(${ctorArgs.join(", ")})
${regs
    .filter(reg => reg.identifier !== Reading && !reg.client)
    .map(
        reg => `
            this._${camelize(reg.name)} = this.addRegister<[${
            packInfo(spec, reg, { isStatic: true, useBooleans: true }).types
        }]>(${nsc}.${capitalize(spec.camelName)}Reg.${capitalize(
            camelize(reg.name)
        )}, jacdac.${capitalize(spec.camelName)}RegPack.${capitalize(
            camelize(reg.name)
        )}${registerFlags(reg)})`
    )
    .join("")}            
        }
    
${regs
    .map(reg => {
        const { types } = packInfo(spec, reg, {
            isStatic: true,
            useBooleans: true,
        })
        const { fields, client } = reg
        const reading = reg.identifier === Reading
        const value = reg.identifier === Value
        const enabled = isEnabledReg(reg)
        const fieldName = `this._${reading ? "reading" : camelize(reg.name)}`
        const hasBlocks =
            !reg.lowLevel &&
            (reg.identifier == Reading ||
                reg.identifier == Intensity ||
                reg.identifier == Value)

        return fields
            .map((field, fieldi) => {
                const {
                    name,
                    min,
                    max,
                    defl,
                    valueScaler,
                    valueUnscaler,
                    unit,
                } = genFieldInfo(reg, field)
                const unitString = unit ? ` (${unit})` : ""
                return `
        /**
        * ${(reg.description || "").split("\n").join("\n        * ")}
        */
${toMetaComments(
    "callInDebugger",
    `group="${group}"`,
    hasBlocks && `block="%${shortId} ${humanify(name)}${unitString}"`,
    hasBlocks && `blockId=jacdac_${shortId}_${reg.name}_${field.name}_get`,
    `weight=${weight--}`
)}
        ${camelize(name)}(): ${types[fieldi]} {${
                    client
                        ? `
            // TODO: implement client register
            throw "client register not implement";`
                        : reading && isSimpleSensorClient
                        ? `
            return ${valueScaler(`this.reading()`)};
        `
                        : `${
                              reading
                                  ? `
            this.setStreaming(true);`
                                  : `
            this.start();`
                          }            
            const values = ${fieldName}.pauseUntilValues() as any[];
            return ${valueScaler(`values[${fieldi}]`)};`
                }
        }
${
    reg.kind === "rw"
        ? `
        /**
        * ${(reg.description || "").split("\n").join("\n        * ")}
        */
${toMetaComments(
    `group="${group}"`,
    hasBlocks && `blockId=jacdac_${shortId}_${reg.name}_${field.name}_set`,
    hasBlocks &&
        `block="${
            enabled
                ? `set %${shortId} %value=toggleOnOff`
                : `set %${shortId} ${humanify(name)} to %value${unitString}`
        }"`,
    `weight=${weight--}`,
    min !== undefined && `value.min=${min}`,
    max !== undefined && `value.max=${max}`,
    defl !== undefined && `value.defl=${defl}`
)}
        set${capitalize(camelize(name))}(value: ${types[fieldi]}) {
            this.start();${
                enabledReg && value
                    ? `
            this.setEnabled(true);`
                    : ""
            }
            const values = ${fieldName}.values as any[];
            values[${fieldi}] = ${valueUnscaler("value")};
            ${fieldName}.values = values as [${types}];
        }
`
        : ""
}`
            })
            .join("")
    })
    .join("")}${
        isSimpleSensorClient
            ? `
        /**
         * Run code when the ${humanify(
             reading.name
         )} changes by the given threshold value.
        */
${toMetaComments(
    `group="${group}"`,
    `blockId=jacdac_${shortId}_on_${reading.name}_change`,
    `block="on %${shortId} ${humanify(
        reading.name
    )} changed by %threshold${readingUnitString}"`,
    `weight=${weight--}`,
    `threshold.min=0`,
    genFieldInfo(reading, reading.fields[0]).max !== undefined &&
        `threshold.max=${genFieldInfo(reading, reading.fields[0]).max}`,
    `threshold.defl=${
        reading.fields[0].unit === "/"
            ? "5"
            : /[ui]0\./.test(reading.fields[0].type)
            ? "0.1"
            : "1"
    }`
)}
        on${capitalize(
            camelize(reading.name)
        )}ChangedBy(threshold: number, handler: () => void): void {
            this.onReadingChangedBy(${genFieldInfo(
                reading,
                reading.fields[0]
            ).valueUnscaler("threshold")}, handler);
        }
`
            : ""
    }${
        eventEnumName
            ? `
        /**
         * Register code to run when an event is raised
         */
${toMetaComments(
    `group="${group}"`,
    `blockId=jacdac_on_${spec.shortId}_event`,
    `block="on %${shortId} %event"`,
    `weight=${weight--}`
)}
        onEvent(ev: ${eventEnumName}, handler: () => void): void {
            this.registerEvent(ev, handler);
        }
`
            : ""
    }${events
        .map(event => {
            return `
        /**
         * ${(event.description || "").split("\n").join("\n        * ")}
         */
${toMetaComments(`group="${group}"`, `weight=${weight--}`)}
        on${capitalize(camelize(event.name))}(handler: () => void): void {
            this.registerEvent(${eventEnumName}.${capitalize(
                camelize(event.name)
            )}, handler);
        }`
        })
        .join("")}
${commands
    .map(command => {
        const { name, client } = command
        const { types } = packInfo(spec, command, {
            isStatic: true,
            useBooleans: true,
        })
        const { fields } = command
        const fnames = fields.map(f => camelize(f.name))
        const cmd = `${nsc}.${capitalize(spec.camelName)}Cmd.${capitalize(
            camelize(command.name)
        )}`
        const fmt = command.packFormat
        return `
        /**
        * ${(command.description || "").split("\n").join("\n        * ")}
        */
${toMetaComments(
    `group="${group}"`,
    `blockId=jacdac_${shortId}_${command.name}_cmd`,
    `block="%${shortId} ${humanify(name)}${
        !fnames?.length
            ? ""
            : fnames?.length == 1
            ? ` $${fnames[0]}`
            : " " + fnames.map(fn => `|${fn} $${fn}`).join(" ")
    }"`,
    `weight=${weight--}`
)}
        ${camelize(name)}(${fnames
            .map((fname, fieldi) => `${fname}: ${types[fieldi]}`)
            .join(", ")}): void {
            ${
                client
                    ? `// TODO: implement client command
            throw "client command not implemented"`
                    : `this.start();
            this.sendCommand(jacdac.JDPacket.${
                types.length === 0
                    ? `onlyHeader(${cmd})`
                    : `jdpacked(${cmd}, jacdac.${capitalize(
                          spec.camelName
                      )}CmdPack.${capitalize(camelize(name))}, [${fnames.join(
                          ", "
                      )}])`
            })`
            }
        }
`
    })
    .join("")}    
    }
    ${Array(ninstances)
        .fill(0)
        .map(
            (_, i) => `
    //% fixedInstance whenUsed weight=${
                1 + i
            } block="${humanify(spec.camelName).toLocaleLowerCase()}${i + 1}"
    export const ${tsify(spec.camelName)}${
                i + 1
            } = new ${className}("${humanify(spec.camelName)}${i + 1}");`
        ).join("\n")}
}`
}

function toPythonClient(
    spec: jdspec.ServiceSpec,
    options: { baseClient?: boolean } = {}
) {
    const { camelName, packets } = spec
    const { baseClient } = options

    const registers = packetsToRegisters(packets)
    const regs = registers
        .filter(r => !!r)
        .filter(r => !r.restricted && !r.client)
        .filter(r => !r.fields.some(f => f.startRepeats))
    const reading = regs.find(reg => reg.identifier === Reading)
    const { pyTypes: readingTypes } = reading
        ? packInfo(spec, reading, {
              isStatic: true,
              useBooleans: true,
          })
        : { pyTypes: undefined }
    const readingType = readingTypes
        ? readingTypes.length == 1
            ? readingTypes[0]
            : `Tuple[${readingTypes.join(", ")}]`
        : undefined
    const missingReadingField = reading
        ? `missing_${snakify(reading.name)}_value`
        : undefined
    const baseType = reading ? "SensorClient" : "Client"
    const ctorArgs = [
        `bus`,
        `JD_SERVICE_CLASS_${snakify(camelName).toUpperCase()}`,
        `JD_${snakify(camelName).toUpperCase()}_PACK_FORMATS`,
        `role`,
        reading?.preferredInterval &&
            `preferred_interval = ${reading.preferredInterval}`,
    ].filter(a => !!a)
    const enabledReg = regs.find(isEnabledReg)
    const events = packets.filter(pkt => !pkt.derived && pkt.kind === "event")
    // TODO: pipes support
    const commands = packets.filter(
        pkt =>
            !pkt.derived &&
            !pkt.restricted &&
            pkt.kind === "command" &&
            pkt.fields.every(f => f.type !== "pipe") &&
            !pkt.fields.some(f => f.startRepeats)
    )

    const className = `${capitalize(camelName)}Client${
        baseClient ? "Base" : ""
    }`
    const tuple = regs.some(
        reg => reg.fields.length > 1 || reg.fields[0].startRepeats
    )

    return `# Autogenerated file. Do not edit.
from jacdac.bus import Bus, ${reading ? "Sensor" : ""}Client${
        events.length > 0 ? `, EventHandlerFn, UnsubscribeFn` : ``
    }
from .constants import *
${regs.length > 0 ? `from typing import Optional${tuple ? ", Tuple" : ""}` : ``}


class ${className}(${baseType}):
    """
    ${(spec.notes["short"] || "").split("\n").join("\n     * ")}
    Implements a client for the \`${
        spec.name
    } <https://microsoft.github.io/jacdac-docs/services/${
        spec.shortId
    }>\`_ service.

    """

    def __init__(self, bus: Bus, role: str${
        reading ? `, *, ${missingReadingField}: Optional[${readingType}] = None` : ""
    }) -> None:
        super().__init__(${ctorArgs.join(", ")})
${
    missingReadingField
        ? `        self.${missingReadingField} = ${missingReadingField}`
        : ""
}
${regs
    .map(reg => {
        const { kind, name: rname } = reg
        const { pyTypes: types } = packInfo(spec, reg, {
            isStatic: true,
            useBooleans: true,
        })
        const { fields, client } = reg
        const value = reg.identifier === Value
        const creading = reg === reading
        const regcst = `JD_${snakify(camelName).toUpperCase()}_REG_${snakify(
            reg.name
        ).toUpperCase()}`
        const fetchReg = `self.register(${regcst})`

        const single = fields.length === 1
        const rtype = single ? types[0] : `Tuple[${types.join(", ")}]`
        const { scale } = genFieldInfo(reg, fields[0])
        return `
    @property
    def ${snakify(rname)}(self) -> Optional[${rtype}]:
        """
        ${`${reg.optional ? "(Optional) " : ""}${
            reg.description || ""
        }, ${fields.filter(f => f.unit).map(f => `${f.name}: ${f.unit}`)}`
            .split("\n")
            .join("\n        ")}
        """${
            client
                ? `
        # TODO: implement client register
        raise  RuntimeError("client register not implemented")`
                : `${reading === reg ? `\n        self.refresh_reading()` : ``}
        return ${fetchReg}.${
                      single && rtype === "bool"
                          ? "bool_"
                          : single && scale
                          ? "float_"
                          : ""
                  }value(${[
                      creading && `self.${missingReadingField}`,
                      single && scale,
                  ]
                      .filter(v => !!v)
                      .join(", ")})`
        }
${
    kind === "rw"
        ? `
    @${snakify(rname)}.setter
    def ${snakify(rname)}(self, value: ${rtype}) -> None:${
              enabledReg && value
                  ? `
        self.enabled = True`
                  : ""
          }
        ${fetchReg}.set_values(${single ? "" : "*"}value${
              single && scale ? ` / ${scale}` : ""
          })

`
        : ""
}`
    })
    .join("")}${events
        .map(event => {
            return `
    def on_${snakify(
        event.name
    )}(self, handler: EventHandlerFn) -> UnsubscribeFn:
        """
        ${(event.description || "").split("\n").join("\n        ")}
        """
        return self.on_event(JD_${snakify(
            camelName
        ).toUpperCase()}_EV_${snakify(event.name).toUpperCase()}, handler)
`
        })
        .join("")}
${commands
    .map(command => {
        const { name: cname, client } = command
        const { pyTypes, types, names } = packInfo(spec, command, {
            isStatic: true,
            useBooleans: true,
        })
        const fnames = names.map(f => snakify(f).toLowerCase())
        const cmd = `JD_${snakify(spec.camelName)}_CMD_${snakify(
            cname
        )}`.toUpperCase()
        console.log("cmd", { cname, fnames, types, pyTypes, names })
        return `
    def ${snakify(cname)}(self, ${fnames
            .map((fname, fieldi) => `${fname}: ${pyTypes[fieldi]}`)
            .join(", ")}) -> None:
        """
        ${(command.description || "").split("\n").join("\n        ")}
        """
        ${
            client
                ? `# TODO: implement client command
        raise RuntimeError("client command not implemented")`
                : `self.send_cmd_packed(${cmd}, ${fnames.join(", ")})`
        }
`
    })
    .join("")}    
`
}

function toCSharpClient(
    spec: jdspec.ServiceSpec,
    options: { baseClient?: boolean } = {}
) {
    const { camelName, packets } = spec
    const { baseClient } = options

    const registers = packetsToRegisters(packets)
    const regs = registers
        .filter(r => !!r)
        .filter(r => !r.restricted && !r.client)
        .filter(r => !r.fields.some(f => f.startRepeats))
    const reading = regs.find(reg => reg.identifier === Reading)
    const baseType = reading ? "SensorClient" : "Client"
    const ctorTypes = ["JDBus bus", "string name"].filter(a => !!a)
    const ctorArgs = [
        `bus`,
        `name`,
        `ServiceClasses.${capitalize(camelName)}`,
    ].filter(a => !!a)
    const enabledReg = regs.find(isEnabledReg)
    const events = packets.filter(pkt => !pkt.derived && pkt.kind === "event")
    // TODO: pipes support
    const commands = packets.filter(
        pkt =>
            !pkt.derived &&
            !pkt.restricted &&
            pkt.kind === "command" &&
            pkt.fields.every(f => f.type !== "pipe") &&
            !pkt.fields.some(f => f.startRepeats)
    )

    const className = `${capitalize(camelName)}Client${
        baseClient ? "Base" : ""
    }`
    return `/** Autogenerated file. Do not edit. */
using Jacdac;
using System;

namespace Jacdac.Clients 
{
    /// <summary>
    /// ${(spec.notes["short"] || "").split("\n").join("\n     /// ")}
    /// Implements a client for the ${spec.name} service.
    /// </summary>
    /// <seealso cref="https://microsoft.github.io/jacdac-docs/services/${
        spec.shortId
    }/" />
    public partial class ${className} : ${baseType}
    {
        public ${className}(${ctorTypes.join(", ")})
            : base(${ctorArgs.join(", ")})
        {
        }
${regs
    .map(reg => {
        const { kind, name: rname } = reg
        const { csTypes: types } = packInfo(spec, reg, {
            isStatic: true,
            useBooleans: true,
        })
        const { fields, client } = reg
        const value = reg.identifier === Value
        const regcst = `(ushort)${capitalize(camelName)}Reg.${capitalize(
            camelize(reg.name)
        )}`

        const single = fields.length === 1
        const rtype = single ? types[0] : `object[] /*(${types.join(", ")})*/`
        const fetchArgs = `${regcst}, ${capitalize(
            camelName
        )}RegPack.${capitalize(camelize(reg.name))}`
        const fetchReg = `(${rtype})this.GetRegisterValue${
            rtype == "bool" ? "AsBool" : ""
        }${single ? "" : "s"}(${fetchArgs})`
        const setReg = `this.SetRegisterValue${
            single ? "" : "s"
        }(${regcst}, ${capitalize(camelName)}RegPack.${capitalize(
            camelize(reg.name)
        )}, value)`

        return `
        /// <summary>
        /// ${
            reg.optional
                ? `Tries to read the <c>${rname}</c> register value.`
                : `Reads the <c>${rname}</c> register value.`
        }
        /// ${`${reg.description || ""}, ${fields
            .filter(f => f.unit)
            .map(f => `${f.name}: ${f.unit}`)}`
            .split("\n")
            .join("\n        /// ")}
        /// </summary>
        ${
            reg.optional
                ? `bool TryGet${capitalize(camelize(rname))}(out ${rtype} value)
        {
            object[] values;
            if (this.TryGetRegisterValues(${fetchArgs}, out values)) 
            {
                value = (${rtype})values[0];
                return true;
            }
            else
            {
                value = default(${rtype});
                return false;
            }
        }${
            kind === "rw"
                ? `
        
        /// <summary>
        /// Sets the ${rname} value
        /// </summary>
        public void Set${capitalize(camelize(rname))}(${rtype} value)
        {
            ${setReg};
        }
`
                : ""
        }`
                : `public ${rtype} ${capitalize(camelize(rname))}
        {
            get
            {
                ${
                    client
                        ? `// TODO: implement client register
                   throw NotSupportedException("client register not implemented");`
                        : `return ${fetchReg};`
                }
            }${
                kind === "rw"
                    ? `
            set
            {
                ${
                    enabledReg && value
                        ? `
                this.Enabled = true;`
                        : ""
                }
                ${setReg};
            }
`
                    : ""
            }
        }`
        }
`
    })
    .join("")}${events
        .map(event => {
            return `
        /// <summary>
        /// ${(event.description || "").split("\n").join("\n        /// ")}
        /// </summary>
        public event ClientEventHandler ${capitalize(camelize(event.name))}
        {
            add
            {
                this.AddEvent((ushort)${capitalize(
                    camelName
                )}Event.${capitalize(camelize(event.name))}, value);
            }
            remove
            {
                this.RemoveEvent((ushort)${capitalize(
                    camelName
                )}Event.${capitalize(camelize(event.name))}, value);
            }
        }
`
        })
        .join("")}
${commands
    .map(command => {
        const { name: cname, client } = command
        const { csTypes: types, names } = packInfo(spec, command, {
            isStatic: true,
            useBooleans: true,
        })
        const fnames = names.map(f => snakify(f).toLowerCase())
        const cmd = `(ushort)${capitalize(spec.camelName)}Cmd.${capitalize(
            camelize(cname)
        )}`
        const pack = `${capitalize(spec.camelName)}CmdPack.${capitalize(
            camelize(cname)
        )}`
        return `
        ${client ? "/* client command" : ""}
        /// <summary>
        /// ${(command.description || "").split("\n").join("\n        /// ")}
        /// </summary>
        public void ${capitalize(camelize(cname))}(${fnames
            .map((fname, fieldi) => `${types[fieldi]} ${fname}`)
            .join(", ")})
        {
            this.SendCmd${!fnames.length ? "" : "Packed"}(${cmd}${
            fnames.length > 0
                ? `, ${pack}, new object[] { ${fnames.join(", ")} }`
                : ""
        });
        }${client ? "*/" : ""}
`
    })
    .join("")}
    }
}`
}

function genFieldInfo(reg: jdspec.PacketInfo, field: jdspec.PacketMember) {
    const isReading = reg.identifier === Reading
    const name =
        field.name === "_"
            ? reg.name
            : isReading
            ? field.name
            : `${reg.name}${capitalize(field.name)}`
    const min = pick(
        field.typicalMin,
        field.absoluteMin,
        field.unit === "/" ? (field.type[0] === "i" ? -100 : 0) : undefined,
        field.type === "u8" || field.type === "u16" ? 0 : undefined
    )
    const max = pick(
        field.typicalMax,
        field.absoluteMax,
        field.unit === "/" ? 100 : undefined,
        field.type === "u8" ? 0xff : field.type === "u16" ? 0xffff : undefined
    )
    const defl = field.defaultValue || (field.unit === "/" ? "100" : undefined)
    const valueScaler: (s: string) => string =
        field.unit === "/"
            ? s => `${s} * 100`
            : field.type === "bool"
            ? s => `!!${s}`
            : s => s
    const valueUnscaler: (s: string) => string =
        field.unit === "/"
            ? s => `${s} / 100`
            : field.type === "bool"
            ? s => `${s} ? 1 : 0`
            : s => s
    const scale = field.unit === "/" ? 100 : undefined
    const unit = field.unit === "/" ? "\\\\%" : field.unit
    return { name, min, max, defl, scale, valueScaler, valueUnscaler, unit }
}

function toHex(n: number): string {
    if (n === undefined) return ""
    if (n < 0) return "-" + toHex(n)
    return "0x" + n.toString(16)
}

function packedSensorSpec(info: jdspec.ServiceSpec) {
    if (!info.extends || info.extends.indexOf("_sensor") < 0) return ""
    const reading = info.packets.find(
        pkt => pkt.kind === "ro" && pkt.identifierName === "reading"
    )
    if (reading.fields.length != 1) return ""
    const fld = reading.fields[0]
    const tp = fld.storage
    if ([1, 2, 4, 8].indexOf(Math.abs(tp)) < 0) return ""
    const fmt = tp < 0 ? `I${-tp * 8}` : `U${tp * 8}`
    const shift = fld.shift ?? 0
    const mode =
        fld.type == "bool" || info.enums[fld.type] ? "DISCRETE" : "CONTINUOUS"
    const clsId = toHex(info.classIdentifier)

    return `JD_SPEC_PACK_SERVICE("${info.camelName}", ${clsId}, ${fmt}, ${shift}, ${mode})`
}

function processSpec(dn: string) {
    const path = require("path")

    console.log("processing directory " + dn + "...")
    const files: string[] = fs.readdirSync(dn)
    const includes: jdspec.SMap<jdspec.ServiceSpec> = {}
    files.sort()
    // ensure _system is first
    files.splice(files.indexOf("_system.md"), 1)
    files.unshift("_system.md")

    const outp = path.join(dn, "generated")
    mkdir(outp)
    for (const n of Object.keys(converters())) mkdir(path.join(outp, n))

    // generate makecode file structure
    const mkcdir = path.join(outp, "makecode")
    mkdir(mkcdir)
    const pydir = path.join(outp, "python")
    mkdir(pydir)
    const csdir = path.join(outp, "cs")
    mkdir(csdir)
    const mkcdServices: jdspec.MakeCodeServiceInfo[] = []
    const mkcTargetConfig: {
        packages: {
            approvedRepos: string[]
        }
        upgrades: Record<string, string>
    } = {
        packages: {
            approvedRepos: ["microsoft/pxt-jacdac"],
        },
        upgrades: {},
    }
    const pxtJacdacDir = path.resolve(
        path.join(dn, "..", "..", "..", "pxt-jacdac")
    )
    console.log(`pxt-jacdac: ${pxtJacdacDir}`)
    const pxtJacdacPxtJson = path.join(pxtJacdacDir, "pxt.json")
    let pxtJacdacVersion: string = undefined
    if (fs.existsSync(pxtJacdacPxtJson)) {
        const pxtJacdacjson: {
            version: string
        } = JSON.parse(
            fs.readFileSync(path.join(pxtJacdacDir, "pxt.json"), {
                encoding: "utf8",
            })
        )
        pxtJacdacVersion = pxtJacdacjson.version
        mkcTargetConfig.upgrades[
            "microsoft/pxt-jacdac"
        ] = `min:v${pxtJacdacVersion}`
    }

    const jacdacPythonDir = path.resolve(
        path.join(dn, "..", "..", "..", "jacdac-python", "jacdac")
    )
    console.log(`jacdac-python: ${jacdacPythonDir}`)
    const jacdacCsDir = path.resolve(
        path.join(dn, "..", "..", "..", "jacdac-dotnet", "Jacdac", "Clients")
    )
    console.log(`jacdac-dotnet: ${jacdacCsDir}`)

    const fmtStats: { [index: string]: number } = {}
    const concats: jdspec.SMap<string> = {}
    const markdowns: jdspec.ServiceMarkdownSpec[] = []
    for (const fn of files) {
        if (!/\.md$/.test(fn) || fn[0] == ".") continue
        console.log(`process ${fn}`)
        const cont = readString(dn, fn)
        const json = parseServiceSpecificationMarkdownToJSON(cont, includes, fn)
        const key = fn.replace(/\.md$/, "")
        includes[key] = json

        markdowns.push({
            classIdentifier: json.classIdentifier,
            shortId: json.shortId,
            source: cont,
        })

        json.packets
            .map(pkt => pkt.packFormat)
            .filter(fmt => !!fmt)
            .forEach(fmt => (fmtStats[fmt] = (fmtStats[fmt] || 0) + 1))

        reportErrors(json.errors, dn, fn)

        // check if there is a makecode project folder for this service
        const mkcdsrvdirname = dashify(json.camelName)
        const mkcdpxtjson = path.join(pxtJacdacDir, mkcdsrvdirname, "pxt.json")
        const hasMakeCodeProject = fs.existsSync(mkcdpxtjson)
        console.log(`check exists ${mkcdpxtjson}: ${hasMakeCodeProject}`)
        const pysrvdirname = snakify(json.camelName).toLowerCase()

        if (hasMakeCodeProject) {
            const pxtjson: {
                version: string
                supportedTargets?: string[]
                files: string[]
            } = JSON.parse(fs.readFileSync(mkcdpxtjson, { encoding: "utf8" }))
            const repo = `microsoft/pxt-jacdac/${mkcdsrvdirname}`
            mkcdServices.push({
                service: json.shortId,
                client: {
                    name: `jacdac-${mkcdsrvdirname}`,
                    targets: pxtjson.supportedTargets,
                    repo,
                    qName: `modules.${capitalize(json.camelName)}Client`,
                    default: `modules.${json.camelName}`,
                    generated: pxtjson.files.indexOf("client.g.ts") > -1,
                },
            })
            mkcTargetConfig.packages.approvedRepos.push(repo)
            mkcTargetConfig.upgrades[repo] = `min:v${pxtJacdacVersion}`
        }

        const cnv = converters()
        for (const n of Object.keys(cnv)) {
            const convResult = cnv[n](json)
            const ext =
                n == "sts" ? "ts" : n == "c" ? "h" : n == "cs" ? "g.cs" : n
            let fnn = fn.slice(0, -3)
            if (n == "cs") {
                fnn = path.join(
                    "Constants",
                    capitalize(camelize(fnn)) + "Constants"
                )
                mkdir(path.join(path.join(outp, n, "Constants")))
            }
            const cfn = path.join(outp, n, fnn + "." + ext)
            fs.writeFileSync(cfn, convResult)
            console.log(`written ${cfn}`)
            if (!concats[n]) concats[n] = ""
            concats[n] += convResult

            const generateClient =
                !/^_/.test(json.shortId) &&
                serviceBuiltins.indexOf(json.shortId) < 0
            if (n === "sts") {
                const mkcdclient = generateClient && toMakeCodeClient(json)
                const srvdir = path.join(mkcdir, mkcdsrvdirname)
                mkdir(srvdir)
                fs.writeFileSync(path.join(srvdir, "constants.ts"), convResult)
                // generate project file and client template
                if (mkcdclient) {
                    if (!hasMakeCodeProject)
                        fs.writeFileSync(
                            path.join(srvdir, "pxt.g.json"),
                            toPxtJson(json)
                        )
                    // only write client.g.ts if it already exists; otherwise use .gts to avoid confusing TS intellisense
                    fs.writeFileSync(
                        fs.existsSync(path.join(srvdir, "client.g.ts"))
                            ? path.join(srvdir, "client.g.ts")
                            : path.join(srvdir, "client.gts"),
                        mkcdclient
                    )
                }
            } else if (n === "cs") {
                const baseClient = fs.existsSync(
                    path.join(
                        jacdacCsDir,
                        `${capitalize(json.camelName)}Base.cs`
                    )
                )
                const csclient =
                    generateClient && toCSharpClient(json, { baseClient })
                const srvdir = path.join(csdir, "Clients")
                mkdir(srvdir)
                //fs.writeFileSync(path.join(srvdir, "constants.cs"), convResult)
                if (csclient)
                    fs.writeFileSync(
                        path.join(
                            srvdir,
                            baseClient
                                ? `${capitalize(json.camelName)}Base.g.cs`
                                : `${capitalize(json.camelName)}Client.g.cs`
                        ),
                        csclient
                    )
            } else if (n === "py") {
                const baseClient = fs.existsSync(
                    path.join(jacdacPythonDir, pysrvdirname, "client_base.py")
                )
                const pyclient =
                    generateClient && toPythonClient(json, { baseClient })
                const srvdir = path.join(pydir, pysrvdirname)
                mkdir(srvdir)
                fs.writeFileSync(path.join(srvdir, "constants.py"), convResult)
                if (!pyclient)
                    fs.writeFileSync(
                        path.join(srvdir, "__init__.py"),
                        `# Autogenerated file.
from .constants import *
`
                    )
                else {
                    fs.writeFileSync(
                        path.join(srvdir, "__init__.py"),
                        `# Autogenerated file.
from .client import ${capitalize(json.camelName)}Client # type: ignore
`
                    )
                    fs.writeFileSync(
                        path.join(
                            srvdir,
                            baseClient ? "client_base.py" : "client.py"
                        ),
                        pyclient
                    )
                }
            }
        }
    }

    fs.writeFileSync(
        path.join(outp, "services-sources.json"),
        JSON.stringify(markdowns),
        "utf-8"
    )
    fs.writeFileSync(
        path.join(outp, "services.json"),
        JSON.stringify(values(includes)),
        "utf-8"
    )
    fs.writeFileSync(path.join(outp, "specconstants.ts"), concats["ts"])
    fs.writeFileSync(path.join(outp, "specconstants.sts"), concats["sts"])
    fs.writeFileSync(path.join(outp, "specconstants.cs"), concats["cs"])
    fs.writeFileSync(path.join(outp, "devicescript-spec.d.ts"), concats["devs"])
    if (fs.existsSync(pxtJacdacDir)) {
        // only available locally
        fs.writeFileSync(
            path.join(outp, "../makecode-extensions.json"),
            JSON.stringify(mkcdServices, null, 2)
        )
        fs.writeFileSync(
            path.join(outp, "../makecode-targetconfig.json"),
            JSON.stringify(mkcTargetConfig, null, 2)
        )
    }

    const specs = values(includes)
    specs.sort((a, b) => a.classIdentifier - b.classIdentifier)
    const packed = specs.map(packedSensorSpec).filter(s => !!s)
    const packedC =
        `#include "jd_spec_pack.h"\n\n` +
        `// Sorted by service class!\n` +
        `JD_SPEC_PACK_BEGIN\n` +
        packed.join("\n") +
        `\nJD_SPEC_PACK_END\n\n` +
        `JD_SPEC_PACK_NUM(${packed.length})\n`
    const packpath = path.join(outp, "c/jd_spec_pack.c")
    console.log(`wrote ${packpath}`)
    fs.writeFileSync(packpath, packedC)

    const fms = Object.keys(fmtStats).sort((l, r) => -fmtStats[l] + fmtStats[r])
    console.log(fms.map(fmt => `${fmt}: ${fmtStats[fmt]}`))
}

function readString(folder: string, file: string) {
    const path = require("path")
    const cont: string = fs.readFileSync(path.join(folder, file), "utf8")
    return cont
}

function processDevices(upperName: string) {
    const path = require("path")

    console.log("processing devices in directory " + upperName + "...")
    const allDevices: jdspec.DeviceSpec[] = []
    const todo = [upperName]
    while (todo.length) {
        const dir = todo.pop()
        const files: string[] = fs.readdirSync(dir)
        files.sort()
        for (const fn of files) {
            const f = path.join(dir, fn)
            const stat = fs.statSync(f)
            if (stat.isDirectory()) todo.push(f)
            else if (/\.json/.test(f)) {
                console.log(`  ${f}`)
                const dev = normalizeDeviceSpecification(
                    JSON.parse(readString(dir, fn)) as jdspec.DeviceSpec
                )
                fs.writeFileSync(
                    path.join(dir, fn),
                    JSON.stringify(dev, null, 2)
                )
                allDevices.push(dev)
            }
        }
    }
    allDevices
        .filter(d => d.devices)
        .forEach(d =>
            d.devices
                .filter(did => !allDevices.find(({ id }) => id === did))
                .forEach(did =>
                    console.error(`${d.id}: device not found ${did}`)
                )
        )
    
    const statusScores : Record<jdspec.StabilityStatus, number> = {
        "deprecated": 100,
        "experimental": 50,
        "rc": 10,
        "stable": 0,
    }
    // push experimentals at the back
    allDevices.sort((a,b) => statusScores[a.status || "experimental"] - statusScores[b.status || "experimental"])
    const ofn = path.join("../dist", "devices.json")
    console.log(`writing ${ofn}`)
    fs.writeFileSync(ofn, JSON.stringify(allDevices, null, 2))
}

function reportErrors(
    errors: jdspec.Diagnostic[],
    folderName: string,
    fn: string
) {
    if (!errors) return
    const path = require("path")
    for (const e of errors) {
        const fn2 = e.file ? path.join(folderName, e.file) : fn
        console.error(`${fn2}(${e.line}): ${e.message}`)
    }
    process.exit(1)
}

function nodeMain() {
    fs = require("fs")
    const args: string[] = process.argv.slice(2)
    let deviceMode = false
    if (args[0] == "-d") {
        args.shift()
        deviceMode = true
    }
    if (args.length != 1) {
        console.error("usage: node spectool.js [-d] DIRECTORY")
        process.exit(1)
    }

    if (deviceMode) processDevices(args[0])
    else processSpec(args[0])
}

function mkdir(n: string) {
    try {
        fs.mkdirSync(n, "777")
    } catch (e) {
        if (e.code != "EEXIST") console.warn(e)
    }
}

if (typeof process != "undefined") nodeMain()
