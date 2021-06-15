# LoRa

A LoRa antenna controller

    identifier: 0x18c93ad1

## Registers

    ro packet @ reading {
        RSSI: u8 dBm
        SNR: u8 dB
        frequency_error: u16 Hz
        data: bytes
    }
    
Reads the current packet information

    rw enabled: bool @ intensity

Indicates if the LoRa antenna is enabled.

    rw frequency: u16 @ 0x80

Specifies the antenna frequency. Changing the frequency resets the antenna.

## Commands

    command read @ 0x80 {}
    report read {
        RSSI: u8
        SNR: u8
        frequency_error: u16
        data: bytes
    }
  
Pops the current packet and reads the next one in the receive queue.
     
    command send @ 0x81 {}
    report {
        data_port: pipe_port
    }
    pipe command data_port {
        data: bytes { maxBytes = 255 }
    }

Sends a packet via LoRa, up to 255 bytes.

    command idle @ 0x82 {}

Puts the radio in idle mode

    command sleep @ 0x83 {}

Puts the radio in sleep mode

## Events

    event received @ 0x80

Indicates that a packet was received

