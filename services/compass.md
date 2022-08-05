# Compass

A sensor that measures the heading.

    identifier: 0x15b7b9bf
    extends: _sensor
    status: rc

## Registers

    ro heading: u16.16 ° { absolute_min=0, absolute_max=359, preferred_interval=1000 } @ reading

The heading with respect to the magnetic north.

    rw enabled: bool @ intensity

Turn on or off the sensor. Turning on the sensor may start a calibration sequence.

    ro heading_error?: u16.16 ° @ reading_error

Error on the heading reading

## Commands

    command calibrate @ calibrate { }
    
Starts a calibration sequence for the compass.
