# Mono Light

    identifier: 0x1fb57453
    camel: monoLight

A controller for 1 or more LEDs connected in parallel.

## Animation steps

Animations are described using pairs of intensity and duration.
For example, the following animation
`(0, 10ms), (0.5, 5ms), (0.5, 10ms), (1, 5ms), (0, 7ms), (0, 0ms)`
will gradually rise the intensity `0 - 0.5` in 10ms,
then, it will keep it steady for at `0.5` for 5ms,
then it will rise it again `0.5 - 1` over 10ms,
drop `1 - 0` in 5ms,
and keep it at 0 for 7ms more.
Any entry with duration of 0ms is considered to be end-marker.

To get steady glow at `x`, use animation of `(x, 60000ms), (x, 0ms)` and keep `max_iterations` at `0xffff`.

## Registers

    rw brightness: u16 / @ intensity

Set the luminosity of the strip. The value is used to scale `start_intensity` in `steps` register.
At `0` the power to the strip is completely shut down.

    rw max_power = 100: u16 mA @ max_power

Limit the power drawn by the light-strip (and controller).

    const max_steps: u8 @ 0x180

Maximum number of steps allowed in animation definition. This determines the size of the `steps` register.

    rw steps @ 0x82 {
        repeats:
            start_intensity: u16 /
            duration: u16 ms
    }

The steps of current animation. Setting this also sets `current_iteration` to `0`.
Step with `duration == 0` is treated as an end marker.

    rw current_iteration: u16 @ 0x80

Currently excecuting iteration of animation. Can be set to `0` to restart current animation.
If `current_iteration > max_iterations`, then no animation is currently running.

    rw max_iterations = 0xffff: u16 @ 0x81

The animation will be repeated `max_iterations + 1` times.
