# bit:radio

    identifier: 0x1ac986cf
    camel: bitRadio

## Registers

    rw enabled: bool @ intensity

Turns on/off the radio antenna.

    rw group: u8 @ 0x80

Group used to filter packets

    rw transmission_power = 6: u8 { min_value=1, max_value=7 } @ 0x81

Antenna power to increase or decrease range.

## Commands

    command send @ 0x80 {
        data: bytes { max_bytes: 18 }
    }

Sends a payload of bytes as a radio message

## Events

    event packet @ 0x80 {
        time: u32 ms
        rssi: i16 db
        device_serial_number: u32
        data: bytes { maxBytes: 18 }
    }

Raised when a packet is received
