# Random Number Generator

    identifier: 0x1789f0a2
    camel: rng

A service that generates random number using entropy sourced from physical processes.

## Commands

    command random @ 0x80 {
        length: u8 { absolute_max=128 }
    }
    report random {
        data: bytes
    }

A command that generates a random buffer with the given length.

    enum Variant: u32 {
         Quantum = 1
         ADCNoise = 2
         WebCrypto = 3
    }
    const variant?: Variant @ variant

The type of algorithm/technique used to generate the number.
