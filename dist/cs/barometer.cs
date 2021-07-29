namespace Jacdac {
    public static class BarometerConstants
    {
    // Service: Barometer
        public const uint ServiceClass = 0x1e117cea;
    }
    public enum BarometerReg {
        /**
         * Read-only hPa u22.10 (uint32_t). The air pressure.
         *
         * ```
         * const [pressure] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        Pressure = 0x101,

        /**
         * Read-only hPa u22.10 (uint32_t). The real pressure is between `pressure - pressure_error` and `pressure + pressure_error`.
         *
         * ```
         * const [pressureError] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        PressureError = 0x106,
    }

}
