# Control

    identifier: 0x00000000

Control service is always service number `0`.
It handles actions common to all services on a device.



## Commands

    command noop @ 0x80 { }

Do nothing. Always ignored. Can be used to test ACKs.

    command identify @ 0x81 { }

Blink an LED or otherwise draw user's attention.

    command reset @ 0x82 { }

Reset device. ACK may or may not be sent.

## Registers

    const device_description: string @ 0x180

Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)

    const device_class: u32 @ 0x181

A numeric code for the string above; used to identify firmware images.

    const bootloader_device_class: u32 @ 0x184

Typically the same as `device_class` unless device was flashed by hand; the bootloader will respond to that code.

    const firmware_version: string @ 0x185

A string describing firmware version; typically semver.

    ro temperature: i8 C @ 0x182

MCU temperature in degrees Celsius (approximate).

    ro uptime: u64 us @ 0x186

Number of microseconds since boot.

