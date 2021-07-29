namespace Jacdac {
    // Service: Control
    public const SRV_CONTROL = 0x0

    public enum ControlAnnounceFlags { // uint16_t
        RestartCounterSteady = 0xf,
        RestartCounter1 = 0x1,
        RestartCounter2 = 0x2,
        RestartCounter4 = 0x4,
        RestartCounter8 = 0x8,
        StatusLightNone = 0x0,
        StatusLightMono = 0x10,
        StatusLightRgbNoFade = 0x20,
        StatusLightRgbFade = 0x30,
        SupportsACK = 0x100,
        SupportsBroadcast = 0x200,
        SupportsFrames = 0x400,
        IsClient = 0x800,
    }

    public enum ControlCmd {
        /**
         * No args. The `restart_counter` is computed from the `flags & RestartCounterSteady`, starts at `0x1` and increments by one until it reaches `0xf`, then it stays at `0xf`.
         * If this number ever goes down, it indicates that the device restarted.
         * `service_class` indicates class identifier for each service index (service index `0` is always control, so it's
         * skipped in this enumeration).
         * `packet_count` indicates the number of packets sent by the current device since last announce,
         * including the current announce packet (it is always 0 if this feature is not supported).
         * The command form can be used to induce report, which is otherwise broadcast every 500ms.
         */
        Services = 0x0,

        /**
         * report Services
         * ```
         * const [flags, packetCount, serviceClass] = jdunpack<[ControlAnnounceFlags, number, number[]]>(buf, "u16 u8 x[1] u32[]")
         * ```
         */

        /**
         * No args. Do nothing. Always ignored. Can be used to test ACKs.
         */
        Noop = 0x80,

        /**
         * No args. Blink the status LED (262ms on, 262ms off, four times, with the blue LED) or otherwise draw user's attention to device with no status light.
         * For devices with status light (this can be discovered in the announce flags), the client should
         * send the sequence of status light command to generate the identify animation.
         */
        Identify = 0x81,

        /**
         * No args. Reset device. ACK may or may not be sent.
         */
        Reset = 0x82,

        /**
         * The device will respond `num_responses` times, as fast as it can, setting the `counter` field in the report
         * to `start_counter`, then `start_counter + 1`, ..., and finally `start_counter + num_responses - 1`.
         * The `dummy_payload` is `size` bytes long and contains bytes `0, 1, 2, ...`.
         *
         * ```
         * const [numResponses, startCounter, size] = jdunpack<[number, number, number]>(buf, "u32 u32 u8")
         * ```
         */
        FloodPing = 0x83,

        /**
         * report FloodPing
         * ```
         * const [counter, dummyPayload] = jdunpack<[number, Uint8Array]>(buf, "u32 b")
         * ```
         */

        /**
         * Initiates a color transition of the status light from its current color to the one specified.
         * The transition will complete in about `512 / speed` frames
         * (each frame is currently 100ms, so speed of `51` is about 1 second and `26` 0.5 second).
         * As a special case, if speed is `0` the transition is immediate.
         * If MCU is not capable of executing transitions, it can consider `speed` to be always `0`.
         * If a monochrome LEDs is fitted, the average value of ``red``, ``green``, ``blue`` is used.
         * If intensity of a monochrome LED cannot be controlled, any value larger than `0` should be considered
         * on, and `0` (for all three channels) should be considered off.
         *
         * ```
         * const [toRed, toGreen, toBlue, speed] = jdunpack<[number, number, number, number]>(buf, "u8 u8 u8 u8")
         * ```
         */
        SetStatusLight = 0x84,
    }

    public enum ControlReg {
        /**
         * Read-write μs uint32_t. When set to value other than `0`, it asks the device to reset after specified number of microseconds.
         * This is typically used to implement watchdog functionality, where a brain device sets `reset_in` to
         * say 1.6s every 0.5s.
         *
         * ```
         * const [resetIn] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        ResetIn = 0x80,

        /**
         * Constant string (bytes). Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)
         *
         * ```
         * const [deviceDescription] = jdunpack<[string]>(buf, "s")
         * ```
         */
        DeviceDescription = 0x180,

        /**
         * Constant uint32_t. A numeric code for the string above; used to identify firmware images and devices.
         *
         * ```
         * const [firmwareIdentifier] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        FirmwareIdentifier = 0x181,

        /**
         * Constant uint32_t. Typically the same as `firmware_identifier` unless device was flashed by hand; the bootloader will respond to that code.
         *
         * ```
         * const [bootloaderFirmwareIdentifier] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        BootloaderFirmwareIdentifier = 0x184,

        /**
         * Constant string (bytes). A string describing firmware version; typically semver.
         *
         * ```
         * const [firmwareVersion] = jdunpack<[string]>(buf, "s")
         * ```
         */
        FirmwareVersion = 0x185,

        /**
         * Read-only °C int16_t. MCU temperature in degrees Celsius (approximate).
         *
         * ```
         * const [mcuTemperature] = jdunpack<[number]>(buf, "i16")
         * ```
         */
        McuTemperature = 0x182,

        /**
         * Read-only μs uint64_t. Number of microseconds since boot.
         *
         * ```
         * const [uptime] = jdunpack<[number]>(buf, "u64")
         * ```
         */
        Uptime = 0x186,

        /**
         * Constant string (bytes). Request the information web site for this device
         *
         * ```
         * const [deviceUrl] = jdunpack<[string]>(buf, "s")
         * ```
         */
        DeviceUrl = 0x187,

        /**
         * Constant string (bytes). URL pointing to device JSON specification.
         *
         * ```
         * const [deviceSpecificationUrl] = jdunpack<[string]>(buf, "s")
         * ```
         */
        DeviceSpecificationUrl = 0x189,

        /**
         * Constant string (bytes). URL with machine-readable metadata information about updating device firmware
         *
         * ```
         * const [firmwareUrl] = jdunpack<[string]>(buf, "s")
         * ```
         */
        FirmwareUrl = 0x188,
    }

}
