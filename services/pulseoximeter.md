# Pulse Oximeter

    identifier: 0x10bb4eb6
    extends: _sensor
    group: biometric
    tags: 8bit
    status: experimental

A sensor approximating the oxygen level.

**Jacdac is not suitable for medical devices and should NOT be used in any kind of device to diagnose or treat any medical conditions.**

## Registers

    ro oxygen: u8.8 % { typical_min=80, typical_max=100 } @ reading

The estimated oxygen level in blood.

    ro oxygen_error?: u8.8 % @ reading_error

The estimated error on the reported sensor data.
