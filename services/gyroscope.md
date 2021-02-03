# Gyroscope

    identifier: 0x1e1b06f2
    extends: _sensor

A 3-axis gyroscope.

## Registers

    ro rotation_rates @ reading {
        x: i16.16 °/s
        y: i16.16 °/s
        z: i16.16 °/s
    }

Indicates the current forces acting on accelerometer.

    ro rotation_rates_error?: i16.16 °/s @ reading_error

Error on the reading value.

    rw max_rate?: i16.16 °/s @ 0x80

Configures the range of range of rotation rates.