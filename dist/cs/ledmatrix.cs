namespace Jacdac {
    // Service: LED Matrix
    public static class LedMatrixConstants
    {
        public const uint ServiceClass = 0x110d154b;
    }
    public enum LedMatrixReg {
        /**
         * Read-write bytes. The state of the screen where pixel on/off state is
         * stored as a bit, column by column. The column should be byte aligned.
         *
         * ```
         * const [leds] = jdunpack<[Uint8Array]>(buf, "b")
         * ```
         */
        Leds = 0x2,

        /**
         * Read-write ratio u0.8 (uint8_t). Reads the general brightness of the LEDs. ``0`` when the screen is off.
         *
         * ```
         * const [brightness] = jdunpack<[number]>(buf, "u0.8")
         * ```
         */
        Brightness = 0x1,

        /**
         * Constant # uint16_t. Number of rows on the screen
         *
         * ```
         * const [rows] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        Rows = 0x181,

        /**
         * Constant # uint16_t. Number of columns on the screen
         *
         * ```
         * const [columns] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        Columns = 0x182,
    }

}
