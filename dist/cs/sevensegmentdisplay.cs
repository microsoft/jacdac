namespace Jacdac {
    public static class SevenSegmentDisplayConstants
    {
    // Service: 7-segment display
        public const uint ServiceClass = 0x196158f7;
    }
    public enum SevenSegmentDisplayReg {
        /**
         * Read-write bytes. Each byte encodes the display status of a digit using,
         * where bit 0 encodes segment `A`, bit 1 encodes segments `B`, ..., bit 6 encodes segments `G`, and bit 7 encodes the decimal point (if present).
         * If incoming ``digits`` data is smaller than `digit_count`, the remaining digits will be cleared.
         * Thus, sending an empty ``digits`` payload clears the screen.
         *
         * ```
         * const [digits] = jdunpack<[Uint8Array]>(buf, "b")
         * ```
         */
        Digits = 0x2,

        /**
         * Read-write ratio u0.16 (uint16_t). Controls the brightness of the LEDs. ``0`` means off.
         *
         * ```
         * const [brightness] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Brightness = 0x1,

        /**
         * Read-write bool (uint8_t). Turn on or off the column LEDs (separating minutes from hours, etc.) in of the segment.
         * If the column LEDs is not supported, the value remains false.
         *
         * ```
         * const [doubleDots] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        DoubleDots = 0x80,

        /**
         * Constant uint8_t. The number of digits available on the display.
         *
         * ```
         * const [digitCount] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        DigitCount = 0x180,

        /**
         * Constant bool (uint8_t). True if decimal points are available (on all digits).
         *
         * ```
         * const [decimalPoint] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        DecimalPoint = 0x181,
    }

    public enum SevenSegmentDisplayCmd {
        /**
         * Argument: value f64 (uint64_t). Shows the number on the screen using the decimal dot if available.
         */
        SetNumber = 0x80,

        /**
         * Argument: text string (bytes). Shows the text on the screen. The client may decide to scroll the text if too long.
         */
        SetText = 0x81,
    }

}
