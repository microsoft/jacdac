# Arcade screen

    identifier: 0x16fa36e5

A screen with indexed colors.

This is typically run over an SPI connection, not regular single-wire JACDAC.

## Commands

    flags DisplayFlags : u8 {
        ColumnMajor  = 0x00,
        RowMajor     = 0x01
        Upscale2x    = 0x02
    }

`RowMajor` is typical for computer screens, while most landscape embedded LCDs use `ColumnMajor`.
`Upscale2x` means the physical resolution of the screen is double the reported resolution,
and the screen will internally upscale.

    command announce @ announce {}
    report {
        flags: DisplayFlags
        bits_per_pixel: u8
        width: u16
        height: u16
    }

Announces display capabilities and logical size
(320x240 screen with `Upscale2x` will report 160x120).

    command start_update @ 0x81 {
        x: u16
        y: u16
        width: u16
        height: u16
    }

Sets the update window for subsequent `set_pixels` commands.

    command set_pixels @ 0x83 {
        pixels: bytes
    }

Set pixels in current window, according to current palette.

## Registers

    rw brightness: u0.8 / @ intensity

Set backlight brightness.
If set to `0` the display may go to sleep.

    rw palette @ 0x80 {
    repeats:
        blue: u0.8 /
        green: u0.8 /
        red: u0.8 /
        padding: u8
    }

The current palette.
The color entry repeats `1 << bits_per_pixel` times.
This register may be write-only.
