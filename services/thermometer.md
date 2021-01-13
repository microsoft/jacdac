# Thermometer

    identifier: 0x1421bac7
    extends: _sensor

A thermometer measuring outside environment.

## Registers

Default streaming interval is 1s.

    ro temperature: u22.10 °C @ reading

The temperature.

    const min_temperature: u22.10 °C @ min_reading

Lowest temperature that can be reported.

    const max_temperature: u22.10 °C @ max_reading

Highest temperature that can be reported.

    ro temperature_error: u22.10 °C  @ reading_error

The real temperature is between `temperature - temperature_error` and `temperature + temperature_error`.

    enum Variant: u32 {
        Outdoor = 1,
        Indoor = 2,
        Body = 3,
        HeatProbe = 4,
    }
    const variant: Variant @ variant

Specifies the type of thermometer.
