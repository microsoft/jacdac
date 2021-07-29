namespace Jacdac {
    // Service: Reflected light
    public const SRV_REFLECTED_LIGHT = 0x126c4cb2

    public enum ReflectedLightVariant { // uint8_t
        InfraredDigital = 0x1,
        InfraredAnalog = 0x2,
    }

    public enum ReflectedLightReg {
        /**
         * Read-only ratio u0.16 (uint16_t). Reports the reflected brightness. It may be a digital value or, for some sensor, analog value.
         *
         * ```
         * const [brightness] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Brightness = 0x101,

        /**
         * Constant Variant (uint8_t). Type of physical sensor used
         *
         * ```
         * const [variant] = jdunpack<[ReflectedLightVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

    public enum ReflectedLightEvent {
        /**
         * The sensor detected a transition from light to dark
         */
        Dark = 0x2,

        /**
         * The sensor detected a transition from dark to light
         */
        Light = 0x1,
    }

}
