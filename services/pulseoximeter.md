#  Pulse Oximeter

A sensor approximating the oxygen level. 

**JACDAC is not suitable for medical devices and should NOT be used in any kind of device to diagnose or treat any medical conditions.**

    identifer: 0x14ad1a5d
    extends: _sensor

## Registers

    ro oxygen: i8.8 / @ reading

The estimated oxygen level in blood.

    ro oxygen_error?: u8.8 bpm @ error_reading

The estimated error on the reported sensor data.
