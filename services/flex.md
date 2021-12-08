# Flex

    identifier: 0x1f47c6c6
    extends: _sensor
    group: slider
    tags: C, 8bit
    status: stable

A bending or deflection sensor.

## Registers

    ro bending: u0.16 / @ reading

The relative position of the slider.

    ro bending_error?: u0.16 / @ reading_error

Absolute error on the reading value.

    const length?: u16 mm @ 0x180

Length of the flex sensor