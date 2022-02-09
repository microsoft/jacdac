#  DMX

    identifier: 0x11cf8c05
    camel: dmx
    status: experimental

A service that can send DMX512-A packets with limited size. This service is designed to allow tinkering with a few DMX devices, but only allows 235 channels. More about DMX at https://en.wikipedia.org/wiki/DMX512.

## Registers

    rw enabled: bool @ intensity

Determines if the DMX bridge is active.

## Commands

    unique command send @ 0x80 {
        channels: bytes
    }

Send a DMX packet, up to 236bytes long, including the start code.
