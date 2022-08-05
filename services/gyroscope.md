# Gyroscope

    identifier: 0x1e1b06f2
    extends: _sensor
    group: movement
    status: rc

A 3-axis gyroscope.

## Registers

    ro rotation_rates @ reading {
        x: i12.20 °/s
        y: i12.20 °/s
        z: i12.20 °/s
    }

Indicates the current rates acting on gyroscope.

    ro rotation_rates_error?: u12.20 °/s @ reading_error

Error on the reading value.

    rw max_rate?: u12.20 °/s @ reading_range

Configures the range of rotation rates.
The value will be "rounded up" to one of `max_rates_supported`.

    const max_rates_supported? @ supported_ranges {
    repeats:
        max_rate: u12.20 °/s
    }

Lists values supported for writing `max_rate`.
