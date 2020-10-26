declare namespace jdspec {
    type SMap<T> = { [v: string]: T; }

    /**
     * How a type is stored in memory. Negative values signify signed integers, positive unsigned.
     * Magnitude is size in bytes. 0 means unspecified length (usually 'the rest of the packet').
     */
    type StorageType = number

    /**
     * Unit for a field.
     * 
     * 'frac' means that the range of the storage type is supposed to cover 0 to 1 (or -1 to 1 for signed types).
     * Many fields have no unit (eg. because they represent counts); in that case empty string is used.
     * SenML (https://www.iana.org/assignments/senml/senml.xhtml) units and secondary unit are also supported.
     */
    type Unit = "" | "frac" | "us" | "mWh" | "bytes" | "grav"
    // SenML units
    | "m" | "kg" | "g" | "s" | "A" | "K" | "cd" | "mol" | "Hz" | "rad" | "sr" | "N" | "Pa" | "J" | "W" | "C" | "V" | "F" | "Ohm"
    | "S" | "Wb" | "T" | "H" | "Cel" | "lm" | "lx" | "Bq" | "Gy" | "Sv" | "kat" | "m2" | "m3" | "l" | "m/s" | "m/s2" | "m3/s" | "l/s"
    | "W/m2" | "cd/m2" | "bit" | "bit/s" | "lat" | "lon" | "pH" | "dB" | "dBW" | "Bspl" | "count" | "/" | "%" | "%RH" | "%EL" | "EL"
    | "1/s" | "1/min" | "beat/min" | "beats" | "S/m" | "B" | "VA" | "VAs" | "var" | "vars" | "J/m" | "kg/m3" | "deg"
    // SenML secondary units
    | "ms" | "min" | "h" | "MHz" | "kW" | "kVA" | "kvar" | "Ah" | "Wh" | "kWh"
    | "varh" | "kvarh" | "kVAh" | "Wh/km" | "KiB" | "GB" | "Mbit/s" | "B/s" | "MB/s" | "mV" | "mA" | "dBm" | "ug/m3"
    | "mm/h" | "m/h" | "ppm" | "/100" | "/1000" | "hPa" | "mm" | "cm" | "km" | "km/h";

    /**
     * Service specification.
     */
    interface ServiceSpec {
        /**
         * Human-readable name of the service, extracted from first H1 in markdown
         */
        name: string;

        /**
         * Name of the service, in CamelCase.
         */
        camelName: string;

        /**
         * Short name of the service, to use in name prefixes.
         */
        shortName: string;

        /**
         * Short identifier for the service, from file name.
         */
        shortId: string;

        /**
         * The full markdown source for the spec.
         */
        source?: string;

        /**
         * When written in hex, it has the form 0x1xxxxxxx (except for control service).
         */
        classIdentifier: number;

        /**
         * List of extended service types (eg. 'sensor').
         * 
         * This is for reference only. Inherited registers/commands/etc are included
         * in our packets object.
         */
        extends: string[];

        /**
         * Various descriptions extracted from markdown.
         * 
         * Keys can include:
         *   - short - short service description, after name, before any subsections
         *   - long - any remaining service description
         *   - events - note on top of ## Events section
         *   - registers - note on top of ## Registers section
         *   - commands - note on top of ## Commands section
         * 
         * The idea for say registers note is to include it at the end of each register
         * description when displaying (maybe in smaller type).
         */
        notes: SMap<string>;

        /**
         * Enumerations defined in the service. Key is the enum name.
         */
        enums: SMap<EnumInfo>;

        /**
         * Registers, commands, and events defined in service.
         */
        packets: PacketInfo[];

        /**
         * The service uses commands/registers over 0x100/0x200
         */
        highCommands?: boolean;

        /**
         * If parsing of markdown fails, this includes the parse errors. Set to null/undefined when no errors.
         */
        errors?: Diagnostic[];
    }

    /**
     * Describes an enumeration.
     */
    interface EnumInfo {
        /**
         * Name in upper camel case.
         */
        name: string;

        /**
         * Member can be combined as bit-fields.
         */
        isFlags?: boolean;

        /**
         * How is this enum to be stored.
         */
        storage: StorageType;

        /**
         * Map from enum member name to its value.
         */
        members: SMap<number>;
    }

    /**
     * Various ways of interfacing with a service.
     * 
     * commands are sent to the service, which responds with reports.
     * 
     * rw register maps to two commands: one for getting its value (along with corresponding report)
     * and one for setting the value.
     * 
     * ro registers cannot be written.
     * 
     * const registers cannot be written, and also don't change at least until reset.
     * 
     * events are passed inside of event report, and can be also piped via streams. 
     */
    type PacketKind = "report" | "command" | "const" | "ro" | "rw" | "event"
        | "pipe_command" | "pipe_report" | "meta_pipe_command" | "meta_pipe_report"

    /**
     * Spec for a report/command/register or event.
     */
    interface PacketInfo {
        /**
         * Kind of this packet.
         */
        kind: PacketKind;

        /**
         * Name in lower case snake case.
         */
        name: string;

        /**
         * Kind of pipe this packet establishes or is valid on. 
         */
        pipeType?: string;

        /**
         * This either a command/report number, an identifier for event, or a register number, which is combined
         * with 0x1000/0x2000 to get command for reading/writing.
         */
        identifier: number;

        /**
         * If present, this packet has identifier named after base class.
         */
        identifierName?: string;

        /**
         * Text that follows the definition in markdown.
         */
        description: string;

        /**
         * Binary layout of arguments of this packet (if any).
         * 
         * Many interfaces will have only a single field, named "_" - the spec language
         * has a shorthand syntax for that.
         */
        fields: PacketMember[];

        /**
         * If present and true, the binary layout of fields does not follow natural alignment
         * and need to have PACKED C attribute or similar applied.
         */
        packed?: boolean;

        /**
         * If present and true, the handling of given packet is optional and can be left out by implementation.
         */
        optional?: boolean;

        /**
         * If present and true, this packet was derived from base class.
         */
        derived?: boolean;

        /**
         * If present and true, this is a report that has the same identifier as preceding command.
         */
        secondary?: boolean;

        /**
         * If present and true, this command is followed by its report.
         */
        hasReport?: boolean;
    }

    /**
     * Spec for a single entry in packet binary layout.
     */
    interface PacketMember {
        /**
         * Name of member. Can be "_" if there's only a single member.
         */
        name: string;

        /**
         * Type specifying how to interpret data. All values are little endian.
         * 
         * This can be one of:
         *   - u8, u16, u32, u64, i8, i16, i32, i64, bytes
         *   - name of an enum defined in the current service
         *   - string - UTF-8 encoded string
         */
        type: string;

        /**
         * Type is one of u8, u16, u32, u64, i8, i16, i32, i64, bytes.
         */
        isSimpleType?: boolean;

        /**
         * If present and set, indicates that the number is IEEE little endian float (16, 32 or 64 bit long).
         */
        isFloat?: boolean;

        /**
         * If present, specifies the raw value should be divided by (1 << shift) before usage.
         * Always set when unit is 'frac'.
         */
        shift?: number;

        /**
         * A Unit helping to interpret value.
         */
        unit: Unit;

        /**
         * Describes how the value is layed out in memory.
         */
        storage: StorageType;

        /**
         * If default value for a register is non-zero, it is specified here.
         */
        defaultValue?: number;

        /**
         * Minimum typical scaled (shifted) value when specified.
         */
        typicalMin?: number;

        /**
         * Maximum typical scaled (shifted) value when specified.
         */
        typicalMax?: number;

        /**
         * Minimum absolute scaled (shifted) value when specified.
         */
        absoluteMin?: number;

        /**
         * Maximum absolute scaled (shifted) value when specified.
         */
        absoluteMax?: number;

        /**
         * If set, this and following fields repeat in order, to fill the packet.
         */
        startRepeats?: boolean;
    }

    /**
     * Possible error message from parsing specification markdown.
     */
    interface Diagnostic {
        /**
         * Name of the file where the error occurred.
         */
        file: string;

        /**
         * 1-based line number of the error.
         */
        line: number;

        /**
         * Error message.
         */
        message: string;
    }

    interface DeviceSpec {
        /**
         * URL-friendly id.
         */
        id: string;

        /**
         * Friendly name of the device
         */
        name: string;

        /**
         * A few sentences about the device
         */
        description: string;

        /**
         * Relative path to picture of the device.
         */
        image?: string;

        /**
         * A URL where the user can learn more about the device (and possibly buy it).
         */
        link?: string;

        /**
         * Firmware identifiers associated with different versions of this device.
         */
        firmwares: number[];

        /**
         * Service class identifiers for services supported by this device.
         */
        services: number[];

        /**
         * Github repository containing the firmware releases
         */
        repo: string;

        /**
         * Hooks for parser.
         */
        errors?: Diagnostic[];

        /**
         * Original markdown source
         */
        source?: string;
    }
}
