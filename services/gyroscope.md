# Gyroscope

    identifier: 0x1d4aa3b3
    extends: _sensor

A 3-axis gyroscope.

## Registers

    ro rotation_rates @ reading {
        x: i12.4 °/s
        y: i12.4 °/s
        z: i12.4 °/s
    }

Indicates the current forces acting on accelerometer.

    ro rotation_rates_error: i12.4 @ reading_error

Error on the reading value.

    enum RotationRateRange: u8 {
        Slow = 1,
        Medium = 2,
        Fast = 2
    }
    rw rotation_rate_range?: RotationRateRange @ 0x80

Configures the range of range of rotation rates. Typically, ``slow`` is ``250 °/s``, ``medium``, is ``500 °/s`` and ``fast`` is ``2000 °/s``.