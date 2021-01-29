# LED

    identifier: 0x1e3048f8
    camel: led

A controller for 1 or more monochrome or RGB LEDs connected in parallel.

## Registers

    rw brightness: u0.16 / @ intensity

Set the luminosity of the strip. The value is used to scale `start_intensity` in `steps` register.
At `0` the power to the strip is completely shut down.

    rw steps @ 0x82 {
        repeats:
            hue: u8
            saturation: u8
            value: u8
            duration: u8 8ms
    }

Animations are described using pairs of brightness value and duration, similarly to the `status_light` register in the control service. They repeat infinitely until another animation
is specified.

    rw max_power? = 100: u16 mA @ max_power

Limit the power drawn by the light-strip (and controller).

    const led_count?: u16 @ 0x82

If known, specifies the number of LEDs in parallel on this device.

    const wave_length?: u16 nm { typical_min=365, typical_max=885 } @ 0x83

If monochrome LED, specifies the wave length of the LED.

    const luminous_intensity?: u16 mcd { typical_min=10, typical_max=5000 } @ 0x84

The luminous intensity of the LED, in micro candella.

    enum Variant: u32 {
        ThroughHole = 1
        SMD = 2
        Power = 3
    }
    const variant?: Variant @ variant

The physical type of LED.