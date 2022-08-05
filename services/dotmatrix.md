# Dot Matrix

    identifier: 0x110d154b
    group: display
    status: rc

A rectangular dot matrix display, made of monochrome LEDs or Braille pins.

## Registers

    rw dots : bytes @ value

The state of the screen where dot on/off state is
stored as a bit, column by column. The column should be byte aligned.

For example, if the display has no more than 8 rows in each column, then each byte contains bits corresponding
to a single column. Least-significant bit is on top.
If display has 10 rows, then each column is represented by two bytes.
The top-most 8 rows sit in the first byte (with the least significant bit being on top),
and the remainign 2 row sit in the second byte.

The following C expression can be used to check if a given `column, row` coordinate is set:
`dots[column * column_size + (row >> 3)] & (1 << (row & 7))`, where
`column_size` is `(number_of_rows + 7) >> 3` (note that if number of rows is 8 or less then `column_size` is `1`),
and `dots` is of `uint8_t*` type.

The size of this register is `number_of_columns * column_size` bytes.

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
