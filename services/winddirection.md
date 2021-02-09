# Wind direction

A sensor that measures wind direction.

    identifier: 0x186be92b
    extends: _sensor

## Registers

    ro wind_direction: u16 { absolute_min=0, absolute_max=359, preferred_interval=1000 } ° @ reading

The direction of the wind.

    ro wind_direction_error?: u16 ° @ reading_error

Error on the wind direction reading

    ro wind_direction_offset?: i16 ° @ 0x180

Offset added to direction to account for sensor calibration.
