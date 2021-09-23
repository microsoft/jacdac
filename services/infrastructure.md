# Infrastructure

A service that tags a device as purely infrastructure device.

    identifier: 0x1e1589eb

A Jacdac user interface can ignore any device that hosts this service. 

## Registers

    enum Variant: u8 {
        Pipe = 1,
    }
    const variant?: Variant @ variant

Describes the type of infrastructure feature supported.