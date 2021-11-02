namespace Jacdac {
    // Service: Braille display
    public static class BrailleDisplayConstants
    {
        public const uint ServiceClass = 0x13bfb7cc;
    }
    public enum BrailleDisplayReg {
        /**
         * Read-write bool (uint8_t). Determins if the braille display is active.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-write string (bytes). Braille patterns to show. Must be unicode characters between `0x2800` and `0x28ff`.
         *
         * ```
         * const [patterns] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Patterns = 0x2,

        /**
         * Constant # uint8_t. Gets the number of patterns that can be displayed.
         *
         * ```
         * const [length] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Length = 0x181,
    }

}
