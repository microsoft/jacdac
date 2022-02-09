# Dot Matrix

    identifier: 0x110d154b
    group: display
    status: rc

A rectangular dot matrix display, made of monochrome LEDs or Braille pins.

## Registers

    rw dots : bytes @ value

The state of the screen where dot on/off state is
stored as a bit, column by column. The column should be byte aligned.

    rw brightness?: u0.8 / @ intensity

Reads the general brightness of the display, brightness for LEDs. `0` when the screen is off.

    const rows: u16 # @ 0x181

Number of rows on the screen

    const columns: u16 # @ 0x182

Number of columns on the screen

    enum Variant: u8 {
        LED = 1,
        Braille = 2,
    }
    const variant?: Variant @ variant

Describes the type of matrix used.
