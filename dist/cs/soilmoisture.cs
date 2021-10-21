namespace Jacdac {
    // Service: Soil moisture
    public static class SoilMoistureConstants
    {
        public const uint ServiceClass = 0x1d4aa3b3;
    }

    public enum SoilMoistureVariant: byte { // uint8_t
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
         * Read-only ratio u0.16 (uint16_t). The error on the moisture reading.
         *
         * ```
         * const [moistureError] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        MoistureError = 0x106,

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
