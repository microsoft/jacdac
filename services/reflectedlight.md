# Reflected light

    identifier: 0x126c4cb2
    extends: _sensor
    tags: imaging

A sensor that detects light and dark surfaces, commonly used for line following robots.

## Registers

    ro brightness: u0.16 / @ reading

Reports the reflected brightness. It may be a digital value or, for some sensor, analog value.

    enum Variant: u8 {
        InfraredDigital = 1,
        InfraredAnalog = 2
    }
    const variant?: Variant @ variant

Type of physical sensor used

## Events

    event dark @ inactive {}

The sensor detected a transition from light to dark

    event light @ active {}

The sensor detected a transition from dark to light
