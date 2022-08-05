# Color

    identifier: 0x1630d567
    extends: _sensor
    group: environment
    tags: 8bit

Senses RGB colors

## Registers

    ro color @ reading {
        red: u0.16 /
        green: u0.16 /
        blue: u0.16 /
    }

Detected color in the RGB color space.
