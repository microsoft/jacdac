namespace Jacdac {
    // Service: Dimmer
    public static class DimmerConstants
    {
        public const uint ServiceClass = 0x1fb02645;
    }

    public enum DimmerVariant: byte { // uint8_t
        Light = 0x1,
        Fan = 0x2,
        Pump = 0x3,
    }

    public enum DimmerReg {
        /**
         * Read-write ratio u0.16 (uint16_t). The intensity of the current. Set to ``0`` to turn off completely the current.
         *
         * ```
         * const [intensity] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Intensity = 0x1,

        /**
         * Constant Variant (uint8_t). The type of physical device
         *
         * ```
         * const [variant] = jdunpack<[DimmerVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
