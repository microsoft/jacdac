namespace Jacdac {
    // Service: Common registers and commands
    public static class SystemConstants
    {
        public const uint AnnounceInterval = 0x1f4;
    }

    public enum SystemReadingThreshold: byte { // uint8_t
        Neutral = 0x1,
        Inactive = 0x2,
        Active = 0x3,
    }


    public enum SystemStatusCodes: ushort { // uint16_t
        Ready = 0x0,
        Initializing = 0x1,
        Calibrating = 0x2,
        Sleeping = 0x3,
        WaitingForInput = 0x4,
        CalibrationNeeded = 0x64,
    }

    public enum SystemCmd {
        /**
         * No args. Enumeration data for control service; service-specific advertisement data otherwise.
         * Control broadcasts it automatically every ``announce_interval``ms, but other service have to be queried to provide it.
         */
        Announce = 0x0,

        /**
         * No args. Registers number `N` is fetched by issuing command `0x1000 | N`.
         * The report format is the same as the format of the register.
         */
        GetRegister = 0x1000,

        /**
         * No args. Registers number `N` is set by issuing command `0x2000 | N`, with the format
         * the same as the format of the register.
         */
        SetRegister = 0x2000,

        /**
         * Event from sensor or a broadcast service.
         *
         * ```
         * const [eventId, eventArgument] = jdunpack<[number, number]>(buf, "u32 u32")
         * ```
         */
        Event = 0x1,

        /**
         * No args. Request to calibrate a sensor. The report indicates the calibration is done.
         */
        Calibrate = 0x2,
    }

    public enum SystemReg {
        /**
         * Read-write uint32_t. This is either binary on/off (0 or non-zero), or can be gradual (eg. brightness of an RGB LED strip).
         *
         * ```
         * const [intensity] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        Intensity = 0x1,

        /**
         * Read-write int32_t. The primary value of actuator (eg. servo pulse length, or motor duty cycle).
         *
         * ```
         * const [value] = jdunpack<[number]>(buf, "i32")
         * ```
         */
        Value = 0x2,

        /**
         * Constant int32_t. The lowest value that can be reported for the value register.
         *
         * ```
         * const [minValue] = jdunpack<[number]>(buf, "i32")
         * ```
         */
        MinValue = 0x110,

        /**
         * Constant int32_t. The highest value that can be reported for the value register.
         *
         * ```
         * const [maxValue] = jdunpack<[number]>(buf, "i32")
         * ```
         */
        MaxValue = 0x111,

        /**
         * Read-write mA uint16_t. Limit the power drawn by the service, in mA.
         *
         * ```
         * const [maxPower] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        MaxPower = 0x7,

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
         * Read-only int32_t. Read-only value of the sensor, also reported in streaming.
         *
         * ```
         * const [reading] = jdunpack<[number]>(buf, "i32")
         * ```
         */
        Reading = 0x101,

        /**
         * Read-write uint32_t. For sensors that support it, sets the range (sometimes also described `min`/`max_reading`).
         * Typically only a small set of values is supported.
         * Setting it to `X` will select the smallest possible range that is at least `X`,
         * or if it doesn't exist, the largest supported range.
         *
         * ```
         * const [readingRange] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        ReadingRange = 0x8,

        /**
         * Constant. Lists the values supported as `reading_range`.
         *
         * ```
         * const [range] = jdunpack<[number[]]>(buf, "u32[]")
         * ```
         */
        SupportedRanges = 0x10a,

        /**
         * Constant int32_t. The lowest value that can be reported by the sensor.
         *
         * ```
         * const [minReading] = jdunpack<[number]>(buf, "i32")
         * ```
         */
        MinReading = 0x104,

        /**
         * Constant int32_t. The highest value that can be reported by the sensor.
         *
         * ```
         * const [maxReading] = jdunpack<[number]>(buf, "i32")
         * ```
         */
        MaxReading = 0x105,

        /**
         * Read-only uint32_t. The real value of whatever is measured is between `reading - reading_error` and `reading + reading_error`. It should be computed from the internal state of the sensor. This register is often, but not always `const`. If the register value is modified,
         * send a report in the same frame of the ``reading`` report.
         *
         * ```
         * const [readingError] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        ReadingError = 0x106,

        /**
         * Constant uint32_t. Smallest, yet distinguishable change in reading.
         *
         * ```
         * const [readingResolution] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        ReadingResolution = 0x108,

        /**
         * Read-write int32_t. Threshold when reading data gets inactive and triggers a ``inactive``.
         *
         * ```
         * const [inactiveThreshold] = jdunpack<[number]>(buf, "i32")
         * ```
         */
        InactiveThreshold = 0x5,

        /**
         * Read-write int32_t. Thresholds when reading data gets active and triggers a ``active`` event.
         *
         * ```
         * const [activeThreshold] = jdunpack<[number]>(buf, "i32")
         * ```
         */
        ActiveThreshold = 0x6,

        /**
         * Constant ms uint32_t. Preferred default streaming interval for sensor in milliseconds.
         *
         * ```
         * const [streamingPreferredInterval] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        StreamingPreferredInterval = 0x102,

        /**
         * Constant uint32_t. The hardware variant of the service.
         * For services which support this, there's an enum defining the meaning.
         *
         * ```
         * const [variant] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        Variant = 0x107,

        /**
         * Reports the current state or error status of the device. ``code`` is a standardized value from
         * the Jacdac status/error codes. ``vendor_code`` is any vendor specific error code describing the device
         * state. This report is typically not queried, when a device has an error, it will typically
         * add this report in frame along with the announce packet.
         *
         * ```
         * const [code, vendorCode] = jdunpack<[SystemStatusCodes, number]>(buf, "u16 u16")
         * ```
         */
        StatusCode = 0x103,

        /**
         * Constant string (bytes). A friendly name that describes the role of this service instance in the device.
         *
         * ```
         * const [instanceName] = jdunpack<[string]>(buf, "s")
         * ```
         */
        InstanceName = 0x109,
    }

    public enum SystemEvent {
        /**
         * Notifies that the service has been activated (eg. button pressed, network connected, etc.)
         */
        Active = 0x1,

        /**
         * Notifies that the service has been dis-activated.
         */
        Inactive = 0x2,

        /**
         * Notifies that the some state of the service changed.
         */
        Change = 0x3,

        /**
         * Notifies that the status code of the service changed.
         *
         * ```
         * const [code, vendorCode] = jdunpack<[SystemStatusCodes, number]>(buf, "u16 u16")
         * ```
         */
        StatusCodeChanged = 0x4,

        /**
         * Notifies that the threshold is back between ``low`` and ``high``.
         */
        Neutral = 0x7,
    }

}
