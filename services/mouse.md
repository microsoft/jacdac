# Mouse

    identifier: 0x1885dc1c
    status: experimental

Control a device that acts as a mouse.

## Commands

    flags Button : u8 {
        Right = 0x01
        Middle = 0x04
        Left = 0x02
    }
    enum ButtonEvent : u8 {
        Up = 0x01
        Down = 0x02
        Click = 0x03
        DoubleClick = 0x04
    }
    command set_button @ 0x80 {
        buttons: Button
        event: ButtonEvent
    }

Sets the up/down state of one or more buttons.

    command move @ 0x81 {
      dx: i16 #
      dy: i16 #
      time: u16 ms
    }

Moves the mouse by the distance specified.
If the time is positive, it specifies how long to make the move.

    command wheel @ 0x82 {
        dy: i16 #
        time: u16 ms
    }

Turns the wheel up or down. Positive if scrolling up.
If the time is positive, it specifies how long to make the move.