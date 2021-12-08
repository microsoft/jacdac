# Switch

    identifier: 0x1ad29402
    extends: _sensor
    group: button
    tags: 8bit

A switch, which keeps its position.

## Registers

    ro active: bool @ reading

Indicates whether the switch is currently active (on).

    enum Variant: u8 {
        Slide = 1
        Tilt = 2
        PushButton = 3
        Tactile = 4
        Toggle = 5
        Proximity = 6
        Magnetic = 7
        FootPedal = 8
    }
    const variant?: Variant @ variant

Describes the type of switch used.

    const auto_off_delay?: u16.16 s @ 0x180

Specifies the delay without activity to automatically turn off after turning on.
For example, some light switches in staircases have such a capability.

## Events

    event on @ active

Emitted when switch goes from `off` to `on`.

    event off @ inactive

Emitted when switch goes from `on` to `off`.
