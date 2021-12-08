# Reflected light

    identifier: 0x126c4cb2
    extends: _sensor
    group: environment
    tags: 8bit
    status: rc

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
