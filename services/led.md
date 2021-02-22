# LED

    identifier: 0x1e3048f8
    camel: led
    tags: light

A controller for 1 or more monochrome or RGB LEDs connected in parallel.

## Registers

    rw brightness: u0.16 / @ intensity

Set the luminosity of the strip. The value is used to scale `value` in `steps` register.
At `0` the power to the strip is completely shut down.

    rw animation @ 0x82 {
        repetitions: u16
        repeats:
            hue: u8
            saturation: u8
            value: u8
            duration: u8 8ms
    }

Animations are described using pairs of color description and duration, 
similarly to the `status_light` register in the control service.
`repetition` as ``0`` is considered infinite.
For monochrome LEDs, the hue and saturation are ignored.
A specification `(red, 80ms), (blue, 40ms), (blue, 0ms), (yellow, 80ms)`
means to start with red, cross-fade to blue over 80ms, stay blue for 40ms,
change to yellow, and cross-fade back to red in 80ms.

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
