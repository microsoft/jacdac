namespace Jacdac {
    // Service: Logger
    public const SRV_LOGGER = 0x12dc1fca

    public enum LoggerPriority { // uint8_t
        Debug = 0x0,
        Log = 0x1,
        Warning = 0x2,
        Error = 0x3,
        Silent = 0x4,
    }

    public enum LoggerReg {
        /**
         * Read-write Priority (uint8_t). Messages with level lower than this won't be emitted. The default setting may vary.
         * Loggers should revert this to their default setting if the register has not been
         * updated in 3000ms, and also keep the lowest setting they have seen in the last 1500ms.
         * Thus, clients should write this register every 1000ms and ignore messages which are
         * too verbose for them.
         *
         * ```
         * const [minPriority] = jdunpack<[LoggerPriority]>(buf, "u8")
         * ```
         */
        MinPriority = 0x80,
    }

    public enum LoggerCmd {
        /**
         * Argument: message string (bytes). Report a message.
         *
         * ```
         * const [message] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Debug = 0x80,

        /**
         * Argument: message string (bytes). Report a message.
         *
         * ```
         * const [message] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Log = 0x81,

        /**
         * Argument: message string (bytes). Report a message.
         *
         * ```
         * const [message] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Warn = 0x82,

        /**
         * Argument: message string (bytes). Report a message.
         *
         * ```
         * const [message] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Error = 0x83,
    }

}
