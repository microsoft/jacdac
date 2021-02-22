# MIDI output

    identifier: 0x1a848cd7
    camel: midiOutput
    tags: sound

A MIDI output device.

## Registers

    rw enabled: bool @ intensity

Opens or closes the port to the MIDI device

## Commands

    command clear @ 0x80 { }

Clears any pending send data that has not yet been sent from the MIDIOutput's queue.

    command send @ 0x81 {
        data: bytes
    }

Enqueues the message to be sent to the corresponding MIDI port
 