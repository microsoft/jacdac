namespace Jacdac {
    public static class WeightScaleConstants
    {
    // Service: Weight Scale
        public const uint ServiceClass = 0x1f4d5040;
    }

    public enum WeightScaleVariant { // uint8_t
        Body = 0x1,
        Food = 0x2,
        Jewelry = 0x3,
    }

    public enum WeightScaleReg {
        /**
         * Read-only kg u16.16 (uint32_t). The reported weight.
         *
         * ```
         * const [weight] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        Weight = 0x101,

        /**
         * Read-only kg u16.16 (uint32_t). The estimate error on the reported reading.
         *
         * ```
         * const [weightError] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        WeightError = 0x106,

        /**
         * Read-write kg u16.16 (uint32_t). Calibrated zero offset error on the scale, i.e. the measured weight when nothing is on the scale.
         * You do not need to subtract that from the reading, it has already been done.
         *
         * ```
         * const [zeroOffset] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        ZeroOffset = 0x80,

        /**
         * Read-write u16.16 (uint32_t). Calibrated gain on the weight scale error.
         *
         * ```
         * const [gain] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        Gain = 0x81,

        /**
         * Constant kg u16.16 (uint32_t). Maximum supported weight on the scale.
         *
         * ```
         * const [maxWeight] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        MaxWeight = 0x105,

        /**
         * Constant kg u16.16 (uint32_t). Minimum recommend weight on the scale.
         *
         * ```
         * const [minWeight] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        MinWeight = 0x104,

        /**
         * Constant kg u16.16 (uint32_t). Smallest, yet distinguishable change in reading.
         *
         * ```
         * const [weightResolution] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        WeightResolution = 0x108,

        /**
         * Constant Variant (uint8_t). The type of physical scale
         *
         * ```
         * const [variant] = jdunpack<[WeightScaleVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

    public enum WeightScaleCmd {
        /**
         * No args. Call this command when there is nothing on the scale. If supported, the module should save the calibration data.
         */
        CalibrateZeroOffset = 0x80,

        /**
         * Argument: weight g u22.10 (uint32_t). Call this command with the weight of the thing on the scale.
         *
         * ```
         * const [weight] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        CalibrateGain = 0x81,
    }

}
