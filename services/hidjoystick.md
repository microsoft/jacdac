# HID Joystick

    identifier: 0x1a112155
    status: experimental
    camel: hidJoystick

Controls a HID joystick.

## Registers

    const button_count: u8 @ 0x180

Number of button report supported

    const buttons_analog: u32 @ 0x181

A bitset that indicates which button is analog.

    const axis_count: u8 @ 0x182

Number of analog input supported

## Commands

    unique command set_buttons @ 0x80 {
    repeats: 
        pressure: u0.8 /
    }

Sets the up/down button state, one byte per button, supports analog buttons. For digital buttons, use `0` for released, `1` for pressed.

    unique command set_axis @ 0x81 {
    repeats:
        position: i1.15 /
    }

Sets the state of analog inputs.