# HID Joystick

    identifier: 0x1a112155
    status: experimental
    camel: hidJoystick

Controls a HID joystick.

## Commands

    unique command set_state @ 0x80 {
        buttons: u32
    r:
        x: i0.16 /
        y: i0.16 /
    }

Sets the up/down button state (up to 32 buttons), and the stick positions.
