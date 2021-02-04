# Random Number Generator

    identifier: 0x1789f0a2
    camel: rng

A service that generates random numbers using, where entropy is sourced from physical processes.

## Commands

    command random @ 0x80 {
        length: u8 { absolute_max=128 }
    }
    report random {
        data: bytes
    }

A command that generates a random buffer with the given length.
The response to this command is delayed when there isn't enough entropy available (similar to `/dev/random`).

    enum Variant: u32 {
         Hardware = 1
         WebCrypto = 2
    }
    const variant?: Variant @ variant

The type of algorithm/technique used to generate the number
