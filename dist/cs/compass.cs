namespace Jacdac {
    public static class CompassConstants
    {
    // Service: Compass
        public const uint ServiceClass = 0x15b7b9bf;
    }
    public enum CompassReg {
        /**
         * Read-only ° u16.16 (uint32_t). The heading with respect to the magnetic north.
         *
         * ```
         * const [heading] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        Heading = 0x101,

        /**
         * Read-write bool (uint8_t). Turn on or off the sensor. Turning on the sensor may start a calibration sequence.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-only ° u16.16 (uint32_t). Error on the heading reading
         *
         * ```
         * const [headingError] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        HeadingError = 0x106,
    }

    public enum CompassCmd {
        /**
         * No args. Starts a calibration sequence for the compass.
         */
        Calibrate = 0x2,
    }

}
