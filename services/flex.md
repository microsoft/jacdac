# Flex

    identifier: 0x1f47c6c6
    extends: _sensor
    group: sensor
    tags: C, 8bit
    status: rc

A bending or deflection sensor.

## Registers

    ro bending: i1.15 / @ reading

A measure of the bending.

    const length?: u16 mm @ 0x180

Length of the flex sensor