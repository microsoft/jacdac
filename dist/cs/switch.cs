namespace Jacdac {
    // Service: Switch
    public static class SwitchConstants
    {
        public const uint ServiceClass = 0x1ad29402;
    }

    public enum SwitchVariant { // uint8_t
        Slide = 0x1,
        Tilt = 0x2,
        PushButton = 0x3,
        Tactile = 0x4,
        Toggle = 0x5,
        Proximity = 0x6,
        Magnetic = 0x7,
        FootPedal = 0x8,
    }

    public enum SwitchReg {
        /**
         * Read-only bool (uint8_t). Indicates whether the switch is currently active (on).
         *
         * ```
         * const [active] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Active = 0x101,

        /**
         * Constant Variant (uint8_t). Describes the type of switch used.
         *
         * ```
         * const [variant] = jdunpack<[SwitchVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,

        /**
         * Constant s u16.16 (uint32_t). Specifies the delay without activity to automatically turn off after turning on.
         * For example, some light switches in staircases have such a capability.
         *
         * ```
         * const [autoOffDelay] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        AutoOffDelay = 0x180,
    }

    public enum SwitchEvent {
        /**
         * Emitted when switch goes from ``off`` to ``on``.
         */
        On = 0x1,

        /**
         * Emitted when switch goes from ``on`` to ``off``.
         */
        Off = 0x2,
    }

}
