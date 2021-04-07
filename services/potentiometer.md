# Potentiometer

    identifier: 0x1f274746
    extends: _sensor
    group: slider
    tags: C, 8bit

A slider or rotary potentiometer.

## Registers

    ro position: u0.16 / @ reading

The relative position of the slider between `0` and `1`.

    enum Variant: u8 {
        Slider = 1,
        Rotary = 2,
    }
    const variant: Variant @ variant

Specifies the physical layout of the potentiometer.