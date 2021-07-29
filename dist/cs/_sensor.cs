namespace Jacdac {
    public static class SensorConstants
    {
    // Service: Sensor
    }
    public enum SensorReg {
        /**
         * Read-write # uint8_t. Asks device to stream a given number of samples
         * (clients will typically write `255` to this register every second or so, while streaming is required).
         *
         * ```
         * const [streamingSamples] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        StreamingSamples = 0x3,

        /**
         * Read-write ms uint32_t. Period between packets of data when streaming in milliseconds.
         *
         * ```
         * const [streamingInterval] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        StreamingInterval = 0x4,

        /**
         * Constant ms uint32_t. Preferred default streaming interval for sensor in milliseconds.
         *
         * ```
         * const [streamingPreferredInterval] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        StreamingPreferredInterval = 0x102,
    }

}
