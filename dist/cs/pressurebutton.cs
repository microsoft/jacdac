namespace Jacdac {
    public static class PressureButtonConstants
    {
    // Service: Pressure Button
        public const uint ServiceClass = 0x281740c3;
    }
    public enum PressureButtonReg {
        /**
         * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``up`` events.
         *
         * ```
         * const [threshold] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Threshold = 0x6,
    }

}
