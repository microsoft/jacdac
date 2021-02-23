# Magnetometer

    identifier: 0x13029088
    extends: _sensor

A 3-axis magnetometer.

## Registers

    ro forces @ reading {
        x: i32 nT
        y: i32 nT
        z: i32 nT
    }

Indicates the current magnetic field on magnetometer.
For reference: `1 mgauss` is `100 nT` (and `1 gauss` is `100 000 nT`).

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
