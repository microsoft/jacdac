# Rain gauge

    identifier: 0x13734c95
    extends: _sensor
    group: environment
    tags: 8bit
    status: rc

Measures the amount of liquid precipitation over an area in a predefined period of time.

## Registers

    ro precipitation: u16.16 mm { preferred_interval=60000 } @ reading

Total precipitation recorded so far.

    const precipitation_precision?: u16.16 mm @ reading_resolution

Typically the amount of rain needed for tipping the bucket.
