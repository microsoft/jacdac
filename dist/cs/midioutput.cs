namespace Jacdac {
    public static class MidiOutputConstants
    {
    // Service: MIDI output
        public const uint ServiceClass = 0x1a848cd7;
    }
    public enum MidiOutputReg {
        /**
         * Read-write bool (uint8_t). Opens or closes the port to the MIDI device
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,
    }

    public enum MidiOutputCmd {
        /**
         * No args. Clears any pending send data that has not yet been sent from the MIDIOutput's queue.
         */
        Clear = 0x80,

        /**
         * Argument: data bytes. Enqueues the message to be sent to the corresponding MIDI port
         *
         * ```
         * const [data] = jdunpack<[Uint8Array]>(buf, "b")
         * ```
         */
        Send = 0x81,
    }

}
