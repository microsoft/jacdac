namespace Jacdac {
    public static class DmxConstants
    {
    // Service: DMX
        public const uint ServiceClass = 0x11cf8c05;
    }
    public enum DmxReg {
        /**
         * Read-write bool (uint8_t). Determines if the DMX bridge is active
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,
    }

    public enum DmxCmd {
        /**
         * Argument: channels bytes. Send a DMX packet, up to 236bytes long, including the start code.
         *
         * ```
         * const [channels] = jdunpack<[Uint8Array]>(buf, "b")
         * ```
         */
        Send = 0x80,
    }

}
