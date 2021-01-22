# Line tracking

A sensor that detects light and dark surfaces, typically used for line following robots.

    identifier: 0x126c4cb2
    extends: _sensor

## Registers

    ro brightness: u8 / @ reading

Reports the detected brightness. It may be a digital value or, for some sensor, analog value.

    enum Variant: u8 {
        InfraredDigital = 1,
        InfraredAnalog = 2,
        InfraredAnalog5ch = 3
    }
    const variant?: Variant @ variant

Type of physical sensor used

## Events

    event dark @ 0x80 {}

The sensor detected a transition from light to dark

    event light @ 0x81 {}

The sensor detected a transition from dark to light
