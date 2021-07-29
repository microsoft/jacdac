namespace Jacdac {
    public static class SensorAggregatorConstants
    {
    // Service: Sensor Aggregator
        public const uint ServiceClass = 0x1d90e1c5;
    }

    public enum SensorAggregatorSampleType { // uint8_t
        U8 = 0x8,
        I8 = 0x88,
        U16 = 0x10,
        I16 = 0x90,
        U32 = 0x20,
        I32 = 0xa0,
    }

    public enum SensorAggregatorReg {
        /**
         * Set automatic input collection.
         * These settings are stored in flash.
         *
         * ```
         * const [samplingInterval, samplesInWindow, rest] = jdunpack<[number, number, ([Uint8Array, number, number, number, SensorAggregatorSampleType, number])[]]>(buf, "u16 u16 x[4] r: b[8] u32 u8 u8 u8 i8")
         * const [deviceId, serviceClass, serviceNum, sampleSize, sampleType, sampleShift] = rest[0]
         * ```
         */
        Inputs = 0x80,

        /**
         * Read-only uint32_t. Number of input samples collected so far.
         *
         * ```
         * const [numSamples] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        NumSamples = 0x180,

        /**
         * Read-only B uint8_t. Size of a single sample.
         *
         * ```
         * const [sampleSize] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        SampleSize = 0x181,

        /**
         * Read-write # uint32_t. When set to `N`, will stream `N` samples as `current_sample` reading.
         *
         * ```
         * const [streamingSamples] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        StreamingSamples = 0x81,

        /**
         * Read-only bytes. Last collected sample.
         *
         * ```
         * const [currentSample] = jdunpack<[Uint8Array]>(buf, "b")
         * ```
         */
        CurrentSample = 0x101,
    }

}
