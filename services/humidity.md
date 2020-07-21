# Humidity

    identifier: 0x16c810b8
    extends: _sensor

A sensor measuring humidity of outside environment.

## Registers

Default streaming interval is 1s.

    ro humidity: u22.10 %RH @ reading

The relative humidity in percentage of full water saturation.
