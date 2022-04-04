# Air Quality Index

    identifier: 0x14ac6ed6
    extends: _sensor
    camel: airQualityIndex
    group: environment
    tags: 8bit

The Air Quality Index is a measure of how clean or polluted air is.

## Registers

    ro aqi_index: u16 { preferred_interval=1000, typical_max=500 } @ reading

Air quality index, typically refreshed every second.

    ro aqi_index_error?: u16 @ reading_error

Error on the AQI measure.
