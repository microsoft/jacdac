namespace Jacdac {
    // Service: UV index
    public static class UvIndexConstants
    {
        public const uint ServiceClass = 0x1f6e0d90;
    }

    public enum UvIndexVariant { // uint8_t
        UVA_UVB = 0x1,
        Visible_IR = 0x2,
    }

    public enum UvIndexReg {
        /**
         * Read-only uv u16.16 (uint32_t). Ultraviolet index, typically refreshed every second.
         *
         * ```
         * const [uvIndex] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        UvIndex = 0x101,

        /**
         * Read-only uv u16.16 (uint32_t). Error on the UV measure.
         *
         * ```
         * const [uvIndexError] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        UvIndexError = 0x106,

        /**
         * Constant Variant (uint8_t). The type of physical sensor and capabilities.
         *
         * ```
         * const [variant] = jdunpack<[UvIndexVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
