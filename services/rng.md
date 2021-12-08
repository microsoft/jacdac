# Random Number Generator

    identifier: 0x1789f0a2
    camel: rng
    status: rc

Generates random numbers using entropy sourced from physical processes.

This typically uses a cryptographical pseudo-random number generator (for example [Fortuna](<https://en.wikipedia.org/wiki/Fortuna_(PRNG)>)),
which is periodically re-seeded with entropy coming from some hardware source.

## Registers

    ro volatile random: bytes @ 0x180

A register that returns a 64 bytes random buffer on every request.
This never blocks for a long time. If you need additional random bytes, keep querying the register.

    enum Variant: u8 {
         Quantum = 1
         ADCNoise = 2
         WebCrypto = 3
    }
    const variant?: Variant @ variant

The type of algorithm/technique used to generate the number.
`Quantum` refers to dedicated hardware device generating random noise due to quantum effects.
`ADCNoise` is the noise from quick readings of analog-digital converter, which reads temperature of the MCU or some floating pin.
`WebCrypto` refers is used in simulators, where the source of randomness comes from an advanced operating system.
