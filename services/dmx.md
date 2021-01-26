#  DMX

A service that communicates using DMX512-A protocol. More at https://en.wikipedia.org/wiki/DMX512.

    identifier: 0x11cf8c05
    camel: dmx

A DMX universe contains 512 channels stored as bytes. This is too large to expose as a single register. 
Are pipes the way to go?

## Registers

    rw enabled?: bool @ 0x80

Determines if the DMX bridge is active

    rw terminate?: bool @ 0x80

If available, terminate the DMX circuit.

## Commands

    command send @ 0x80 {
        packet: pipe
    }
    pipe report packet {
        channels: bytes
    }

Send a DMX packet, up to 512bytes long.
