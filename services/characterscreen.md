# Character Screen

    identifier: 0x1f37c56a
    group: display
    status: rc

A screen that displays characters, typically a LCD/OLED character screen.

## Registers

    rw message: string @ value

Text to show. Use `\n` to break lines.

    rw brightness?: u0.16 / @ intensity

Brightness of the screen. `0` means off.

    enum Variant : u8 {
        LCD = 1,
        OLED = 2,
        Braille = 3,
    }
    const variant?: Variant @ variant

Describes the type of character LED screen.

    enum TextDirection : u8 {
        LeftToRight = 1,
        RightToLeft = 2
    }
    rw text_direction?: TextDirection @ 0x82

Specifies the RTL or LTR direction of the text.

    const rows: u8 # @ 0x180

Gets the number of rows.

    const columns: u8 # @ 0x181

Gets the number of columns.
