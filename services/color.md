# Color

Senses RGB colors

    identifier: 0x1630d567
    extends: _sensor

## Registers

    ro color @ reading {
        red: u16 /
        green: u16 /
        blue: u16 /
    }

Detected color in the RGB color space.
