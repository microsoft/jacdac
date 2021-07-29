namespace Jacdac {
    // Service: Water level
    public static class WaterLevelConstants
    {
        public const uint ServiceClass = 0x147b62ed;
    }

    public enum WaterLevelVariant { // uint8_t
        Resistive = 0x1,
        ContactPhotoElectric = 0x2,
        NonContactPhotoElectric = 0x3,
    }

    public enum WaterLevelReg {
        /**
         * Read-only ratio u0.16 (uint16_t). The reported water level.
         *
         * ```
         * const [level] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Level = 0x101,

        /**
         * Constant Variant (uint8_t). The type of physical sensor.
         *
         * ```
         * const [variant] = jdunpack<[WaterLevelVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
