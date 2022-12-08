# Air Pressure

    identifier: 0x1e117cea
    extends: _sensor
    group: environment
    tags: 8bit
    status: rc

A sensor measuring air pressure of outside environment.

## Registers

Default streaming interval is 1s.

    ro pressure: u22.10 hPa { typical_min = 150, typical_max = 1150, preferred_interval=1000 } @ reading

The air pressure.

    ro pressure_error?: u22.10 hPa @ reading_error

The real pressure is between `pressure - pressure_error` and `pressure + pressure_error`.

    const min_pressure?: u22.10 hPa @ min_reading

Lowest air pressure that can be reported.

    const max_pressure?: u22.10 hPa @ max_reading

Highest air pressure that can be reported.
