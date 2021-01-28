# Sound player

A device that can play various sounds stored locally. This service is typically paired with a ``storage`` service for storing sounds.

    identifier: 0x1e3048f8

## Registers

    rw volume: u16 / @ intensity

Global volume of the output. ``0`` means completely off. This volume is mixed with each play volumes.

    const supported_wav_format? @ 0x80 {
        stereo: bool
        bit: u8
        max_sample_rate: u16 Hz
    }

Reports the supported WAV file encoding information.

## Commands

    command play @ 0x80 {
        volume: u16 /
        name: string
    }

Starts playing a sounds with a specific volume.

    command sounds @ 0x81 {
        sounds_port: pipe
    }
    pipe report sounds_pipe {
       duration: u16 s
       name: string
    }

Returns the list of sounds available to play.
