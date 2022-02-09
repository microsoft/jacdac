# Arcade Sound

    identifier: 0x1fc63606
    tags: SPI

A sound playing device.

This is typically run over an SPI connection, not regular single-wire Jacdac.

## Commands

    command play @ 0x80 {
        samples: bytes
    }

Play samples, which are single channel, signed 16-bit little endian values.

## Registers

    rw sample_rate = 44100: u22.10 Hz @ 0x80

Get or set playback sample rate (in samples per second).
If you set it, read it back, as the value may be rounded up or down.

    const buffer_size: u32 B @ 0x180

The size of the internal audio buffer.

    ro buffer_pending: u32 B @ 0x181

How much data is still left in the buffer to play.
Clients should not send more data than `buffer_size - buffer_pending`,
but can keep the `buffer_pending` as low as they want to ensure low latency
of audio playback.
