# Humidity

    identifier: 0x16c810b8
    extends: _sensor
    tags: C, 8bit
    group: environment
    status: stable

A sensor measuring humidity of outside environment.

## Registers

    ro humidity: u22.10 %RH { preferred_interval=5000 } @ reading

The relative humidity in percentage of full water saturation.

    ro humidity_error?: u22.10 %RH @ reading_error

The real humidity is between `humidity - humidity_error` and `humidity + humidity_error`.

    const min_humidity: u22.10 %RH @ min_reading

Lowest humidity that can be reported.

    const max_humidity: u22.10 %RH @ max_reading

Highest humidity that can be reported.
