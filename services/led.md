# LED

    identifier: 0x1e3048f8
    camel: led
    group: light

A controller for 1 or more monochrome or RGB LEDs connected in parallel.

## Commands

    command animate @ 0x80 {
        to_red: u8
        to_green: u8
        to_blue: u8
        speed: u8
    }

Initiates a color transition from the current color.
For monochrome LEDs, the average value of ``red``, ``green``, ``blue`` is used.

## Registers

    ro color @ reading {
        red: u8
        green: u8
        blue: u8
    }

The current color of the LED.

    rw max_power? = 100: u16 mA @ max_power

Limit the power drawn by the light-strip (and controller).

    const led_count?: u16 @ 0x180

If known, specifies the number of LEDs in parallel on this device.

    const wave_length?: u16 nm { typical_min=365, typical_max=885 } @ 0x181

If monochrome LED, specifies the wave length of the LED.

    const luminous_intensity?: u16 mcd { typical_min=10, typical_max=5000 } @ 0x182

The luminous intensity of the LED, at full value, in micro candella.

    enum Variant: u8 {
        ThroughHole = 1
        SMD = 2
        Power = 3
        Bead = 4
    }
    const variant?: Variant @ variant

The physical type of LED.
