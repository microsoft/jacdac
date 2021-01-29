# RGB LED

    identifier: 0x1e3048f8
    camel: led

A controller for 1 or more RGB LEDs connected in parallel.

## Animation steps

Animations are described using pairs of HSV and duration, similarly to the `status_light` register in the control service.

## Registers

    rw brightness: u0.16 / @ intensity

Set the luminosity of the strip. The value is used to scale `start_intensity` in `steps` register.
At `0` the power to the strip is completely shut down.

    rw max_power = 100: u16 mA @ max_power

Limit the power drawn by the light-strip (and controller).

    const max_steps: u8 @ 0x180

Maximum number of steps allowed in animation definition. This determines the size of the `steps` register.

    rw steps @ 0x82 {
        repeats:
            hue: u8
            saturation: u8
            value: u8
            padding: u8
            duration: u16
    }

The steps of current animation. Setting this also sets `current_iteration` to `0`.
Step with `duration == 0` is treated as an end marker.

    rw current_iteration: u16 @ 0x80

Currently excecuting iteration of animation. Can be set to `0` to restart current animation.
If `current_iteration > max_iterations`, then no animation is currently running.

    rw max_iterations = 0xffff: u16 @ 0x81

The animation will be repeated `max_iterations + 1` times.

    const led_count?: u16 @ 0x82

If known, specifies the number of LEDs in parallel on this device.
