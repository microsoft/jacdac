namespace Jacdac {
    // Service: Total Volatile organic compound
    public static class TvocConstants
    {
        public const uint ServiceClass = 0x12a5b597;
    }
    public enum TvocReg {
        /**
         * Read-only ppb u22.10 (uint32_t). Total volatile organic compound readings in parts per billion.
         *
         * ```
         * const [tVOC] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        TVOC = 0x101,

        /**
         * Read-only ppb u22.10 (uint32_t). Error on the reading data
         *
         * ```
         * const [tVOCError] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        TVOCError = 0x106,

        /**
         * Constant ppb u22.10 (uint32_t). Minimum measurable value
         *
         * ```
         * const [minTVOC] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        MinTVOC = 0x104,

        /**
         * Constant ppb u22.10 (uint32_t). Minimum measurable value
         *
         * ```
         * const [maxTVOC] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        MaxTVOC = 0x105,

        /**
         * Constant s uint32_t. Time required to achieve good sensor stability before measuring after long idle period.
         *
         * ```
         * const [conditioningPeriod] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        ConditioningPeriod = 0x180,
    }

}
