# Humidity

    identifier: 0x16c810b8
    extends: _sensor
    tags: environment

A sensor measuring humidity of outside environment.

## Registers

Default streaming interval is 1s.

    ro humidity: u22.10 %RH { typical_max = 100, preferred_interval=5000 } @ reading

The relative humidity in percentage of full water saturation.

    ro humidity_error: u22.10 %RH @ reading_error

The real humidity is between `humidity - humidity_error` and `humidity + humidity_error`.

    const min_humidity = 0: u22.10 °C @ min_reading

Lowest humidity that can be reported.

    const max_humidity = 100: u22.10 °C @ max_reading

Highest humidity that can be reported.
