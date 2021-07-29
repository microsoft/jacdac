namespace Jacdac {
    // Service: LED Pixel
    public const SRV_LED_PIXEL = 0x126f00e0

    public enum LedPixelLightType { // uint8_t
        WS2812B_GRB = 0x0,
        APA102 = 0x10,
        SK9822 = 0x11,
    }


    public enum LedPixelVariant { // uint8_t
        Strip = 0x1,
        Ring = 0x2,
        Stick = 0x3,
        Jewel = 0x4,
        Matrix = 0x5,
    }

    public enum LedPixelReg {
        /**
         * Read-write ratio u0.8 (uint8_t). Set the luminosity of the strip.
         * At `0` the power to the strip is completely shut down.
         *
         * ```
         * const [brightness] = jdunpack<[number]>(buf, "u0.8")
         * ```
         */
        Brightness = 0x1,

        /**
         * Read-only ratio u0.8 (uint8_t). This is the luminosity actually applied to the strip.
         * May be lower than `brightness` if power-limited by the `max_power` register.
         * It will rise slowly (few seconds) back to `brightness` is limits are no longer required.
         *
         * ```
         * const [actualBrightness] = jdunpack<[number]>(buf, "u0.8")
         * ```
         */
        ActualBrightness = 0x180,

        /**
         * Read-write LightType (uint8_t). Specifies the type of light strip connected to controller.
         * Controllers which are sold with lights should default to the correct type
         * and could not allow change.
         *
         * ```
         * const [lightType] = jdunpack<[LedPixelLightType]>(buf, "u8")
         * ```
         */
        LightType = 0x80,

        /**
         * Read-write # uint16_t. Specifies the number of pixels in the strip.
         * Controllers which are sold with lights should default to the correct length
         * and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.
         *
         * ```
         * const [numPixels] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        NumPixels = 0x81,

        /**
         * Read-write # uint16_t. If the LED pixel strip is a matrix, specifies the number of columns. Otherwise, a square shape is assumed. Controllers which are sold with lights should default to the correct length
         * and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.
         *
         * ```
         * const [numColumns] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        NumColumns = 0x83,

        /**
         * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
         *
         * ```
         * const [maxPower] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        MaxPower = 0x7,

        /**
         * Constant # uint16_t. The maximum supported number of pixels.
         * All writes to `num_pixels` are clamped to `max_pixels`.
         *
         * ```
         * const [maxPixels] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        MaxPixels = 0x181,

        /**
         * Read-write # uint16_t. How many times to repeat the program passed in `run` command.
         * Should be set before the `run` command.
         * Setting to `0` means to repeat forever.
         *
         * ```
         * const [numRepeats] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        NumRepeats = 0x82,

        /**
         * Constant Variant (uint8_t). Specifies the shape of the light strip.
         *
         * ```
         * const [variant] = jdunpack<[LedPixelVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

    public enum LedPixelCmd {
        /**
         * Argument: program bytes. Run the given light "program". See service description for details.
         *
         * ```
         * const [program] = jdunpack<[Uint8Array]>(buf, "b")
         * ```
         */
        Run = 0x81,
    }

}
