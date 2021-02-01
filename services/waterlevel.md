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

    rw low_threshold: u0.16 / @ low_threshold

Threshold when reading data gets low and triggers a ``low``.

    rw high_threshold: u0.16 / @ high_threshold

Thresholds when reading data gets high and triggers a ``high`` event.

## Events

    event low @ low {}

Notifies that the low threshold has been crossed

    event high @ high {}

Notifies that the high threshold has been crossed