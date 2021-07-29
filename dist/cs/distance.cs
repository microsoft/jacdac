namespace Jacdac {
    // Service: Distance
    public static class DistanceConstants
    {
        public const uint ServiceClass = 0x141a6b8a;
    }

    public enum DistanceVariant: byte { // uint8_t
        Ultrasonic = 0x1,
        Infrared = 0x2,
        LiDAR = 0x3,
        Laser = 0x4,
    }

    public enum DistanceReg {
        /**
         * Read-only m u16.16 (uint32_t). Current distance from the object
         *
         * ```
         * const [distance] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        Distance = 0x101,

        /**
         * Constant m u16.16 (uint32_t). Minimum measurable distance
         *
         * ```
         * const [minRange] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        MinRange = 0x104,

        /**
         * Constant m u16.16 (uint32_t). Maximum measurable distance
         *
         * ```
         * const [maxRange] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        MaxRange = 0x105,

        /**
         * Constant Variant (uint8_t). Determines the type of sensor used.
         *
         * ```
         * const [variant] = jdunpack<[DistanceVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
