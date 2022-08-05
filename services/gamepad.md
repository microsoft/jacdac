# Gamepad

    identifier: 0x108f7456
    extends: _sensor
    group: button
    tags: 8bit, padauk
    status: rc

A two axis directional gamepad with optional buttons.

## Registers

    flags Buttons : u32 {
        Left      = 0x0000_0001
        Up        = 0x0000_0002
        Right     = 0x0000_0004
        Down      = 0x0000_0008
        A         = 0x0000_0010
        B         = 0x0000_0020
        Menu      = 0x0000_0040
        Select    = 0x0000_0080
        Reset     = 0x0000_0100
        Exit      = 0x0000_0200
        X         = 0x0000_0400
        Y         = 0x0000_0800
    }
    ro direction @ reading {
        buttons: Buttons
        x: i1.15 /
        y: i1.15 /
    }

If the gamepad is analog, the directional buttons should be "simulated", based on gamepad position
(`Left` is `{ x = -1, y = 0 }`, `Up` is `{ x = 0, y = -1}`).
If the gamepad is digital, then each direction will read as either `-1`, `0`, or `1` (in fixed representation).
The primary button on the gamepad is `A`.

    enum Variant : u8 {
        Thumb = 1
        ArcadeBall = 2
        ArcadeStick = 3
        Gamepad = 4
    }
    const variant?: Variant @ variant

The type of physical gamepad.

    const buttons_available: Buttons @ 0x180

Indicates a bitmask of the buttons that are mounted on the gamepad.
If the `Left`/`Up`/`Right`/`Down` buttons are marked as available here, the gamepad is digital.
Even when marked as not available, they will still be simulated based on the analog gamepad.

## Events

    event buttons_changed @ change {
        buttons: Buttons
    }

Emitted whenever the state of buttons changes.
