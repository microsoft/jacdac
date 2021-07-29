namespace Jacdac {
    public static class MultitouchConstants
    {
    // Service: Multitouch
        public const uint ServiceClass = 0x18d55e2b;
    }
    public enum MultitouchReg {
        /**
         * Read-only. Capacitance of channels. The capacitance is continuously calibrated, and a value of `0` indicates
         * no touch, wheres a value of around `100` or more indicates touch.
         * It's best to ignore this (unless debugging), and use events.
         *
         * ```
         * const [capacitance] = jdunpack<[number[]]>(buf, "i32[]")
         * ```
         */
        Capacity = 0x101,
    }

    public enum MultitouchEvent {
        /**
         * Argument: channel uint32_t. Emitted when an input is touched.
         *
         * ```
         * const [channel] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        Touch = 0x1,

        /**
         * Argument: channel uint32_t. Emitted when an input is no longer touched.
         *
         * ```
         * const [channel] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        Release = 0x2,

        /**
         * Argument: channel uint32_t. Emitted when an input is briefly touched. TODO Not implemented.
         *
         * ```
         * const [channel] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        Tap = 0x80,

        /**
         * Argument: channel uint32_t. Emitted when an input is touched for longer than 500ms. TODO Not implemented.
         *
         * ```
         * const [channel] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        LongPress = 0x81,

        /**
         * Emitted when input channels are successively touched in order of increasing channel numbers.
         */
        SwipePos = 0x90,

        /**
         * Emitted when input channels are successively touched in order of decreasing channel numbers.
         */
        SwipeNeg = 0x91,
    }

}
