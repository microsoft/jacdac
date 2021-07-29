namespace Jacdac {
    public static class SoilMoistureConstants
    {
    // Service: Soil moisture
        public const uint ServiceClass = 0x1d4aa3b3;
    }

    public enum SoilMoistureVariant { // uint8_t
        Resistive = 0x1,
        Capacitive = 0x2,
    }

    public enum SoilMoistureReg {
        /**
         * Read-only ratio u0.16 (uint16_t). Indicates the wetness of the soil, from ``dry`` to ``wet``.
         *
         * ```
         * const [moisture] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Moisture = 0x101,

        /**
         * Constant Variant (uint8_t). Describe the type of physical sensor.
         *
         * ```
         * const [variant] = jdunpack<[SoilMoistureVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
