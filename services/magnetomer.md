# Magnetometer

    identifier: 0x13029088
    extends: _sensor
    camel: magneto

A 3-axis magnetometer.

## Registers

    ro forces @ reading {
        x: i32 nT
        y: i32 nT
        z: i32 nT
    }

Indicates the current magnetic field on magnetometer.

    ro forces_error? @ reading_error {
        x: i32 nT
        y: i32 nT
        z: i32 nT
    }

Error on the readings.

## Commands

    command calibrate @ calibrate { }

Forces a calibration sequence where the user/device
might have to rotate to be calibrated.
