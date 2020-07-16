# Slider

    identifier: 0x1f274746
    extends: sensor

A slider potentiometer.

## Registers

    ro position: u16 frac @ reading

The relative position of the slider between `0x0000` and `0xffff`.
