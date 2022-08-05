# Relay

    identifier: 0x183fe656
    tags: 8bit
    status: stable

A switching relay.

The contacts should be labelled `NO` (normally open), `COM` (common), and `NC` (normally closed).
When relay is energized it connects `NO` and `COM`.
When relay is not energized it connects `NC` and `COM`.
Some relays may be missing `NO` or `NC` contacts.
When relay module is not powered, or is in bootloader mode, it is not energized (connects `NC` and `COM`).

## Registers

    rw active: bool @ intensity

Indicates whether the relay circuit is currently energized or not.

    enum Variant: u8 {
        Electromechanical = 1,
        SolidState = 2,
        Reed = 3
    }
    const variant?: Variant @ variant

Describes the type of relay used.

    const max_switching_current?: u32 mA @ 0x180

Maximum switching current for a resistive load.
