# I2C

    identifier: 0x1c18ca43
    tags: io
    camel: I2C

Inter-Integrated Circuit (I2C, I²C, IIC) serial communication bus lets you communicate with
many sensors and actuators.

## Registers

    ro ok: bool @ 0x180

Indicates whether the I2C is working.

## Commands

    enum Status : u8 {
        OK = 0
        NAckAddr = 1
        NAckData = 2
        NoI2C = 3
    }
    unique command transaction @ 0x80 {
        address: u8
        num_read: u8 B
        write_buf: bytes
    }
    report {
        status: Status
        read_buf: bytes
    }

`address` is 7-bit.
`num_read` can be 0 if nothing needs to be read.
The `write_buf` includes the register address if required (first one or two bytes).
