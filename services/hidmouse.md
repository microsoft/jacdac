# HID Mouse

    identifier: 0x1885dc1c
    status: experimental
    camel: hidMouse

Controls a HID mouse. 

This service cannot be simulated.

## Commands

    flags Button : u16 {
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
A ``Click`` is the same as ``Down`` followed by ``Up`` after 100ms.
A ``DoubleClick`` is two clicks with ``150ms`` gap between them (that is, ``100ms`` first click, ``150ms`` gap, ``100ms`` second click).

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
