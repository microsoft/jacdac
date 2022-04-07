# Air Quality Index

    identifier: 0x14ac6ed6
    extends: _sensor
    camel: airQualityIndex
    group: environment
    status: experimental

The Air Quality Index is a measure of how clean or polluted air is. From min, good quality, to high, low quality.
The range of AQI may vary between countries (https://en.wikipedia.org/wiki/Air_quality_index).

## Registers

    ro aqi_index: u16.16 AQI { preferred_interval=60000, typical_max=500 } @ reading

Air quality index, typically refreshed every second.

    ro aqi_index_error?: u16.16 AQI @ reading_error

Error on the AQI measure.

    const min_aqi_index: u16.16 AQI @ min_reading

Minimum AQI reading, representing a good air quality. Typically 0.

    const max_aqi_index: u16.16 AQI @ max_reading

Maximum AQI reading, representing a very poor air quality.
