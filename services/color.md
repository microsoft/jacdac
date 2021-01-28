# Color

Senses RGB colors

    identifier: 0x1630d567
    extends: _sensor

## Registers

    ro color @ reading {
        red: u0.16 /
        green: u0.16 /
        blue: u0.16 /
    }

Detected color in the RGB color space.
