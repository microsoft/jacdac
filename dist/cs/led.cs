namespace Jacdac {
    public static class LedConstants
    {
    // Service: LED
        public const uint ServiceClass = 0x1e3048f8;
    }

    public enum LedVariant { // uint8_t
        ThroughHole = 0x1,
        SMD = 0x2,
        Power = 0x3,
        Bead = 0x4,
    }

    public enum LedCmd {
        /**
         * This has the same semantics as `set_status_light` in the control service.
         *
         * ```
         * const [toRed, toGreen, toBlue, speed] = jdunpack<[number, number, number, number]>(buf, "u8 u8 u8 u8")
         * ```
         */
        Animate = 0x80,
    }

    public enum LedReg {
        /**
         * The current color of the LED.
         *
         * ```
         * const [red, green, blue] = jdunpack<[number, number, number]>(buf, "u8 u8 u8")
         * ```
         */
        Color = 0x180,

        /**
         * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
         *
         * ```
         * const [maxPower] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        MaxPower = 0x7,

        /**
         * Constant uint16_t. If known, specifies the number of LEDs in parallel on this device.
         *
         * ```
         * const [ledCount] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        LedCount = 0x183,

        /**
         * Constant nm uint16_t. If monochrome LED, specifies the wave length of the LED.
         *
         * ```
         * const [waveLength] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        WaveLength = 0x181,

        /**
         * Constant mcd uint16_t. The luminous intensity of the LED, at full value, in micro candella.
         *
         * ```
         * const [luminousIntensity] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        LuminousIntensity = 0x182,

        /**
         * Constant Variant (uint8_t). The physical type of LED.
         *
         * ```
         * const [variant] = jdunpack<[LedVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
