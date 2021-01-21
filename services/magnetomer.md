# Magnetometer

    identifier: 0x13029088
    extends: _sensor
    camel: magneto

A 3-axis magnetometer.

## Registers

    ro forces @ reading {
        x: i16 nT
        y: i16 NT
        z: i16 nT
    }

Indicates the current magnetic field on magnetometer.

## Commands

    command calibrate @ calibrate

Forces a calibration sequence where the user/device
might have to rotate to be calibrated.
