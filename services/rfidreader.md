# RFID Reader

    identifier: 0x1247aec2

A reader of RFID tags.

## Registers

    ro card_uid: bytes @ reading

UID of the card being read by the reader. Note that the UID of a card can not be used as an unique identification for security related projects. To clear the card, simply remove the card from reader.

    rw enabled?: bool @ intensity

Turns on/off the RFID reader.

    rw antenna_gain?: u0.8 / @ 0x80

Tunes the antenna amplification gain.

## Commands

    command read_block @ 0x80 {
        record_index: number
    }
    report read_blocks {
        data: bytes[16]
    }

Requests to read a 16bytes record from the card.

## Event

    event card_available @ active {
        card_uid: bytes
    }

Raised when a new RFID tag is in range and the UID was read.

    event inactive @ inactive { }

Raised when a connection to a card was lost.
