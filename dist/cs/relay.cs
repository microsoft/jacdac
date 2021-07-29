namespace Jacdac {
    // Service: Relay
    public static class RelayConstants
    {
        public const uint ServiceClass = 0x183fe656;
    }

    public enum RelayVariant: byte { // uint8_t
        Electromechanical = 0x1,
        SolidState = 0x2,
        Reed = 0x3,
    }

    public enum RelayReg {
        /**
         * Read-write bool (uint8_t). Indicates whether the relay circuit is currently on (closed) or off (closed).
         *
         * ```
         * const [closed] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Closed = 0x1,

        /**
         * Constant Variant (uint8_t). Describes the type of relay used.
         *
         * ```
         * const [variant] = jdunpack<[RelayVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,

        /**
         * Constant mA uint32_t. Maximum switching current for a resistive load.
         *
         * ```
         * const [maxSwitchingCurrent] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        MaxSwitchingCurrent = 0x180,
    }

    public enum RelayEvent {
        /**
         * Emitted when relay goes from ``off`` to ``on`` state.
         */
        On = 0x1,

        /**
         * Emitted when relay goes from ``on`` to ``off`` state.
         */
        Off = 0x2,
    }

}
