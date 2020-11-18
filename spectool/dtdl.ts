
/***
 * JACDAC service/device specification to DTDL
 * 
 *  DTDL specification: https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md.
 */

// https://github.com/Azure/digital-twin-model-identifier
// ^dtmi:(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$
function toDTMI(segments: (string | number)[], version?: number) {
    return `dtmi:jacdac:${segments.map(seg => typeof seg === "string" ? seg : `x${seg.toString(16)}`).join(':')};${version !== undefined ? version : 1}`;
}

function toUnit(pkt: jdspec.PacketInfo) {
    if (pkt.fields.length !== 1)
        return undefined;
    const field = pkt.fields[0];
    if (!field.unit)
        return undefined;

    /**
     *     type Unit = "m" | "kg" | "g" | "s" | "A" | "K" | "cd" | "mol" | "Hz" | "rad" | "sr" | "N" | "Pa" | "J" | "W" | "C" | "V" | "F" | "Ohm"
        | "S" | "Wb" | "T" | "H" | "Cel" | "lm" | "lx" | "Bq" | "Gy" | "Sv" | "kat" | "m2" | "m3" | "l" | "m/s" | "m/s2" | "m3/s" | "l/s"
        | "W/m2" | "cd/m2" | "bit" | "bit/s" | "lat" | "lon" | "pH" | "dB" | "dBW" | "Bspl" | "count" | "/" | "%RH" | "%EL" | "EL"
        | "1/s" | "1/min" | "beat/min" | "beats" | "S/m" | "B" | "VA" | "VAs" | "var" | "vars" | "J/m" | "kg/m3" | "deg";

    type SecondaryUnit = "ms" | "min" | "h" | "MHz" | "kW" | "kVA" | "kvar" | "Ah" | "Wh" | "kWh"
        | "varh" | "kvarh" | "kVAh" | "Wh/km" | "KiB" | "GB" | "Mbit/s" | "B/s" | "MB/s" | "mV" | "mA" | "dBm" | "ug/m3"
        | "mm/h" | "m/h" | "ppm" | "/100" | "/1000" | "hPa" | "mm" | "cm" | "km" | "km/h";
     */
    const units: jdspec.SMap<{ semantic: string; unit: string; }> = {
        "m/s2": {
            semantic: "Acceleration",
            unit: "metrePerSecondSquared"
        },
        "rad": {
            semantic: "Angle",
            unit: "radian"
        },
        "rad/s": {
            semantic: "AngularVelocity",
            unit: "radianPerSecond"
        },
        "rad/s2": {
            semantic: "AngularAcceleration",
            unit: "radianPerSecondSquared"
        },
        "m": {
            semantic: "Length",
            unit: "metre"
        },
        "m2": {
            semantic: "Area",
            unit: "squareMetre"
        },
        "s": {
            semantic: "TimeSpan",
            unit: "second"
        },
        "ms": {
            semantic: "TimeSpan",
            unit: "millisecond"
        },
        "us": {
            semantic: "TimeSpan",
            unit: "microsecond"
        },
        "K": {
            semantic: "Temperature",
            unit: "kelvin"
        },
        "C": {
            semantic: "Temperature",
            unit: "degreeCelsius"
        },
        "F": {
            semantic: "Temperature",
            unit: "degreeFahrenheit"
        },
    };
    const unit = units[field.unit];
    if (unit)
        return unit;

    console.warn(`unsupported unit ${field.unit}`)
    return undefined;
}

/*
"metrePerSecondSquared": { "@id": "dtmi:standard:unit:metrePerSecondSquared;2" },
  "centimetrePerSecondSquared": { "@id": "dtmi:standard:unit:centimetrePerSecondSquared;2" },
  "gForce": { "@id": "dtmi:standard:unit:gForce;2" },
  "radian": { "@id": "dtmi:standard:unit:radian;2" },
  "degreeOfArc": { "@id": "dtmi:standard:unit:degreeOfArc;2" },
  "minuteOfArc": { "@id": "dtmi:standard:unit:minuteOfArc;2" },
  "secondOfArc": { "@id": "dtmi:standard:unit:secondOfArc;2" },
  "turn": { "@id": "dtmi:standard:unit:turn;2" },
  "radianPerSecondSquared": { "@id": "dtmi:standard:unit:radianPerSecondSquared;2" },
  "radianPerSecond": { "@id": "dtmi:standard:unit:radianPerSecond;2" },
  "degreePerSecond": { "@id": "dtmi:standard:unit:degreePerSecond;2" },
  "revolutionPerSecond": { "@id": "dtmi:standard:unit:revolutionPerSecond;2" },
  "revolutionPerMinute": { "@id": "dtmi:standard:unit:revolutionPerMinute;2" },
  "squareMetre": { "@id": "dtmi:standard:unit:squareMetre;2" },
  "squareCentimetre": { "@id": "dtmi:standard:unit:squareCentimetre;2" },
  "squareMillimetre": { "@id": "dtmi:standard:unit:squareMillimetre;2" },
  "squareKilometre": { "@id": "dtmi:standard:unit:squareKilometre;2" },
  "hectare": { "@id": "dtmi:standard:unit:hectare;2" },
  "squareFoot": { "@id": "dtmi:standard:unit:squareFoot;2" },
  "squareInch": { "@id": "dtmi:standard:unit:squareInch;2" },
  "acre": { "@id": "dtmi:standard:unit:acre;2" },
  "farad": { "@id": "dtmi:standard:unit:farad;2" },
  "millifarad": { "@id": "dtmi:standard:unit:millifarad;2" },
  "microfarad": { "@id": "dtmi:standard:unit:microfarad;2" },
  "nanofarad": { "@id": "dtmi:standard:unit:nanofarad;2" },
  "picofarad": { "@id": "dtmi:standard:unit:picofarad;2" },
  "coulomb": { "@id": "dtmi:standard:unit:coulomb;2" },
  "ampere": { "@id": "dtmi:standard:unit:ampere;2" },
  "microampere": { "@id": "dtmi:standard:unit:microampere;2" },
  "milliampere": { "@id": "dtmi:standard:unit:milliampere;2" },
  "bitPerSecond": { "@id": "dtmi:standard:unit:bitPerSecond;2" },
  "kibibitPerSecond": { "@id": "dtmi:standard:unit:kibibitPerSecond;2" },
  "mebibitPerSecond": { "@id": "dtmi:standard:unit:mebibitPerSecond;2" },
  "gibibitPerSecond": { "@id": "dtmi:standard:unit:gibibitPerSecond;2" },
  "tebibitPerSecond": { "@id": "dtmi:standard:unit:tebibitPerSecond;2" },
  "exbibitPerSecond": { "@id": "dtmi:standard:unit:exbibitPerSecond;2" },
  "zebibitPerSecond": { "@id": "dtmi:standard:unit:zebibitPerSecond;2" },
  "yobibitPerSecond": { "@id": "dtmi:standard:unit:yobibitPerSecond;2" },
  "bytePerSecond": { "@id": "dtmi:standard:unit:bytePerSecond;2" },
  "kibibytePerSecond": { "@id": "dtmi:standard:unit:kibibytePerSecond;2" },
  "mebibytePerSecond": { "@id": "dtmi:standard:unit:mebibytePerSecond;2" },
  "gibibytePerSecond": { "@id": "dtmi:standard:unit:gibibytePerSecond;2" },
  "tebibytePerSecond": { "@id": "dtmi:standard:unit:tebibytePerSecond;2" },
  "exbibytePerSecond": { "@id": "dtmi:standard:unit:exbibytePerSecond;2" },
  "zebibytePerSecond": { "@id": "dtmi:standard:unit:zebibytePerSecond;2" },
  "yobibytePerSecond": { "@id": "dtmi:standard:unit:yobibytePerSecond;2" },
  "bit": { "@id": "dtmi:standard:unit:bit;2" },
  "kibibit": { "@id": "dtmi:standard:unit:kibibit;2" },
  "mebibit": { "@id": "dtmi:standard:unit:mebibit;2" },
  "gibibit": { "@id": "dtmi:standard:unit:gibibit;2" },
  "tebibit": { "@id": "dtmi:standard:unit:tebibit;2" },
  "exbibit": { "@id": "dtmi:standard:unit:exbibit;2" },
  "zebibit": { "@id": "dtmi:standard:unit:zebibit;2" },
  "yobibit": { "@id": "dtmi:standard:unit:yobibit;2" },
  "byte": { "@id": "dtmi:standard:unit:byte;2" },
  "kibibyte": { "@id": "dtmi:standard:unit:kibibyte;2" },
  "mebibyte": { "@id": "dtmi:standard:unit:mebibyte;2" },
  "gibibyte": { "@id": "dtmi:standard:unit:gibibyte;2" },
  "tebibyte": { "@id": "dtmi:standard:unit:tebibyte;2" },
  "exbibyte": { "@id": "dtmi:standard:unit:exbibyte;2" },
  "zebibyte": { "@id": "dtmi:standard:unit:zebibyte;2" },
  "yobibyte": { "@id": "dtmi:standard:unit:yobibyte;2" },
  "kilogramPerCubicMetre": { "@id": "dtmi:standard:unit:kilogramPerCubicMetre;2" },
  "gramPerCubicMetre": { "@id": "dtmi:standard:unit:gramPerCubicMetre;2" },
  "joule": { "@id": "dtmi:standard:unit:joule;2" },
  "kilojoule": { "@id": "dtmi:standard:unit:kilojoule;2" },
  "megajoule": { "@id": "dtmi:standard:unit:megajoule;2" },
  "gigajoule": { "@id": "dtmi:standard:unit:gigajoule;2" },
  "electronvolt": { "@id": "dtmi:standard:unit:electronvolt;2" },
  "megaelectronvolt": { "@id": "dtmi:standard:unit:megaelectronvolt;2" },
  "kilowattHour": { "@id": "dtmi:standard:unit:kilowattHour;2" },
  "newton": { "@id": "dtmi:standard:unit:newton;2" },
  "pound": { "@id": "dtmi:standard:unit:pound;2" },
  "ounce": { "@id": "dtmi:standard:unit:ounce;2" },
  "ton": { "@id": "dtmi:standard:unit:ton;2" },
  "hertz": { "@id": "dtmi:standard:unit:hertz;2" },
  "kilohertz": { "@id": "dtmi:standard:unit:kilohertz;2" },
  "megahertz": { "@id": "dtmi:standard:unit:megahertz;2" },
  "gigahertz": { "@id": "dtmi:standard:unit:gigahertz;2" },
  "lux": { "@id": "dtmi:standard:unit:lux;2" },
  "footcandle": { "@id": "dtmi:standard:unit:footcandle;2" },
  "henry": { "@id": "dtmi:standard:unit:henry;2" },
  "millihenry": { "@id": "dtmi:standard:unit:millihenry;2" },
  "microhenry": { "@id": "dtmi:standard:unit:microhenry;2" },
  "metre": { "@id": "dtmi:standard:unit:metre;2" },
  "centimetre": { "@id": "dtmi:standard:unit:centimetre;2" },
  "millimetre": { "@id": "dtmi:standard:unit:millimetre;2" },
  "micrometre": { "@id": "dtmi:standard:unit:micrometre;2" },
  "nanometre": { "@id": "dtmi:standard:unit:nanometre;2" },
  "kilometre": { "@id": "dtmi:standard:unit:kilometre;2" },
  "foot": { "@id": "dtmi:standard:unit:foot;2" },
  "inch": { "@id": "dtmi:standard:unit:inch;2" },
  "mile": { "@id": "dtmi:standard:unit:mile;2" },
  "nauticalMile": { "@id": "dtmi:standard:unit:nauticalMile;2" },
  "astronomicalUnit": { "@id": "dtmi:standard:unit:astronomicalUnit;2" },
  "candelaPerSquareMetre": { "@id": "dtmi:standard:unit:candelaPerSquareMetre;2" },
  "lumen": { "@id": "dtmi:standard:unit:lumen;2" },
  "candela": { "@id": "dtmi:standard:unit:candela;2" },
  "weber": { "@id": "dtmi:standard:unit:weber;2" },
  "maxwell": { "@id": "dtmi:standard:unit:maxwell;2" },
  "tesla": { "@id": "dtmi:standard:unit:tesla;2" },
  "kilogram": { "@id": "dtmi:standard:unit:kilogram;2" },
  "gram": { "@id": "dtmi:standard:unit:gram;2" },
  "milligram": { "@id": "dtmi:standard:unit:milligram;2" },
  "microgram": { "@id": "dtmi:standard:unit:microgram;2" },
  "tonne": { "@id": "dtmi:standard:unit:tonne;2" },
  "slug": { "@id": "dtmi:standard:unit:slug;2" },
  "gramPerSecond": { "@id": "dtmi:standard:unit:gramPerSecond;2" },
  "kilogramPerSecond": { "@id": "dtmi:standard:unit:kilogramPerSecond;2" },
  "gramPerHour": { "@id": "dtmi:standard:unit:gramPerHour;2" },
  "kilogramPerHour": { "@id": "dtmi:standard:unit:kilogramPerHour;2" },
  "watt": { "@id": "dtmi:standard:unit:watt;2" },
  "microwatt": { "@id": "dtmi:standard:unit:microwatt;2" },
  "milliwatt": { "@id": "dtmi:standard:unit:milliwatt;2" },
  "kilowatt": { "@id": "dtmi:standard:unit:kilowatt;2" },
  "megawatt": { "@id": "dtmi:standard:unit:megawatt;2" },
  "gigawatt": { "@id": "dtmi:standard:unit:gigawatt;2" },
  "horsepower": { "@id": "dtmi:standard:unit:horsepower;2" },
  "kilowattHourPerYear": { "@id": "dtmi:standard:unit:kilowattHourPerYear;2" },
  "pascal": { "@id": "dtmi:standard:unit:pascal;2" },
  "kilopascal": { "@id": "dtmi:standard:unit:kilopascal;2" },
  "bar": { "@id": "dtmi:standard:unit:bar;2" },
  "millibar": { "@id": "dtmi:standard:unit:millibar;2" },
  "millimetresOfMercury": { "@id": "dtmi:standard:unit:millimetresOfMercury;2" },
  "poundPerSquareInch": { "@id": "dtmi:standard:unit:poundPerSquareInch;2" },
  "inchesOfMercury": { "@id": "dtmi:standard:unit:inchesOfMercury;2" },
  "inchesOfWater": { "@id": "dtmi:standard:unit:inchesOfWater;2" },
  "ohm": { "@id": "dtmi:standard:unit:ohm;2" },
  "milliohm": { "@id": "dtmi:standard:unit:milliohm;2" },
  "kiloohm": { "@id": "dtmi:standard:unit:kiloohm;2" },
  "megaohm": { "@id": "dtmi:standard:unit:megaohm;2" },
  "decibel": { "@id": "dtmi:standard:unit:decibel;2" },
  "bel": { "@id": "dtmi:standard:unit:bel;2" },
  "kelvin": { "@id": "dtmi:standard:unit:kelvin;2" },
  "degreeCelsius": { "@id": "dtmi:standard:unit:degreeCelsius;2" },
  "degreeFahrenheit": { "@id": "dtmi:standard:unit:degreeFahrenheit;2" },
  "second": { "@id": "dtmi:standard:unit:second;2" },
  "millisecond": { "@id": "dtmi:standard:unit:millisecond;2" },
  "microsecond": { "@id": "dtmi:standard:unit:microsecond;2" },
  "nanosecond": { "@id": "dtmi:standard:unit:nanosecond;2" },
  "minute": { "@id": "dtmi:standard:unit:minute;2" },
  "hour": { "@id": "dtmi:standard:unit:hour;2" },
  "day": { "@id": "dtmi:standard:unit:day;2" },
  "year": { "@id": "dtmi:standard:unit:year;2" },
  "unity": { "@id": "dtmi:standard:unit:unity;2" },
  "percent": { "@id": "dtmi:standard:unit:percent;2" },
  "newtonMetre": { "@id": "dtmi:standard:unit:newtonMetre;2" },
  "metrePerSecond": { "@id": "dtmi:standard:unit:metrePerSecond;2" },
  "centimetrePerSecond": { "@id": "dtmi:standard:unit:centimetrePerSecond;2" },
  "kilometrePerSecond": { "@id": "dtmi:standard:unit:kilometrePerSecond;2" },
  "metrePerHour": { "@id": "dtmi:standard:unit:metrePerHour;2" },
  "kilometrePerHour": { "@id": "dtmi:standard:unit:kilometrePerHour;2" },
  "milePerHour": { "@id": "dtmi:standard:unit:milePerHour;2" },
  "milePerSecond": { "@id": "dtmi:standard:unit:milePerSecond;2" },
  "knot": { "@id": "dtmi:standard:unit:knot;2" },
  "volt": { "@id": "dtmi:standard:unit:volt;2" },
  "millivolt": { "@id": "dtmi:standard:unit:millivolt;2" },
  "microvolt": { "@id": "dtmi:standard:unit:microvolt;2" },
  "kilovolt": { "@id": "dtmi:standard:unit:kilovolt;2" },
  "megavolt": { "@id": "dtmi:standard:unit:megavolt;2" },
  "cubicMetre": { "@id": "dtmi:standard:unit:cubicMetre;2" },
  "cubicCentimetre": { "@id": "dtmi:standard:unit:cubicCentimetre;2" },
  "litre": { "@id": "dtmi:standard:unit:litre;2" },
  "millilitre": { "@id": "dtmi:standard:unit:millilitre;2" },
  "cubicFoot": { "@id": "dtmi:standard:unit:cubicFoot;2" },
  "cubicInch": { "@id": "dtmi:standard:unit:cubicInch;2" },
  "fluidOunce": { "@id": "dtmi:standard:unit:fluidOunce;2" },
  "gallon": { "@id": "dtmi:standard:unit:gallon;2" },
  "litrePerSecond": { "@id": "dtmi:standard:unit:litrePerSecond;2" },
  "millilitrePerSecond": { "@id": "dtmi:standard:unit:millilitrePerSecond;2" },
  "litrePerHour": { "@id": "dtmi:standard:unit:litrePerHour;2" },
  "millilitrePerHour": { "@id": "dtmi:standard:unit:millilitrePerHour;2" },

    "State": { "@id": "dtmi:iotcentral:class:State;2" },
  "Event": { "@id": "dtmi:iotcentral:class:Event;2" },
  "Location": { "@id": "dtmi:iotcentral:class:Location;2" },
  "VelocityVector": { "@id": "dtmi:iotcentral:class:VelocityVector;2" },
  "AccelerationVector": { "@id": "dtmi:iotcentral:class:AccelerationVector;2" },

  "vector": { "@id": "dtmi:iotcentral:schema:vector;2" }
*/

// https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#primitive-schemas

function enumDTDI(srv: jdspec.ServiceSpec, en: jdspec.EnumInfo): string {
    return toDTMI([srv.classIdentifier, en.name])
}

function enumSchema(srv: jdspec.ServiceSpec, en: jdspec.EnumInfo): DTDLSchema {
    const members = Object.keys(en.members).map(k => en.members[k])
    const dtdl = {
        "@type": "Enum",
        "@id": enumDTDI(srv, en),
        "name": en.name,
        "valueSchema": "integer",
        "enumValues": Object.keys(en.members).map(k => ({
            name: k,
            enumValue: en.members[k]
        }))
    }
    return dtdl;
}

function toSchema(srv: jdspec.ServiceSpec, pkt: jdspec.PacketInfo): string {
    // todo: startsRepeats
    if (pkt.fields.length !== 1)
        return undefined;
    const field = pkt.fields[0];
    if (field.type == "bool")
        return "boolean";
    if (field.isFloat)
        return "float";
    if (field.isSimpleType) {
        if (/^(u|i)/.test(field.type))
            return "integer";
        else if (field.type === "B")
            // base64 encoded binary data
            return "string";
    }
    if (field.type === "string")
        return "string";
    if (field.shift && field.storage === 4 && /^(u|i)/.test(field.type))
        return "float"; // decimal type
    const en = srv.enums[field.type];
    if (en)
        return enumDTDI(srv, en);
    console.warn(`unsupported schema`, { fields: pkt.fields })
    return undefined;
}

function packetToDTDL(srv: jdspec.ServiceSpec, pkt: jdspec.PacketInfo): DTDLContent {
    const types: jdspec.SMap<string> = {
        "command": "Command",
        "const": "Property",
        "rw": "Property",
        "ro": "Property",
        "event": "Telemetry"
    }
    const dtdl: any = {
        "@type": types[pkt.kind] || `Unsupported${pkt.kind}`,
        name: pkt.name,
        "@id": toDTMI([srv.shortId, pkt.kind, pkt.name]),
        description: pkt.description,
    }
    switch (pkt.kind) {
        case "command":
            break;
        case "const":
        case "rw":
        case "ro":
        case "event":
            const unit = toUnit(pkt);
            if (unit) {
                dtdl.unit = unit.unit;
            }
            dtdl.schema = toSchema(srv, pkt)
            if (pkt.kind === "rw")
                dtdl.writable = true;
            if (pkt.kind == "ro" && pkt.identifier == 0x101) // isReading
                dtdl["@type"] = "Telemetry"

            if (!dtdl.schema && pkt.kind === "event") {
                // keep a count of the events
                dtdl["@type"] = [dtdl["@type"], "Event"]
                dtdl.schema = toDTMI([srv.shortId, "event"]);
            }
            else if (unit && unit.semantic)
                dtdl["@type"] = [dtdl["@type"], unit.semantic]
            break;
        default:
            console.log(`unknown packet kind ${pkt.kind}`)
            break;
    }
    return dtdl;
}


export interface DTDLNode {
    '@type'?: string;
    '@id'?: string;
    name?: string;
    displayName?: string,
    description?: string;
}

export interface DTDLSchema extends DTDLNode {
    fields?: DTDLSchema[];
    schema?: string | DTDLSchema;
}

export interface DTDLContent extends DTDLNode {
    '@type': "Property" | "Command" | "Component";
    unit?: string;
    schema?: string | DTDLSchema;
}

export interface DTDLInterface extends DTDLNode {
    contents: DTDLContent[];
    schemas?: DTDLSchema[];
    '@context'?: "dtmi:dtdl:context;2";
}

export function serviceToInterface(srv: jdspec.ServiceSpec): DTDLInterface {
    const dtdl: DTDLInterface = {
        "@type": "Interface",
        "@id": toDTMI([srv.shortId]),
        "name": srv.shortName,
        "displayName": srv.name,
        "description": srv.notes["short"],
        "contents": srv.packets.map(pkt => packetToDTDL(srv, pkt)).filter(c => !!c)
    }
    const hasEvents = srv.packets.find(pkt => pkt.kind === "event");
    const hasEnums = Object.keys(srv.enums).length;
    if (hasEvents || hasEnums) {
        dtdl.schemas = [];
        if (hasEvents)
            dtdl.schemas.push({
                "@id": toDTMI([srv.shortId, "event"]),
                "@type": "Object",
                "fields": [{
                    "name": "count",
                    "schema": "integer"
                }]
            });
        if (hasEnums)
            dtdl.schemas = dtdl.schemas.concat(Object.keys(srv.enums).map(en => enumSchema(srv, srv.enums[en])));
    }
    //if (srv.extends?.length)
    //    dtdl.extends = srv.extends.map(id => toDTMI([id]))
    return dtdl;
}

function serviceToComponent(spec: jdspec.ServiceSpec): any {
    const dtdl = {
        "@type": "Component",
        "name": spec.shortName,
        "schema": toDTMI([spec.shortId])
    }
    return dtdl;
}

export function deviceToInterface(dev: jdspec.DeviceSpec): DTDLInterface {
    const dtdl: DTDLInterface = {
        "@type": "Interface",
        "@id": toDTMI([dev.id]),
        "name": dev.name,
        "description": dev.description,
        "contents": dev.services.map((srv, i) => ({
            "@type": "Component",
            "name": `srv${i}`,
            "schema": toDTMI([srv])
        }))
    }
    return dtdl;
}

export function DTDLtoString(dtdl: DTDLInterface) {
    dtdl["@context"] = "dtmi:dtdl:context;2";
    return JSON.stringify(dtdl, undefined, 4);
}
