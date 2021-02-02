# RFID Reader

    identifier: 0x1247aec2
    extends: _sensor

A reader of RFID tags.

## Registers

    rw enabled?: bool @ intensity

Turns on/off the RFID reader.

## Event

    event tag @ 0x80 {
        content: string
    }

Raised when a new RFID tag is read.