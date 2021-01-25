# Joystick

A two axis directional joystick

    identifier: 0x1acb1890
    extends: _sensor

## Registers

    ro direction @ reading {
        x: i16 /
        y: i16 /
    }

The direction of the joystick measure in two direction.

    enum Variant : u8 {
        Thumb = 1
        ArcadeBall = 2
        ArcadeStick = 3
    }
    const variant?: Variant @ variant

The type of physical joystick.