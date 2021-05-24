# Dependable Sensor

    identifier: 0x2e6692c5

A mixin service that exposes the computed dependable fingerprint of a sensor. 

## Registers

    ro fingerprint: bytes @ 0x180
    
Reads the computed fingerprint of the sensor. When the module computes a new value for the fingerprint, it may also send a packet with the updated value.

    rw fingerprint_interval?: u32 ms @ 0x080

Specifies the interval between computing the fingerprint information.

