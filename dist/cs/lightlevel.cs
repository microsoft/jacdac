namespace Jacdac {
    // Service: Light level
    public static class LightLevelConstants
    {
        public const uint ServiceClass = 0x17dc9a1c;
    }

    public enum LightLevelVariant: byte { // uint8_t
        PhotoResistor = 0x1,
        LEDMatrix = 0x2,
        Ambient = 0x3,
    }

    public enum LightLevelReg {
        /**
         * Read-only ratio u0.16 (uint16_t). Detect light level
         *
         * ```
         * const [lightLevel] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        LightLevel = 0x101,

        /**
         * Constant Variant (uint8_t). The type of physical sensor.
         *
         * ```
         * const [variant] = jdunpack<[LightLevelVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
