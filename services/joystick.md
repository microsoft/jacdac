# Joystick

A two axis directional joystick

    identifier: 0x1acb1890
    extends: _sensor
    tags: button

## Registers

    ro direction @ reading {
        x: i1.15 /
        y: i1.15 /
    }

The direction of the joystick measure in two direction.
If joystick is digital, then each direction will read as either `-0x8000`, `0x0`, or `0x7fff`.

    enum Variant : u8 {
        Thumb = 1
        ArcadeBall = 2
        ArcadeStick = 3
    }
    const variant?: Variant @ variant

The type of physical joystick.

    const digital?: bool @ 0x180

Indicates if the joystick is digital, typically made of switches.
