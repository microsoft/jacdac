namespace Jacdac {
    public static class ThermocoupleConstants
    {
    // Service: Thermocouple
        public const uint ServiceClass = 0x143ac061;
    }

    public enum ThermocoupleVariant { // uint8_t
        TypeK = 0x1,
        TypeJ = 0x2,
        TypeT = 0x3,
        TypeE = 0x4,
        TypeN = 0x5,
        TypeS = 0x6,
        TypeR = 0x7,
        TypeB = 0x8,
    }

    public enum ThermocoupleReg {
        /**
         * Read-only °C i22.10 (int32_t). The temperature.
         *
         * ```
         * const [temperature] = jdunpack<[number]>(buf, "i22.10")
         * ```
         */
        Temperature = 0x101,

        /**
         * Constant °C i22.10 (int32_t). Lowest temperature that can be reported.
         *
         * ```
         * const [minTemperature] = jdunpack<[number]>(buf, "i22.10")
         * ```
         */
        MinTemperature = 0x104,

        /**
         * Constant °C i22.10 (int32_t). Highest temperature that can be reported.
         *
         * ```
         * const [maxTemperature] = jdunpack<[number]>(buf, "i22.10")
         * ```
         */
        MaxTemperature = 0x105,

        /**
         * Read-only °C u22.10 (uint32_t). The real temperature is between `temperature - temperature_error` and `temperature + temperature_error`.
         *
         * ```
         * const [temperatureError] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        TemperatureError = 0x106,

        /**
         * Constant Variant (uint8_t). Specifies the type of thermometer.
         *
         * ```
         * const [variant] = jdunpack<[ThermocoupleVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
