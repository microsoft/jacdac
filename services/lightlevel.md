# Light level

A sensor that measures luminosity level.

    identifier: 0x17dc9a1c
    extends: _sensor
    tags: imaging

## Registers

    ro light_level: u0.16 / @ reading

Detect light level

    enum Variant: u8 {
        PhotoResistor = 1,
        LEDMatrix = 2,
        Ambient = 3
    }
    const variant?: Variant @ variant

The type of physical sensor.
