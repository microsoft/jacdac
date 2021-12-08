# Solenoid

    identifier: 0x171723ca
    tags: 8bit
    status: rc

A push-pull solenoid is a type of relay that pulls a coil when activated.

## Registers

    rw pulled: bool @ intensity

Indicates whether the solenoid is energized and pulled (on) or pushed (off).

    enum Variant: u8 {
        PushPull = 1,
        Valve = 2,
        Latch = 3
    }
    const variant?: Variant @ variant

Describes the type of solenoid used.
