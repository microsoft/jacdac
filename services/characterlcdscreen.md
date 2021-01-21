# Character LCD Screen

    identifier: 0x1f37c56a

A character LCD screen.

## Registers

    rw message: string @ value

Sets text, with `\n` as the newline character.

    rw cursor: bool @ 0x80

Configures to show or hide the cursor.

    rw blink: bool @ 0x81

Configures to blink the cursor.

    enum TextDirection : u8 {
        LeftToRight = 1,
        RightToLeft = 2
    }
    rw text_direction: TextDirection @ 0x82

Specifies the RTL or LTR direction of the text.

    rw backlight_color? @ 0x83 {
        red: u8
        green: u8
        blue: u8
    }

If available, sets the backlight color.

    const rows?: u8 @ 0x180

Gets the number of rows. Default is ``2``.

    const columns?: u8 @ 0x181

Gets the number of columns. Default is ``16``.

## Commands

    command clear @ 0x80 { }

Clears the screen
