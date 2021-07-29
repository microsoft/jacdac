namespace Jacdac {
    // Service: Accelerometer
    public static class AccelerometerConstants
    {
        public const uint ServiceClass = 0x1f140409;
    }
    public enum AccelerometerReg {
        /**
         * Indicates the current forces acting on accelerometer.
         *
         * ```
         * const [x, y, z] = jdunpack<[number, number, number]>(buf, "i12.20 i12.20 i12.20")
         * ```
         */
        Forces = 0x101,

        /**
         * Read-only g i12.20 (int32_t). Error on the reading value.
         *
         * ```
         * const [forcesError] = jdunpack<[number]>(buf, "i12.20")
         * ```
         */
        ForcesError = 0x106,

        /**
         * Read-write g i12.20 (int32_t). Configures the range forces detected.
         * Read-back after setting to get current value.
         *
         * ```
         * const [maxForce] = jdunpack<[number]>(buf, "i12.20")
         * ```
         */
        MaxForce = 0x80,
    }

    public enum AccelerometerEvent {
        /**
         * Emitted when accelerometer is tilted in the given direction.
         */
        TiltUp = 0x81,

        /**
         * Emitted when accelerometer is tilted in the given direction.
         */
        TiltDown = 0x82,

        /**
         * Emitted when accelerometer is tilted in the given direction.
         */
        TiltLeft = 0x83,

        /**
         * Emitted when accelerometer is tilted in the given direction.
         */
        TiltRight = 0x84,

        /**
         * Emitted when accelerometer is laying flat in the given direction.
         */
        FaceUp = 0x85,

        /**
         * Emitted when accelerometer is laying flat in the given direction.
         */
        FaceDown = 0x86,

        /**
         * Emitted when total force acting on accelerometer is much less than 1g.
         */
        Freefall = 0x87,

        /**
         * Emitted when forces change violently a few times.
         */
        Shake = 0x8b,

        /**
         * Emitted when force in any direction exceeds given threshold.
         */
        Force2g = 0x8c,

        /**
         * Emitted when force in any direction exceeds given threshold.
         */
        Force3g = 0x88,

        /**
         * Emitted when force in any direction exceeds given threshold.
         */
        Force6g = 0x89,

        /**
         * Emitted when force in any direction exceeds given threshold.
         */
        Force8g = 0x8a,
    }

}
