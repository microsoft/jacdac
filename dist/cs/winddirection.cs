namespace Jacdac {
    // Service: Wind direction
    public const SRV_WIND_DIRECTION = 0x186be92b
    public enum WindDirectionReg {
        /**
         * Read-only ° uint16_t. The direction of the wind.
         *
         * ```
         * const [windDirection] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        WindDirection = 0x101,

        /**
         * Read-only ° uint16_t. Error on the wind direction reading
         *
         * ```
         * const [windDirectionError] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        WindDirectionError = 0x106,

        /**
         * Read-only ° int16_t. Offset added to direction to account for sensor calibration.
         *
         * ```
         * const [windDirectionOffset] = jdunpack<[number]>(buf, "i16")
         * ```
         */
        WindDirectionOffset = 0x180,
    }

}
