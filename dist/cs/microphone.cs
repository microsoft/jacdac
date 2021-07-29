namespace Jacdac {
    // Service: Microphone
    public const SRV_MICROPHONE = 0x113dac86
    public enum MicrophoneCmd {
        /**
         * The samples will be streamed back over the `samples` pipe.
         * If `num_samples` is `0`, streaming will only stop when the pipe is closed.
         * Otherwise the specified number of samples is streamed.
         * Samples are sent as `i16`.
         *
         * ```
         * const [samples, numSamples] = jdunpack<[Uint8Array, number]>(buf, "b[12] u32")
         * ```
         */
        Sample = 0x81,
    }

    public enum MicrophoneReg {
        /**
         * Read-write μs uint32_t. Get or set microphone sampling period.
         * Sampling rate is `1_000_000 / sampling_period Hz`.
         *
         * ```
         * const [samplingPeriod] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        SamplingPeriod = 0x80,
    }

}
