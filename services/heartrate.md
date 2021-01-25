#  Heart Rate

A sensor approximating the heart rate. 

**JACDAC is not suitable for medical devices and should NOT be used in any kind of device to diagnose or treat any medical conditions.**

    identifer: 0x166c6dc4
    extends: _sensor

## Registers

    ro heart_rate: i8.8 bpm @ reading

The estimated heart rate. Negative value when the sensor cannot sense the rate.

    ro heart_rate_error?: u8.8 bpm @ error_reading

The estimated error on the reported sensor data.
