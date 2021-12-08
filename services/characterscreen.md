# Character Screen

    identifier: 0x1f37c56a
    group: display
    status: stable

A screen that displays characters.

## Registers

    lowlevel rw message: string @ value

Text to show. Use `\n` to break lines.

    rw brightness?: u0.8 / @ intensity

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

## Commands

    command set_line @ 0x80 {
        index: u16
        message: string
    }

Overrides the content of a single line at a 0-based index.

    command clear @ 0x81 {}

Clears all text from the display.
