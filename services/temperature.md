# Temperature

    identifier: 0x1421bac7
    extends: _sensor
    tags: C, 8bit
    group: environment
    status: rc

A thermometer measuring outside or inside environment.

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
        Outdoor = 1,
        Indoor = 2,
        Body = 3,
    }
    const variant?: Variant @ variant

Specifies the type of thermometer.
