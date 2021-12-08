# Relay

    identifier: 0x183fe656
    tags: 8bit
    status: stable

A switching relay.

## Registers

    rw closed: bool @ intensity

Indicates whether the relay circuit is currently energized (closed) or not.

    enum Variant: u8 {
        Electromechanical = 1,
        SolidState = 2,
        Reed = 3
    }
    const variant?: Variant @ variant

Describes the type of relay used.

    const max_switching_current?: u32 mA @ 0x180

Maximum switching current for a resistive load.
