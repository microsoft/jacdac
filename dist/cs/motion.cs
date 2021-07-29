namespace Jacdac {
    public static class MotionConstants
    {
    // Service: Motion
        public const uint ServiceClass = 0x1179a749;
    }

    public enum MotionVariant { // uint8_t
        PIR = 0x1,
    }

    public enum MotionReg {
        /**
         * Read-only bool (uint8_t). Reports is movement is currently detected by the sensor.
         *
         * ```
         * const [moving] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Moving = 0x101,

        /**
         * Constant m u16.16 (uint32_t). Maximum distance where objects can be detected.
         *
         * ```
         * const [maxDistance] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        MaxDistance = 0x180,

        /**
         * Constant ° uint16_t. Opening of the field of view
         *
         * ```
         * const [angle] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        Angle = 0x181,

        /**
         * Constant Variant (uint8_t). Type of physical sensor
         *
         * ```
         * const [variant] = jdunpack<[MotionVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

    public enum MotionEvent {
        /**
         * A movement was detected.
         */
        Movement = 0x1,
    }

}
