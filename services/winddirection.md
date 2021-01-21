# Wind direction

A sensor that measures wind direction.

    identifier: 0x186be92b
    extends: _sensor

## Registers

    ro wind_direction: u16 ° @ reading

The direction of the wind.

    ro wind_direction_offset?: i16 ° @ 0x80

Offset added to direction to account for sensor calibration.

    ro wind_direction_error?: u16 ° @ reading_error

Error on the wind direction reading
