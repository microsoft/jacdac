#  7-segment display

    identifier: 0x196158f7
    camel:sevenSegmentDisplay
    tags: display

A 7-segment numeric display, with one or more digits.

## Registers

    rw digits: bytes @ value

Each byte encodes the display status of a digit using, 
where bit 0 encodes segment `A`, bit 1 encodes segments `B`, ..., bit 6 encodes segments `G`, and bit 7 encodes the decimal point (if present).
If incoming ``digits`` data is smaller than `digit_count`, the remaining digits will be cleared.
Thus, sending an empty ``digits`` payload clears the screen.

```text
 - A -
 G   B
 |   |
 - F -
 |   |   -
 E   C  |DP|
 - D -   -
```

    rw brightness: u0.16 / @ intensity

Controls the brightness of the LEDs. ``0`` means off.

    rw double_dots?: bool @ 0x80

Turn on or off the column LEDs (separating minutes from hours, etc.) in of the segment.
If the column LEDs is not supported, the value remains false.

    const digit_count: u8 @ 0x180

The number of digits available on the display.

    const decimal_point: bool @ 0x181

True if decimal points are available (on all digits).
