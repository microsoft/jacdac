# LED Display

    identifier: 0x1609d4f0
    camel: ledDisplay
    group: light
    status: rc

A controller for small displays of individually controlled RGB LEDs.

## Light programs

Realistically, with 1 mbit Jacdac, we can transmit under 2k of data per animation frame (at 20fps).
If transmitting raw data that would be around 500 pixels, which is not enough for many
installations and it would completely clog the network.

Thus, this service handles displays with 64 or less LEDs.
Use the [LED strip service](/services/ledstrip) for longer light strips.

## Registers

    define max_pixels_length 64
    rw pixels: bytes @ value

For short LED strips, less than `max_pixels_length`, a buffer of 24bit RGB color entries for each LED.

    rw brightness = 0.05: u0.8 / @ intensity

Set the luminosity of the strip.
At `0` the power to the strip is completely shut down.

    ro actual_brightness: u0.8 / @ 0x180

This is the luminosity actually applied to the strip.
May be lower than `brightness` if power-limited by the `max_power` register.
It will rise slowly (few seconds) back to `brightness` is limits are no longer required.

    enum LightType : u8 {
        WS2812B_GRB = 0x00
        APA102 = 0x10
        SK9822 = 0x11
    }
    ro light_type: LightType @ 0x181

Specifies the type of light strip connected to controller.
Controllers which are sold with lights should default to the correct type
and could not allow change.

    ro num_pixels: u16 # @ 0x182

Specifies the number of pixels in the strip.
Controllers which are sold with lights should default to the correct length
and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.

    ro num_columns?: u16 # @ 0x183

If the LED pixel strip is a matrix, specifies the number of columns. Otherwise, a square shape is assumed. Controllers which are sold with lights should default to the correct length
and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.

    rw max_power = 200: u16 mA @ max_power

Limit the power drawn by the light-strip (and controller).

    enum Variant: u8 {
        Strip = 1,
        Ring = 2,
        Stick = 3,
        Jewel = 4,
        Matrix = 5
    }
    const variant?: Variant @ variant

Specifies the shape of the light strip.
