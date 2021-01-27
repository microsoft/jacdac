#  7-segment display

    identifier: 0x196158f7
    camel:sevenSegmentDisplay

A classic 7-segment display, with 4 dots and column.

## Registers

    rw digits: bytes @ value

Each byte encodes the display status of a digit using a ``GFEDCBA`` encoding. 
If incoming ``digits`` data is smaller than available, the remaining digits will be cleared. Thus, sending an empty ``digits`` payload clears the screen.

```text
 - A -
 |   |
 G   B
 |   |
 - F -
 |   |   -
 E   C  |DP|
 - D -   -
```

    rw brightness: u16 / @ intensity

Controls the brightness of the LEDs. ``0`` means off.

    rw double_dots?: bool @ 0x80

Turn on or off the column leds in of the segment. If the column leds is not supported, the value remains false.

    const digit_count? = 4: u8 @ 0x80

The number of digits available on the display.
