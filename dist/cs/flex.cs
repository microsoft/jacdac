namespace Jacdac {
    // Service: Flex sensor
    public static class FlexSensorConstants
    {
        public const uint ServiceClass = 0x1f47c6c6;
    }

    public enum FlexSensorVariant: byte { // uint8_t
        Linear22Inch = 0x1,
        Linear45Inch = 0x2,
    }

    public enum FlexSensorReg {
        /**
         * Read-only ratio u0.16 (uint16_t). The relative position of the slider.
         *
         * ```
         * const [bending] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Bending = 0x101,

        /**
         * Constant Variant (uint8_t). Specifies the physical layout of the flex sensor.
         *
         * ```
         * const [variant] = jdunpack<[FlexSensorVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
