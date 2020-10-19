# Control

    identifier: 0x00000000
    camel: ctrl

Control service is always service number `0`.
It handles actions common to all services on a device.



## Commands

    flags AnnounceFlags : u8 {
        SupportsACK = 0x01,
    }
    command services @ announce { }
    report {
        restart_counter: u8
        flags: AnnounceFlags
        reserved: u16
    repeats:
        service_class: u32
    }

The `restart_counter` starts at `0x1` and increments by one until it reaches `0xf`, then it stays at `0xf`.
If this number ever goes down, it indicates that the device restarted.
The upper 4 bits of `restart_counter` are reserved.
`service_class` indicates class identifier for each service number (service number `0` is always control, so it's
skipped in this enumeration).
The command form can be used to induce report, which is otherwise broadcast every 500ms.

    command noop @ 0x80 { }

Do nothing. Always ignored. Can be used to test ACKs.

    command identify @ 0x81 { }

Blink an LED or otherwise draw user's attention.

    command reset @ 0x82 { }

Reset device. ACK may or may not be sent.

## Registers

    const device_description: string @ 0x180

Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)

    const device_class: u32 { absolute_min = 0x3000_0000, absolute_max = 0x3fff_ffff } @ 0x181

A numeric code for the string above; used to identify firmware images.

    const bootloader_device_class: u32 { absolute_min = 0x3000_0000, absolute_max = 0x3fff_ffff } @ 0x184

Typically the same as `device_class` unless device was flashed by hand; the bootloader will respond to that code.

    const firmware_version: string @ 0x185

A string describing firmware version; typically semver.

    ro temperature: i16 C { typical_min = -10, typical_max = 150 } @ 0x182

MCU temperature in degrees Celsius (approximate).

    ro uptime: u64 us @ 0x186

Number of microseconds since boot.

