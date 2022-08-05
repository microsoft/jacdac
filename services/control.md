# Control

    identifier: 0x00000000
    tags: C, 8bit
    status: stable

Control service is always service index `0`.
It handles actions common to all services on a device.

Note: some of the optional features (including `flood_ping`, `mcu_temperature`, and all string registers)
are not implemented in `8bit` version.

## Commands

    flags AnnounceFlags : u16 {
        RestartCounterSteady =        0x000F,
        RestartCounter1 =             0x0001,
        RestartCounter2 =             0x0002,
        RestartCounter4 =             0x0004,
        RestartCounter8 =             0x0008,
        StatusLightNone =             0x0000,
        StatusLightMono =             0x0010,
        StatusLightRgbNoFade =        0x0020,
        StatusLightRgbFade =          0x0030,
        SupportsACK =                 0x0100,
        SupportsBroadcast =           0x0200,
        SupportsFrames =              0x0400,
        IsClient =                    0x0800,
        SupportsReliableCommands =    0x1000,
    }
    command services @ announce { }
    report {
        flags: AnnounceFlags
        packet_count: u8
        reserved: u8
    repeats:
        service_class: u32
    }

The `restart_counter` is computed from the `flags & RestartCounterSteady`, starts at `0x1` and increments by one until it reaches `0xf`, then it stays at `0xf`.
If this number ever goes down, it indicates that the device restarted.
`service_class` indicates class identifier for each service index (service index `0` is always control, so it's
skipped in this enumeration).
`packet_count` indicates the number of reports sent by the current device since last announce,
including the current announce packet (it is always 0 if this feature is not supported).
The command form can be used to induce report, which is otherwise broadcast every 500ms.

    command noop @ 0x80 { }

Do nothing. Always ignored. Can be used to test ACKs.

    command identify? @ 0x81 { }

Blink the status LED (262ms on, 262ms off, four times, with the blue LED) or otherwise draw user's attention to device with no status light.
For devices with status light (this can be discovered in the announce flags), the client should
send the sequence of status light command to generate the identify animation.

    command reset? @ 0x82 { }

Reset device. ACK may or may not be sent.

    unique command flood_ping? @ 0x83 {
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
If a monochrome LEDs is fitted, the average value of `red`, `green`, `blue` is used.
If intensity of a monochrome LED cannot be controlled, any value larger than `0` should be considered
on, and `0` (for all three channels) should be considered off.

    command proxy? @ 0x85 {}

Force client device into proxy mode.

    command reliable_commands? @ 0x86 {
        seed: u32
    }
    report {
        commands: pipe
    }
    pipe command wrapped_command {
        service_size: u8
        service_index: u8
        service_command: u16
        payload: bytes
    }

This opens a pipe to the device to provide an alternative, reliable transport of actions
(and possibly other commands).
The commands are wrapped as pipe data packets.
Multiple invocations of this command with the same `seed` are dropped
(and thus the command is not `unique`); otherwise `seed` carries no meaning
and should be set to a random value by the client.
Note that while the commands sends this way are delivered exactly once, the
responses might get lost.

## Registers

    rw internal reset_in? : u32 us @ 0x80

When set to value other than `0`, it asks the device to reset after specified number of microseconds.
This is typically used to implement watchdog functionality, where a brain device sets `reset_in` to
say 1.6s every 0.5s.

    const device_description?: string @ 0x180

Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)

    const product_identifier? : u32 { absolute_min = 0x3000_0000, absolute_max = 0x3fff_ffff } @ 0x181

A numeric code for the string above; used to identify firmware images and devices.

    const bootloader_product_identifier?: u32 { absolute_min = 0x3000_0000, absolute_max = 0x3fff_ffff } @ 0x184

Typically the same as `product_identifier` unless device was flashed by hand; the bootloader will respond to that code.

    const firmware_version?: string @ 0x185

A string describing firmware version; typically semver.

    ro volatile mcu_temperature?: i16 °C { preferred_interval=60000, typical_min = -10, typical_max = 150 } @ 0x182

MCU temperature in degrees Celsius (approximate).

    ro volatile uptime?: u64 us { preferred_interval=60000 } @ 0x186

Number of microseconds since boot.
