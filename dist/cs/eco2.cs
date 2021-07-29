namespace Jacdac {
    // Service: Equivalent CO₂
    public static class ECO2Constants
    {
        public const uint ServiceClass = 0x169c9dc6;
    }

    public enum ECO2Variant { // uint8_t
        VOC = 0x1,
        NDIR = 0x2,
    }

    public enum ECO2Reg {
        /**
         * Read-only ppm u22.10 (uint32_t). Equivalent CO₂ (eCO₂) readings.
         *
         * ```
         * const [eCO2] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        ECO2 = 0x101,

        /**
         * Read-only ppm u22.10 (uint32_t). Error on the reading value.
         *
         * ```
         * const [eCO2Error] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        ECO2Error = 0x106,

        /**
         * Constant ppm u22.10 (uint32_t). Minimum measurable value
         *
         * ```
         * const [minECO2] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        MinECO2 = 0x104,

        /**
         * Constant ppm u22.10 (uint32_t). Minimum measurable value
         *
         * ```
         * const [maxECO2] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        MaxECO2 = 0x105,

        /**
         * Constant s uint32_t. Time required to achieve good sensor stability before measuring after long idle period.
         *
         * ```
         * const [conditioningPeriod] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        ConditioningPeriod = 0x180,

        /**
         * Constant Variant (uint8_t). Type of physical sensor and capabilities.
         *
         * ```
         * const [variant] = jdunpack<[ECO2Variant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
