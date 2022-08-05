# LED Strip

    identifier: 0x126f00e0
    camel: ledStrip
    tags: C
    group: light
    status: rc

A controller for strips of individually controlled RGB LEDs.

## Light programs

With 1 mbit Jacdac, we can transmit under 2k of data per animation frame (at 20fps).
If transmitting raw data that would be around 500 pixels, which is not enough for many
installations and it would completely clog the network.

Thus, light service defines a domain-specific language for describing light animations
and efficiently transmitting them over wire. For short LED displays, less than 64 LEDs, 
you can also use the [LED service](/services/led).

Light commands are not Jacdac commands.
Light commands are efficiently encoded as sequences of bytes and typically sent as payload
of `run` command.

Definitions:

-   `P` - position in the strip
-   `R` - number of repetitions of the command
-   `N` - number of pixels affected by the command
-   `C` - single color designation
-   `C+` - sequence of color designations

Update modes:

-   `0` - replace
-   `1` - add RGB
-   `2` - subtract RGB
-   `3` - multiply RGB (by c/128); each pixel value will change by at least 1

Program commands:

-   `0xD0: setall C+` - set all pixels in current range to given color pattern
-   `0xD1: fade C+` - set pixels in current range to colors between colors in sequence
-   `0xD2: fadehsv C+` - similar to `fade()`, but colors are specified and faded in HSV
-   `0xD3: rotfwd K` - rotate (shift) pixels by `K` positions away from the connector
-   `0xD4: rotback K` - same, but towards the connector
-   `0xD5: show M=50` - send buffer to strip and wait `M` milliseconds
-   `0xD6: range P=0 N=length W=1 S=0` - range from pixel `P`, `N` pixels long (currently unsupported: every `W` pixels skip `S` pixels)
-   `0xD7: mode K=0` - set update mode
-   `0xD8: tmpmode K=0` - set update mode for next command only
-   `0xCF: setone P C` - set one pixel at `P` (in current range) to given color
-   `mult V` - macro to multiply current range by given value (float)

A number `k` is encoded as follows:

-   `0 <= k < 128` -> `k`
-   `128 <= k < 16383` -> `0x80 | (k >> 8), k & 0xff`
-   bigger and negative numbers are not supported

Thus, bytes `0xC0-0xFF` are free to use for commands.

Formats:

-   `0xC1, R, G, B` - single color parameter
-   `0xC2, R0, G0, B0, R1, G1, B1` - two color parameter
-   `0xC3, R0, G0, B0, R1, G1, B1, R2, G2, B2` - three color parameter
-   `0xC0, N, R0, G0, B0, ..., R(N-1), G(N-1), B(N-1)` - `N` color parameter
-   `0xCF, <number>, R, G, B` - `set1` special format

Commands are encoded as command byte, followed by parameters in the order
from the command definition.

The `setone()` command has irregular encoding to save space - it is byte `0xCF` followed by encoded
number, and followed by 3 bytes of color.

## Registers

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
    rw light_type: LightType @ 0x80

Specifies the type of light strip connected to controller.
Controllers which are sold with lights should default to the correct type
and could not allow change.

    rw num_pixels = 15: u16 # @ 0x81

Specifies the number of pixels in the strip.
Controllers which are sold with lights should default to the correct length
and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.

    rw num_columns?: u16 # @ 0x83

If the LED pixel strip is a matrix, specifies the number of columns. Otherwise, a square shape is assumed. Controllers which are sold with lights should default to the correct length
and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.

    rw max_power = 200: u16 mA @ max_power

Limit the power drawn by the light-strip (and controller).

    const max_pixels: u16 # @ 0x181

The maximum supported number of pixels.
All writes to `num_pixels` are clamped to `max_pixels`.

    rw num_repeats = 1: u16 # @ 0x82

How many times to repeat the program passed in `run` command.
Should be set before the `run` command.
Setting to `0` means to repeat forever.

    enum Variant: u8 {
        Strip = 1,
        Ring = 2,
        Stick = 3,
        Jewel = 4,
        Matrix = 5
    }
    const variant?: Variant @ variant

Specifies the shape of the light strip.

## Commands

    unique command run @ 0x81 {
        program: bytes
    }

Run the given light "program". See service description for details.
