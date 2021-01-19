# Potentiometer

    identifier: 0x1f274746
    extends: _sensor

A slider or rotary potentiometer.

## Registers

    ro position: u16 / @ reading

The relative position of the slider between `0x0000` and `0xffff`.

    enum Variant: u32 {
        Slider = 1,
        Rotary = 2,
    }
    const variant: Variant @ variant

Specifies the physical layout of the potentiometer.