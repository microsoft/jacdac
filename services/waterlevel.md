# Water level

    identifier: 0x147b62ed
    extends: _sensor

A sensor that measures liquid/water level.

## Registers

    ro level: u0.16 / @ reading

The reported water level.

    enum Variant: u32 {
        Resistive = 1
        ContactPhotoElectric = 2
        NonContactPhotoElectric = 3
    }
    const variant?: Variant @ variant

The type of physical sensor.
