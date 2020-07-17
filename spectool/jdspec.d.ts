declare namespace jdspec {
    type SMap<T> = { [v: string]: T; }

    /**
     * How a type is stored in memory. 'bytes' has unspecified length, as therefore usually comes at the end of packet.
     */
    type StorageType = "i8" | "u8" | "i16" | "u16" | "i32" | "u32" | "i64" | "u64" | "bytes"

    /**
     * Unit for a field.
     * 
     * 'frac' means that the range of the storage type is supposed to cover 0 to 1 (or -1 to 1 for signed types).
     * 
     * Many fields have no unit (eg. because they represent counts); in that case empty string is used.
     */
    type Unit = "" | "frac" | "s" | "ms" | "us" | "mV" | "mA" | "mWh" | "C" | "K" | "g" | "perc"

    /**
     * Service specification.
     */
    interface ServiceSpec {
        /**
         * Name of the service, extracted from first H1 in markdown
         */
        name: string;

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
        packets: SMap<PacketInfo>;

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
         * This either a command/report number, an identifier for event, or a register number, which is combined
         * with 0x1000/0x2000 to get command for reading/writing.
         */
        identifier: number;
        
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
         *   - a StorageType
         *   - name of an enum defined in the current service
         *   - string - UTF-8 encoded string
         *   - i32[] - an array of signed 32 bit values
         */
        type: string;

        /**
         * If present, specifies the raw value should be divided by (1 << shift) before usage.
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
}
