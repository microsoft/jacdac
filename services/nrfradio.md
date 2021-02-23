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

    command send_string @ 0x80 {
        message: string { max_length: 18 }
    }

Sends a string payload as a radio message

    command send_number @ 0x80 {
        value: f64
        name: string { max_length: 12 }
    }

Sends a double precision number payload as a radio message

    command send_buffer @ 0x80 {
        data: bytes { max_bytes: 18 }
    }

Sends a payload of bytes as a radio message

## Events

    event string_received @ 0x80 {
        time: u32 ms
        rssi: i16 dB
        device_serial_number: u32
        message: string
    }

Raised when a string packet is received

    event number_received @ 0x81 {
        time: u32 ms
        rssi: i16 dB
        device_serial_number: u32
        value: f64
        name: string
    }

Raised when a number packet is received

    event buffer_received @ 0x82 {
        time: u32 ms
        rssi: i16 dB
        device_serial_number: u32
        data: bytes
    }

Raised when a buffer packet is received
