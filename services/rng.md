# Random Number Generator

    identifier: 0x1789f0a2
    camel: rng

Generates random numbers using entropy sourced from physical processes.

This typically uses a cryptographical pseudo-random number generator (for example [Fortuna](https://en.wikipedia.org/wiki/Fortuna_(PRNG))),
which is periodically re-seeded with entropy coming from some hardware source.

## Commands

    command random @ 0x80 {
        length: u8 { absolute_max=128 }
    }
    report random {
        data: bytes
    }

A command that generates a random buffer with the given length.
This never blocks for a long time.

## Registers

    enum Variant: u32 {
         Quantum = 1
         ADCNoise = 2
         WebCrypto = 3
    }
    const variant?: Variant @ variant

The type of algorithm/technique used to generate the number.
`Quantum` refers to dedicated hardware device generating random noise due to quantum effects.
`ADCNoise` is the noise from quick readings of analog-digital converter, which reads temperature of the MCU or some floating pin.
`WebCrypto` refers is used in simulators, where the source of randomness comes from an advanced operating system.
