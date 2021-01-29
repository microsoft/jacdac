# Sound player

A device that can play various sounds stored locally. This service is typically paired with a ``storage`` service for storing sounds.

    identifier: 0x1e3048f8

## Registers

    rw volume: u0.16 / @ intensity

Global volume of the output. ``0`` means completely off. This volume is mixed with each play volumes.

## Commands

    command play @ 0x80 {
        volume: u0.16 /
        name: string
    }

Starts playing a sounds with a specific volume.

    command sounds @ 0x81 {
        sounds_port: pipe
    }
    pipe report sounds_pipe {
       duration: u32 ms
       name: string
    }

Returns the list of sounds available to play.
