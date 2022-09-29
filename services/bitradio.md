# bit:radio

    identifier: 0x1ac986cf
    camel: bitRadio
    status: stable

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

    unique command send_string @ 0x80 {
        message: string
    }

Sends a string payload as a radio message, maximum 18 characters.

    unique command send_number @ 0x81 {
        value: f64
    }

Sends a double precision number payload as a radio message

    unique command send_value @ 0x82 {
        value: f64
        name: string
    }

Sends a double precision number and a name payload as a radio message

    unique command send_buffer @ 0x83 {
        data: bytes
    }

Sends a payload of bytes as a radio message

    report string_received @ 0x90 {
        time: u32 ms
        device_serial_number: u32
        rssi: i8 dB
        padding: u8[1]
        message: string
    }

Raised when a string packet is received

    packed report number_received @ 0x91 {
        time: u32 ms
        device_serial_number: u32
        rssi: i8 dB
        padding: u8[3]
        value: f64
        name: string
    }

Raised when a number packet is received

    report buffer_received @ 0x92 {
        time: u32 ms
        device_serial_number: u32
        rssi: i8 dB
        padding: u8[1]
        data: bytes
    }

Raised when a buffer packet is received
