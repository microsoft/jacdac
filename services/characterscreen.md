# Character Screen

    identifier: 0x1f37c56a

A screen that displays characters.

## Registers

    rw message: string @ value

Text to show. Use `\n` to break lines.

    enum Variant : u8 {
        LCD = 1,
        OLED = 2
    }
    const variant?: Variant @ variant

Describes the type of character LED screen.

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
