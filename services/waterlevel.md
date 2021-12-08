# Water level

    identifier: 0x147b62ed
    extends: _sensor
    tags: 8bit
    status: rc

A sensor that measures liquid/water level.

## Registers

    ro level: u0.16 / @ reading

The reported water level.

    ro level_error?: u0.16 / @ reading_error

The error rage on the current reading

    enum Variant: u8 {
        Resistive = 1
        ContactPhotoElectric = 2
        NonContactPhotoElectric = 3
    }
    const variant?: Variant @ variant

The type of physical sensor.
