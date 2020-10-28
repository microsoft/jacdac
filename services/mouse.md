# Mouse

    identifier: 0x1885dc1c

Control a device that acts as a mouse.

## Commands

    enum Button : u8 {
        right = 0x01
        middle = 0x04
        left = 0x02
    }
    enum ButtonEvent : u8 {
        up = 0x01
        down = 0x02
        click = 0x03
        double_click = 0x04
    }
    command set @ 0x80 {
        buttons: Button
        event: ButtonEvent
    }

Sets the up/down state of one or more buttons.

    command move @ 0x81 {
      x: i8
      y: i8
    }


Moves the mouse by the distance specified.

    command wheel: i8 @ 0x82

Turns the wheel up or down.