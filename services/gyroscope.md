# Gyroscope

    identifier: 0x1e1b06f2
    extends: _sensor
    tags: movement

A 3-axis gyroscope.

## Registers

    ro rotation_rates @ reading {
        x: i12.20 °/s
        y: i12.20 °/s
        z: i12.20 °/s
    }

Indicates the current forces acting on accelerometer.

    ro rotation_rates_error?: i12.20 °/s @ reading_error

Error on the reading value.

    rw max_rate?: i12.20 °/s @ 0x80

Configures the range of range of rotation rates.