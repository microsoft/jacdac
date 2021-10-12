namespace Jacdac {
    // Service: CODAL Message Bus
    public static class CodalMessageBusConstants
    {
        public const uint ServiceClass = 0x121ff81d;
    }
    public enum CodalMessageBusCmd {
        /**
         * Send a message on the CODAL bus. If `source` is `0`, it is treated as wildcard.
         *
         * ```
         * const [source, value] = jdunpack<[number, number]>(buf, "u16 u16")
         * ```
         */
        Send = 0x80,
    }

    public enum CodalMessageBusEvent {
        /**
         * Raised by the server is triggered by the server. The filtering logic of which event to send over JACDAC is up to the server implementation.
         *
         * ```
         * const [source, value] = jdunpack<[number, number]>(buf, "u16 u16")
         * ```
         */
        Message = 0x80,
    }

}
