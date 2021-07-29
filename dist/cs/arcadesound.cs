namespace Jacdac {
    // Service: Arcade sound
    public static class ArcadeSoundConstants
    {
        public const uint ServiceClass = 0x1fc63606;
    }
    public enum ArcadeSoundCmd {
        /**
         * Argument: samples bytes. Play samples, which are single channel, signed 16-bit little endian values.
         *
         * ```
         * const [samples] = jdunpack<[Uint8Array]>(buf, "b")
         * ```
         */
        Play = 0x80,
    }

    public enum ArcadeSoundReg {
        /**
         * Read-write Hz u22.10 (uint32_t). Get or set playback sample rate (in samples per second).
         * If you set it, read it back, as the value may be rounded up or down.
         *
         * ```
         * const [sampleRate] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        SampleRate = 0x80,

        /**
         * Constant B uint32_t. The size of the internal audio buffer.
         *
         * ```
         * const [bufferSize] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        BufferSize = 0x180,

        /**
         * Read-only B uint32_t. How much data is still left in the buffer to play.
         * Clients should not send more data than `buffer_size - buffer_pending`,
         * but can keep the `buffer_pending` as low as they want to ensure low latency
         * of audio playback.
         *
         * ```
         * const [bufferPending] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        BufferPending = 0x181,
    }

}
