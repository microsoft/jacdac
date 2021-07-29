namespace Jacdac {
    // Service: Gyroscope
    public const SRV_GYROSCOPE = 0x1e1b06f2
    public enum GyroscopeReg {
        /**
         * Indicates the current forces acting on accelerometer.
         *
         * ```
         * const [x, y, z] = jdunpack<[number, number, number]>(buf, "i12.20 i12.20 i12.20")
         * ```
         */
        RotationRates = 0x101,

        /**
         * Read-only °/s i12.20 (int32_t). Error on the reading value.
         *
         * ```
         * const [rotationRatesError] = jdunpack<[number]>(buf, "i12.20")
         * ```
         */
        RotationRatesError = 0x106,

        /**
         * Read-write °/s i12.20 (int32_t). Configures the range of range of rotation rates.
         *
         * ```
         * const [maxRate] = jdunpack<[number]>(buf, "i12.20")
         * ```
         */
        MaxRate = 0x80,
    }

}
