namespace Jacdac {
    // Service: Sound Spectrum
    public static class SoundSpectrumConstants
    {
        public const uint ServiceClass = 0x157abc1e;
    }
    public enum SoundSpectrumReg {
        /**
         * Read-only bytes. The computed frequency data.
         *
         * ```
         * const [frequencyBins] = jdunpack<[Uint8Array]>(buf, "b")
         * ```
         */
        FrequencyBins = 0x101,

        /**
         * Read-write bool (uint8_t). Turns on/off the micropohone.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-write uint8_t. The power of 2 used as the size of the FFT to be used to determine the frequency domain.
         *
         * ```
         * const [fftPow2Size] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        FftPow2Size = 0x80,

        /**
         * Read-write dB int16_t. The minimum power value in the scaling range for the FFT analysis data
         *
         * ```
         * const [minDecibels] = jdunpack<[number]>(buf, "i16")
         * ```
         */
        MinDecibels = 0x81,

        /**
         * Read-write dB int16_t. The maximum power value in the scaling range for the FFT analysis data
         *
         * ```
         * const [maxDecibels] = jdunpack<[number]>(buf, "i16")
         * ```
         */
        MaxDecibels = 0x82,

        /**
         * Read-write ratio u0.8 (uint8_t). The averaging constant with the last analysis frame.
         * If ``0`` is set, there is no averaging done, whereas a value of ``1`` means "overlap the previous and current buffer quite a lot while computing the value".
         *
         * ```
         * const [smoothingTimeConstant] = jdunpack<[number]>(buf, "u0.8")
         * ```
         */
        SmoothingTimeConstant = 0x83,
    }

}
