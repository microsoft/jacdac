# HID Joystick

    identifier: 0x1a112155
    status: experimental
    camel: hidJoystick

Controls a HID joystick.

## Commands

    flags Buttons : u32 {
        Left      = 0x0000_0001
        Up        = 0x0000_0002
        Right     = 0x0000_0004
        Down      = 0x0000_0008
        A         = 0x0000_0010
        B         = 0x0000_0020
        Select    = 0x0000_0080
        X         = 0x0000_0400
        Y         = 0x0000_0800
        LeftBumper   = 0x0000_1000,
        RightBumper  = 0x0000_2000,
        LeftTrigger  = 0x0000_4000,
        RightTrigger = 0x0000_8000,
        LeftStick    = 0x0000_1000,
        RightStick   = 0x0000_2000,
        Start        = 0x0001_0000,
    }    
    flags Axes: u16 {
        X = 0,
        Y = 1
    }
    unique command set_button @ 0x80 {
        buttons: Buttons
        down: bool
    }

Sets the up/down state of one or more buttons.

    unique command move @ 0x81 {
      axe: Axes
      dx: i16 #
      dy: i16 #
    }

Set the current move per axes.

    unique command throttle @ 0x82 {
        axe: Axes
        value: u0.16 /
    }

Sets the throttle state per axes.
