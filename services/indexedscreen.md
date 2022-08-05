# Indexed screen

    identifier: 0x16fa36e5
    tags: SPI
    status: rc

A screen with indexed colors.

This is often run over an SPI connection, not regular single-wire Jacdac.

## Commands

    command start_update @ 0x81 {
        x: u16 px
        y: u16 px
        width: u16 px
        height: u16 px
    }

Sets the update window for subsequent `set_pixels` commands.

    unique command set_pixels @ 0x83 {
        pixels: bytes
    }

Set pixels in current window, according to current palette.
Each "line" of data is aligned to a byte.

## Registers

    rw brightness: u0.8 / @ intensity

Set backlight brightness.
If set to `0` the display may go to sleep.

    rw palette @ 0x80 {
    repeats:
        blue: u8
        green: u8
        red: u8
        padding: u8
    }

The current palette.
The color entry repeats `1 << bits_per_pixel` times.
This register may be write-only.

    const bits_per_pixel: u8 bit @ 0x180

Determines the number of palette entries.
Typical values are 1, 2, 4, or 8.

    const width: u16 px @ 0x181

Screen width in "natural" orientation.

    const height: u16 px @ 0x182

Screen height in "natural" orientation.

    rw width_major: bool @ 0x81

If true, consecutive pixels in the "width" direction are sent next to each other (this is typical for graphics cards).
If false, consecutive pixels in the "height" direction are sent next to each other.
For embedded screen controllers, this is typically true iff `width < height`
(in other words, it's only true for portrait orientation screens).
Some controllers may allow the user to change this (though the refresh order may not be optimal then).
This is independent of the `rotation` register.

    rw up_sampling: u8 px @ 0x82

Every pixel sent over wire is represented by `up_sampling x up_sampling` square of physical pixels.
Some displays may allow changing this (which will also result in changes to `width` and `height`).
Typical values are 1 and 2.

    rw rotation: u16 ° @ 0x83

Possible values are 0, 90, 180 and 270 only.
Write to this register do not affect `width` and `height` registers,
and may be ignored by some screens.
