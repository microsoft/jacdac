namespace Jacdac {
    // Service: Pressure Button
    public static class PressureButtonConstants
    {
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
