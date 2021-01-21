# Character LCD Screen

    identifier: 0x1f37c56a

A character LCD screen.

## Registers

    rw message: string @ value

Text to show. Use `\n` to break lines.

    rw cursor: bool @ 0x80

Configures to show or hide the cursor.

    rw blink: bool @ 0x81

Configures to blink the cursor.

    enum TextDirection : u8 {
        LeftToRight = 1,
        RightToLeft = 2
    }
    rw text_direction?: TextDirection @ 0x82

Specifies the RTL or LTR direction of the text.

    rw backlight_color? @ 0x83 {
        hue: u8
        saturation: u8
        value: u8
    }

If available, sets the backlight color.

    const rows: u8 @ 0x180

Gets the number of rows.

    const columns: u8 @ 0x181

Gets the number of columns.
