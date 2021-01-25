# Color

Senses RGB colors

    identifier: 0x1630d567
    extends: _sensor

## Registers

    ro color @ reading {
        red: u8
        green: u8
        blue: u8
    }

Detected color in the RGB color space.
