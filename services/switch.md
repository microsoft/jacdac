# Switch

    identifier: 0x1ad29402
    extends: _sensor

A switch.

## Registers

    ro active: bool @ reading

Indicates whether the switch is currently active (on).

    enum Variant: u32 {
        Slide = 1,
        Tilt = 2,
        PushButton = 3,
        Tactile = 4,
        Toggle = 5,
        Light = 6
    }
    const variant?: Variant @ variant

Describes the type of switch used.

    const auto_off_delay?: u16.16 s @ 0x180

Specifies the delay without activity to automatically turn off after turning on.

## Events

    event on @ active

Emitted when button goes from ``off`` to ``on``.

    event off @ inactive

Emitted when button goes from ``on`` to ``off``.
