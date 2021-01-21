# Wind direction

A sensor that measures wind direction.

    identifier: 0x186be92b
    extends: _sensor

## Registers

    ro wind_direction: u16 ° @ reading

The direction of the wind.

    rw direction_offset?: i16 ° @ 0x80

Offset added to direction to account for sensor calibration.

    const direction_resolution?: u16 ° @ reading_resolution

Small change in direction that can be detected by the sensor.
