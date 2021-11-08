namespace Jacdac {
    // Service: Gyroscope
    public static class GyroscopeConstants
    {
        public const uint ServiceClass = 0x1e1b06f2;
    }
    public enum GyroscopeReg {
        /**
         * Indicates the current rates acting on gyroscope.
         *
         * ```
         * const [x, y, z] = jdunpack<[number, number, number]>(buf, "i12.20 i12.20 i12.20")
         * ```
         */
        RotationRates = 0x101,

        /**
         * Read-only °/s u12.20 (uint32_t). Error on the reading value.
         *
         * ```
         * const [rotationRatesError] = jdunpack<[number]>(buf, "u12.20")
         * ```
         */
        RotationRatesError = 0x106,

        /**
         * Read-write °/s u12.20 (uint32_t). Configures the range of rotation rates.
         * The value will be "rounded up" to one of `max_rates_supported`.
         *
         * ```
         * const [maxRate] = jdunpack<[number]>(buf, "u12.20")
         * ```
         */
        MaxRate = 0x8,

        /**
         * Constant. Lists values supported for writing `max_rate`.
         *
         * ```
         * const [maxRate] = jdunpack<[number[]]>(buf, "u12.20[]")
         * ```
         */
        MaxRatesSupported = 0x10a,
    }

}
