#  Heart Rate

A sensor approximating the heart rate. 

    identifier: 0x166c6dc4
    extends: _sensor

**JACDAC is NOT suitable for medical devices and should NOT be used in any kind of device to diagnose or treat any medical conditions.**

## Registers

    ro heart_rate: u16.16 bpm @ reading

The estimated heart rate.

    ro heart_rate_error?: u16.16 bpm @ reading_error

The estimated error on the reported sensor data.

    enum Variant: u32 {
        Finger = 1
        Chest = 2
        Wrist = 3
        Pump = 4
        WebCam = 5
    }
    const variant?: Variant @ variant

The type of physical sensor
