# Relay

    identifier: 0x183fe656

A switching relay.

## Registers

    rw conducting: bool @ intensity

Indicates whether the relay is currently on (closed).

    enum Variant: u32 {
        Electromechanical = 1,
        SolidState = 2,
        Reed = 3
    }
    const variant?: Variant @ variant

Describes the type of relay used.

## Events

    event on @ active

Emitted when relay goes from ``off`` to ``on`` state.

    event off @ inactive

Emitted when relay goes from ``on`` to ``off`` state.
