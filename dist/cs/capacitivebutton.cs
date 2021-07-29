namespace Jacdac {
    public static class CapacitiveButtonConstants
    {
    // Service: Capacitive Button
        public const uint ServiceClass = 0x2865adc9;
    }
    public enum CapacitiveButtonReg {
        /**
         * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``up`` events.
         *
         * ```
         * const [threshold] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Threshold = 0x6,
    }

    public enum CapacitiveButtonCmd {
        /**
         * No args. Request to calibrate the capactive. When calibration is requested, the device expects that no object is touching the button.
         * The report indicates the calibration is done.
         */
        Calibrate = 0x2,
    }

}
