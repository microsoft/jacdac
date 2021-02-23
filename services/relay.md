# Relay

    identifier: 0x183fe656

A switching relay.

## Registers

    rw closed: bool @ intensity

Indicates whether the relay circuit is currently on (closed) or off (closed).

    enum Variant: u8 {
        Electromechanical = 1,
        SolidState = 2,
        Reed = 3
    }
    const variant?: Variant @ variant

Describes the type of relay used.

    const max_switching_current?: u32 mA @ 0x180

Maximum switching current for a resistive load.

## Events

    event on @ active

Emitted when relay goes from ``off`` to ``on`` state.

    event off @ inactive

Emitted when relay goes from ``on`` to ``off`` state.
