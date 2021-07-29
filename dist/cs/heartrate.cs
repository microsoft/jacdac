namespace Jacdac {
    // Service: Heart Rate
    public static class HeartRateConstants
    {
        public const uint ServiceClass = 0x166c6dc4;
    }

    public enum HeartRateVariant { // uint8_t
        Finger = 0x1,
        Chest = 0x2,
        Wrist = 0x3,
        Pump = 0x4,
        WebCam = 0x5,
    }

    public enum HeartRateReg {
        /**
         * Read-only bpm u16.16 (uint32_t). The estimated heart rate.
         *
         * ```
         * const [heartRate] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        HeartRate = 0x101,

        /**
         * Read-only bpm u16.16 (uint32_t). The estimated error on the reported sensor data.
         *
         * ```
         * const [heartRateError] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        HeartRateError = 0x106,

        /**
         * Constant Variant (uint8_t). The type of physical sensor
         *
         * ```
         * const [variant] = jdunpack<[HeartRateVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
