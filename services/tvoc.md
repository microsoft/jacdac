# Total Volatile organic compound

Measures equivalent Total Volatile Organic Compound levels.

    identifier: 0x12a5b597
    extends: _sensor
    camel: tvoc
    group: environment
    tags: 8bit
    status: stable

## Registers

    ro TVOC: u22.10 ppb { absolute_min=0, typical_max=1187 }  @ reading

Total volatile organic compound readings in parts per billion.

    ro TVOC_error?: u22.10 ppb @ reading_error

Error on the reading data

    const min_TVOC: u22.10 ppb @ min_reading

Minimum measurable value

    const max_TVOC: u22.10 ppb @ max_reading

Minimum measurable value.
