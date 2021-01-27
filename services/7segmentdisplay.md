#  7-segment display

    identifier: 0x196158f7

A classic 7-segment display, with 4 dots and column.

## Registers

    rw digits: bytes @ value {

Each byte encodes the display status of a digit. For each digit, each bit represents the on/off status of the LED section as follows:

```
 - 0 -
 |   |
 6   1
 |   |
 - 5 -
 |   |   -
 4   2  |7|
 - 3 -   -
```

    rw brightness: u8 @ intensity

Controls the brightness of the LEDs. ``0`` means off.

    rw column_leds?: bool @ 0x80

Turn on or off the column leds in the middle of the segment. If the column leds is not supported, the value remains false.

    const digit_count? = 4: u8 @ 0x80

The number of digits available on the display.
