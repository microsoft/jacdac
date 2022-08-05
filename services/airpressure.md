# Air Pressure

    identifier: 0x1e117cea
    extends: _sensor
    group: environment
    tags: 8bit
    status: rc

A sensor measuring air pressure of outside environment.

## Registers

Default streaming interval is 1s.

    ro pressure: u22.10 hPa { absolute_min = 300, absolute_max = 1100, typical_min = 940, typical_max = 1040, preferred_interval=60000 } @ reading

The air pressure.

    ro pressure_error?: u22.10 hPa @ reading_error

The real pressure is between `pressure - pressure_error` and `pressure + pressure_error`.
