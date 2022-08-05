# LED

    identifier: 0x1609d4f0
    camel: led
    group: light
    status: stable

A controller for small displays of individually controlled RGB LEDs.

This service handles displays with 64 or less LEDs.
Use the [LED strip service](/services/ledstrip) for longer light strips.

## Registers

    define max_pixels_length 64
    rw pixels: bytes @ value

A buffer of 24bit RGB color entries for each LED, in R, G, B order.
When writing, if the buffer is too short, the remaining pixels are set to `#000000`;
if the buffer is too long, the write may be ignored, or the additional pixels may be ignored.

    rw brightness = 0.05: u0.8 / @ intensity

Set the luminosity of the strip.
At `0` the power to the strip is completely shut down.

    ro actual_brightness: u0.8 / @ 0x180

This is the luminosity actually applied to the strip.
May be lower than `brightness` if power-limited by the `max_power` register.
It will rise slowly (few seconds) back to `brightness` is limits are no longer required.

    const num_pixels: u16 # @ 0x182

Specifies the number of pixels in the strip.

    const num_columns?: u16 # @ 0x183

If the LED pixel strip is a matrix, specifies the number of columns.

    rw max_power? = 200: u16 mA @ max_power

Limit the power drawn by the light-strip (and controller).

    const leds_per_pixel?: u16 # @ 0x184

If known, specifies the number of LEDs in parallel on this device.
The actual number of LEDs is `num_pixels * leds_per_pixel`.

    const wave_length?: u16 nm { typical_min=365, typical_max=885 } @ 0x185

If monochrome LED, specifies the wave length of the LED.
Register is missing for RGB LEDs.

    const luminous_intensity?: u16 mcd { typical_min=10, typical_max=5000 } @ 0x186

The luminous intensity of all the LEDs, at full brightness, in micro candella.

    enum Variant: u8 {
        Strip = 1,
        Ring = 2,
        Stick = 3,
        Jewel = 4,
        Matrix = 5
    }
    const variant?: Variant @ variant

Specifies the shape of the light strip.
