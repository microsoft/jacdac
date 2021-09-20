# Flex

    identifier: 0x1f47c6c6
    extends: _sensor
    group: slider
    tags: C, 8bit

A bending or deflection sensor.

## Registers

    ro bending: u0.16 / @ reading

The relative position of the slider.

    enum Variant: u8 {
        Linear22Inch = 1,
        Linear45Inch = 2,
    }
    const variant?: Variant @ variant

Specifies the physical layout of the flex sensor.