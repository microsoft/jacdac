# bit:radio

    identifier: 0x1ac986cf
    camel: bitRadio

Support for sending and receiving packets using the [Bit Radio protocol](https://github.com/microsoft/pxt-common-packages/blob/master/libs/radio/docs/reference/radio.md), typically used between micro:bit devices.

## Registers

    rw enabled: bool @ intensity

Turns on/off the radio antenna.

    rw group: u8 @ 0x80

Group used to filter packets

    rw transmission_power = 6: u8 { absolute_min=1, absolute_max=7 } @ 0x81

Antenna power to increase or decrease range.

    rw frequency_band=7: u8 { absolute_max=83 } @ 0x82

Change the transmission and reception band of the radio to the given channel.

## Commands

    command send_string @ 0x80 {
        message: string { max_bytes: 18 }
    }

Sends a string payload as a radio message

    command send_number @ 0x81 {
        value: f64
        name: string { max_bytes: 12 }
    }

Sends a double precision number payload as a radio message

    command send_buffer @ 0x82 {
        data: bytes { max_bytes: 18 }
    }

Sends a payload of bytes as a radio message

## Events

    event string_received @ 0x80 {
        time: u32 ms
        device_serial_number: u32
        rssi: i8 dB
        padding: u8[1]
        message: string
    }

Raised when a string packet is received

    event number_received @ 0x81 {
        time: u32 ms
        device_serial_number: u32
        rssi: i8 dB
        padding: u8[3]
        value: f64
        name: string
    }

Raised when a number packet is received

    event buffer_received @ 0x82 {
        time: u32 ms
        device_serial_number: u32
        rssi: i8 dB
        padding: u8[1]
        data: bytes
    }

Raised when a buffer packet is received
