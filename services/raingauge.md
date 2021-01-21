# Rain gauge

    identifier: 0x13734c95
    extends: _sensor

Measures the amount of liquid precipitation over an area in a predefined period of time.

## Registers

    ro precipitation: u16.16 mm @ reading

Total precipitation recorded so far.

    const precipitation_precipitation?: u16.16 mm @ reading_resolution

Typically the amount of rain needed for tipping the bucket.