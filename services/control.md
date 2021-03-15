# Control

    identifier: 0x00000000
    tags: C

Control service is always service index `0`.
It handles actions common to all services on a device.

## Commands

    flags AnnounceFlags : u8 {
        SupportsACK = 0x01,
    }
    command services @ announce { }
    report {
        restart_counter: u8
        flags: AnnounceFlags
        packet_count: u8
        reserved: u8
    repeats:
        service_class: u32
    }

The `restart_counter` starts at `0x1` and increments by one until it reaches `0xf`, then it stays at `0xf`.
If this number ever goes down, it indicates that the device restarted.
The upper 4 bits of `restart_counter` are reserved.
`service_class` indicates class identifier for each service index (service index `0` is always control, so it's
skipped in this enumeration).
`packet_count` indicates the number of packets sent by the current device since last announce,
including the current announce packet (it is always 0 if this feature is not supported).
The command form can be used to induce report, which is otherwise broadcast every 500ms.

    command noop @ 0x80 { }

Do nothing. Always ignored. Can be used to test ACKs.

    command identify? @ 0x81 { }

Blink an LED or otherwise draw user's attention.
TODO: this is being deprecated in favor of `set_status_light`.

    command reset? @ 0x82 { }

Reset device. ACK may or may not be sent.

    command flood_ping? @ 0x83 {
        num_responses: u32
        start_counter: u32
        size: u8 B
    }
    report {
        counter: u32
        dummy_payload: bytes
    }

The device will respond `num_responses` times, as fast as it can, setting the `counter` field in the report
to `start_counter`, then `start_counter + 1`, ..., and finally `start_counter + num_responses - 1`.
The `dummy_payload` is `size` bytes long and contains bytes `0, 1, 2, ...`.

    command set_status_light @ 0x84 {
        to_red: u8
        to_green: u8
        to_blue: u8
        speed: u8
    }

Initiates a color transition of the status light from its current color to the one specified.
The transition will complete in about `512 / speed` frames
(each frame is currently 100ms, so speed of `51` is about 1 second and `26` 0.5 second).
As a special case, if speed is `0` the transition is immediate.
If MCU is not capable of executing transitions, it can consider `speed` to be always `0`.
If a monochrome LEDs is fitted, the average value of ``red``, ``green``, ``blue`` is used.
If intensity of a monochrome LED cannot be controlled, any value larger than `0` should be considered
on, and `0` (for all three channels) should be considered off.

## Registers

    rw reset_in? : u32 us @ 0x80

When set to value other than `0`, it asks the device to reset after specified number of microseconds.
This is typically used to implement watchdog functionality, where a brain device sets `reset_in` to
say 1.6s every 0.5s.

    const device_description?: string @ 0x180

Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)

    const firmware_identifier? : u32 { absolute_min = 0x3000_0000, absolute_max = 0x3fff_ffff } @ 0x181

A numeric code for the string above; used to identify firmware images and devices.

    const bootloader_firmware_identifier?: u32 { absolute_min = 0x3000_0000, absolute_max = 0x3fff_ffff } @ 0x184

Typically the same as `firmware_identifier` unless device was flashed by hand; the bootloader will respond to that code.

    const firmware_version?: string @ 0x185

A string describing firmware version; typically semver.

    ro mcu_temperature?: i16 °C { preferred_interval=60000, typical_min = -10, typical_max = 150 } @ 0x182

MCU temperature in degrees Celsius (approximate).

    ro uptime?: u64 us { preferred_interval=60000 } @ 0x186

Number of microseconds since boot.

    const device_url?: string @ 0x187

Request the information web site for this device

    const firmware_url?: string @ 0x188

URL with machine-readable metadata information about updating device firmware
