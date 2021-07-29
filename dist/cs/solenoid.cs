namespace Jacdac {
    // Service: Solenoid
    public static class SolenoidConstants
    {
        public const uint ServiceClass = 0x171723ca;
    }

    public enum SolenoidVariant { // uint8_t
        PushPull = 0x1,
        Valve = 0x2,
        Latch = 0x3,
    }

    public enum SolenoidReg {
        /**
         * Read-write bool (uint8_t). Indicates whether the solenoid is energized and pulled (on) or pushed (off).
         *
         * ```
         * const [pulled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Pulled = 0x1,

        /**
         * Constant Variant (uint8_t). Describes the type of solenoid used.
         *
         * ```
         * const [variant] = jdunpack<[SolenoidVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
