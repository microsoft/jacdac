# Magnetometer

    identifier: 0x13029088
    extends: _sensor
    camel: magneto

A 3-axis magnetometer.

## Registers

    ro forces @ reading {
        x: i16.16 F
        y: i16.16 F
        z: i16.16 F
    }

Indicates the current magnetic field on magnetometer.

## Commands

    command calibrate @ calibrate

Forces a calibration sequence where the user/device
might have to rotate to be calibrated.
