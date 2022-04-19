# Wind speed

A sensor that measures wind speed.

    identifier: 0x1b591bbf
    extends: _sensor
    tags: 8bit
    status: rc
    group: environment

## Registers

    ro wind_speed: u16.16 m/s { preferred_interval=60000 } @ reading

The velocity of the wind.

    ro wind_speed_error?: u16.16 m/s @ reading_error

Error on the reading

    const max_wind_speed?: u16.16 m/s @ max_reading

Maximum speed that can be measured by the sensor.
