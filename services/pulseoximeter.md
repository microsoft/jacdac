#  Pulse Oximeter

A sensor approximating the oxygen level. 

**JACDAC is not suitable for medical devices and should NOT be used in any kind of device to diagnose or treat any medical conditions.**

    identifier: 0x14ad1a5d
    extends: _sensor
## Registers

    ro oxygen: u16 / @ reading

The estimated oxygen level in blood.

    ro oxygen_error?: u16 / bpm @ reading_error

The estimated error on the reported sensor data.
