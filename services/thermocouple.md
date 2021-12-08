# Thermocouple

    identifier: 0x143ac061
    extends: _sensor
    group: environment
    tags: 8bit
    status: rc

A thermocouple using a heat probe to gather temperatures.

## Registers

    ro temperature: i22.10 °C { preferred_interval=1000 } @ reading

The temperature.

    const min_temperature: i22.10 °C @ min_reading

Lowest temperature that can be reported.

    const max_temperature: i22.10 °C @ max_reading

Highest temperature that can be reported.

    ro temperature_error?: u22.10 °C  @ reading_error

The real temperature is between `temperature - temperature_error` and `temperature + temperature_error`.

    enum Variant: u8 {
        TypeK = 1
        TypeJ = 2
        TypeT = 3
        TypeE = 4
        TypeN = 5
        TypeS = 6
        TypeR = 7
        TypeB = 8
    }
    const variant?: Variant @ variant

Specifies the type of thermometer.
