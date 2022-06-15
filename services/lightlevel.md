# Light level

A sensor that measures luminosity level.

    identifier: 0x17dc9a1c
    extends: _sensor
    group: environment
    tags: 8bit, padauk, input
    status: stable

## Registers

    ro light_level: u0.16 / @ reading

Detect light level

    ro light_level_error?: u0.16 / @ reading_error

Absolute estimated error of the reading value

    enum Variant: u8 {
        PhotoResistor = 1,
        ReverseBiasedLED = 2
    }
    const variant?: Variant @ variant

The type of physical sensor.
