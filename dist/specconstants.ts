// Service: Common registers and commands

export enum SystemReadingThreshold { // uint8_t
    Neutral = 0x1,
    Low = 0x2,
    High = 0x3,
}


export enum SystemStatusCodes { // uint16_t
    Ready = 0x0,
    Initializing = 0x1,
    Calibrating = 0x2,
    Sleeping = 0x3,
    WaitingForInput = 0x4,
    CalibrationNeeded = 0x64,
}

export enum SystemCmd {
    /**
     * No args. Enumeration data for control service; service-specific advertisement data otherwise.
     * Control broadcasts it automatically every 500ms, but other service have to be queried to provide it.
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

export enum SystemReg {
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
     * Read-write mA uint16_t. Limit the power drawn by the service, in mA.
     *
     * ```
     * const [maxPower] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxPower = 0x7,

    /**
     * Read-write uint8_t. Asks device to stream a given number of samples
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
     * Read-write int32_t. Threshold when reading data gets low and triggers a ``low``.
     *
     * ```
     * const [lowThreshold] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    LowThreshold = 0x5,

    /**
     * Read-write int32_t. Thresholds when reading data gets high and triggers a ``high`` event.
     *
     * ```
     * const [highThreshold] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    HighThreshold = 0x6,

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
}

export enum SystemEvent {
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
     * Notifies that the low threshold has been crossed
     */
    Low = 0x5,

    /**
     * Notifies that the high threshold has been crossed
     */
    High = 0x6,

    /**
     * Notifies that the threshold is back between ``low`` and ``high``.
     */
    Neutral = 0x7,
}

// Service: Base service
export enum BaseReg {
    /**
     * Reports the current state or error status of the device. ``code`` is a standardized value from
     * the Jacdac status/error codes. ``vendor_code`` is any vendor specific error code describing the device
     * state. This report is typically not queried, when a device has an error, it will typically
     * add this report in frame along with the announce packet.
     *
     * ```
     * const [code, vendorCode] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    StatusCode = 0x103,
}

export enum BaseEvent {
    /**
     * Notifies that the status code of the service changed.
     *
     * ```
     * const [code, vendorCode] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    StatusCodeChanged = 0x4,
}

// Service: Sensor
export enum SensorReg {
    /**
     * Read-write uint8_t. Asks device to stream a given number of samples
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

// Service: Accelerometer
export const SRV_ACCELEROMETER = 0x1f140409
export enum AccelerometerReg {
    /**
     * Indicates the current forces acting on accelerometer.
     *
     * ```
     * const [x, y, z] = jdunpack<[number, number, number]>(buf, "i6.10 i6.10 i6.10")
     * ```
     */
    Forces = 0x101,
}

export enum AccelerometerEvent {
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
    Force_2g = 0x8c,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force_3g = 0x88,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force_6g = 0x89,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force_8g = 0x8a,
}

// Service: Analog Button
export const SRV_ANALOG_BUTTON = 0x1865adc9

export enum AnalogButtonVariant { // uint32_t
    Pressure = 0x1,
    Capacitive = 0x2,
}

export enum AnalogButtonReg {
    /**
     * Read-only ratio u0.16 (uint16_t). Indicates the current pressure (``force``) on the button.
     *
     * ```
     * const [pressure] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Pressure = 0x101,

    /**
     * Read-write ratio u0.16 (uint16_t). Indicates the lower threshold for ``inactive`` events.
     *
     * ```
     * const [inactiveThreshold] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    InactiveThreshold = 0x5,

    /**
     * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``active`` events.
     *
     * ```
     * const [activeThreshold] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    ActiveThreshold = 0x6,

    /**
     * Constant Variant (uint32_t). The type of physical button.
     *
     * ```
     * const [variant] = jdunpack<[AnalogButtonVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

export enum AnalogButtonEvent {
    /**
     * Emitted when button goes from inactive (pressure less than threshold) to active.
     */
    Active = 0x1,

    /**
     * Emitted when button goes from active (pressure higher than threshold) to inactive.
     */
    Inactive = 0x2,
}

// Service: Arcade Gamepad
export const SRV_ARCADE_GAMEPAD = 0x1deaa06e

export enum ArcadeGamepadButton { // uint8_t
    Left = 0x1,
    Up = 0x2,
    Right = 0x3,
    Down = 0x4,
    A = 0x5,
    B = 0x6,
    Menu = 0x7,
    Select = 0x8,
    Reset = 0x9,
    Exit = 0xa,
}

export enum ArcadeGamepadReg {
    /**
     * Indicates which buttons are currently active (pressed).
     * `pressure` should be `0xff` for digital buttons, and proportional for analog ones.
     *
     * ```
     * const [rest] = jdunpack<[([ArcadeGamepadButton, number])[]]>(buf, "r: u8 u0.8")
     * const [button, pressure] = rest[0]
     * ```
     */
    Buttons = 0x101,

    /**
     * Constant. Indicates number of players supported and which buttons are present on the controller.
     *
     * ```
     * const [button] = jdunpack<[ArcadeGamepadButton[]]>(buf, "u8[]")
     * ```
     */
    AvailableButtons = 0x180,
}

export enum ArcadeGamepadEvent {
    /**
     * Argument: button Button (uint8_t). Emitted when button goes from inactive to active.
     *
     * ```
     * const [button] = jdunpack<[ArcadeGamepadButton]>(buf, "u8")
     * ```
     */
    Down = 0x1,

    /**
     * Argument: button Button (uint8_t). Emitted when button goes from active to inactive.
     *
     * ```
     * const [button] = jdunpack<[ArcadeGamepadButton]>(buf, "u8")
     * ```
     */
    Up = 0x2,
}

// Service: Barometer
export const SRV_BAROMETER = 0x1e117cea
export enum BarometerReg {
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

// Service: Bootloader
export const SRV_BOOTLOADER = 0x1ffa9948

export enum BootloaderError { // uint32_t
    NoError = 0x0,
    PacketTooSmall = 0x1,
    OutOfFlashableRange = 0x2,
    InvalidPageOffset = 0x3,
    NotPageAligned = 0x4,
}

export enum BootloaderCmd {
    /**
     * No args. The `service_class` is always `0x1ffa9948`. The `firmware_identifier` identifies the kind of firmware
     * that "fits" this device.
     */
    Info = 0x0,

    /**
     * report Info
     * ```
     * const [serviceClass, pageSize, flashableSize, firmwareIdentifier] = jdunpack<[number, number, number, number]>(buf, "u32 u32 u32 u32")
     * ```
     */

    /**
     * Argument: session_id uint32_t. The flashing host should generate a random id, and use this command to set it.
     *
     * ```
     * const [sessionId] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    SetSession = 0x81,

    /**
     * report SetSession
     * ```
     * const [sessionId] = jdunpack<[number]>(buf, "u32")
     * ```
     */

    /**
     * Use to send flashing data. A physical page is split into `chunk_max + 1` chunks, where `chunk_no = 0 ... chunk_max`.
     * Each chunk is stored at `page_address + page_offset`. `page_address` has to be equal in all chunks,
     * and is included in response.
     * Only the last chunk causes writing to flash and elicits response.
     *
     * ```
     * const [pageAddress, pageOffset, chunkNo, chunkMax, sessionId, pageData] = jdunpack<[number, number, number, number, number, Uint8Array]>(buf, "u32 u16 u8 u8 u32 x[4] x[4] x[4] x[4] b[208]")
     * ```
     */
    PageData = 0x80,

    /**
     * report PageData
     * ```
     * const [sessionId, pageError, pageAddress] = jdunpack<[number, BootloaderError, number]>(buf, "u32 u32 u32")
     * ```
     */
}

// Service: Button
export const SRV_BUTTON = 0x1473a263
export enum ButtonReg {
    /**
     * Read-only bool (uint8_t). Indicates whether the button is currently active (pressed).
     *
     * ```
     * const [pressed] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Pressed = 0x101,
}

export enum ButtonEvent {
    /**
     * Emitted when button goes from inactive (`pressed == 0`) to active.
     */
    Down = 0x1,

    /**
     * Emitted when button goes from active (`pressed == 1`) to inactive.
     */
    Up = 0x2,

    /**
     * Emitted together with `up` when the press time was not longer than 500ms.
     */
    Click = 0x80,

    /**
     * Emitted together with `up` when the press time was more than 500ms.
     */
    LongClick = 0x81,
}

// Service: Buzzer
export const SRV_BUZZER = 0x1b57b1d7
export enum BuzzerReg {
    /**
     * Read-write ratio u0.8 (uint8_t). The volume (duty cycle) of the buzzer.
     *
     * ```
     * const [volume] = jdunpack<[number]>(buf, "u0.8")
     * ```
     */
    Volume = 0x1,
}

export enum BuzzerCmd {
    /**
     * Play a PWM tone with given period and duty for given duration.
     * The duty is scaled down with `volume` register.
     * To play tone at frequency `F` Hz and volume `V` (in `0..1`) you will want
     * to send `P = 1000000 / F` and `D = P * V / 2`.
     *
     * ```
     * const [period, duty, duration] = jdunpack<[number, number, number]>(buf, "u16 u16 u16")
     * ```
     */
    PlayTone = 0x80,
}

// Service: Character Screen
export const SRV_CHARACTER_SCREEN = 0x1f37c56a

export enum CharacterScreenVariant { // uint8_t
    LCD = 0x1,
    OLED = 0x2,
}


export enum CharacterScreenTextDirection { // uint8_t
    LeftToRight = 0x1,
    RightToLeft = 0x2,
}

export enum CharacterScreenReg {
    /**
     * Read-write string (bytes). Text to show. Use `\n` to break lines.
     *
     * ```
     * const [message] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Message = 0x2,

    /**
     * Constant Variant (uint8_t). Describes the type of character LED screen.
     *
     * ```
     * const [variant] = jdunpack<[CharacterScreenVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,

    /**
     * Read-write TextDirection (uint8_t). Specifies the RTL or LTR direction of the text.
     *
     * ```
     * const [textDirection] = jdunpack<[CharacterScreenTextDirection]>(buf, "u8")
     * ```
     */
    TextDirection = 0x82,

    /**
     * Constant uint8_t. Gets the number of rows.
     *
     * ```
     * const [rows] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Rows = 0x180,

    /**
     * Constant uint8_t. Gets the number of columns.
     *
     * ```
     * const [columns] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Columns = 0x181,
}

// Service: Color
export const SRV_COLOR = 0x1630d567
export enum ColorReg {
    /**
     * Detected color in the RGB color space.
     *
     * ```
     * const [red, green, blue] = jdunpack<[number, number, number]>(buf, "u0.16 u0.16 u0.16")
     * ```
     */
    Color = 0x101,
}

// Service: Control
export const SRV_CONTROL = 0x0

export enum ControlAnnounceFlags { // uint8_t
    SupportsACK = 0x1,
}

export enum ControlCmd {
    /**
     * No args. The `restart_counter` starts at `0x1` and increments by one until it reaches `0xf`, then it stays at `0xf`.
     * If this number ever goes down, it indicates that the device restarted.
     * The upper 4 bits of `restart_counter` are reserved.
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
     * const [restartCounter, flags, packetCount, serviceClass] = jdunpack<[number, ControlAnnounceFlags, number, number[]]>(buf, "u8 u8 u8 x[1] u32[]")
     * ```
     */

    /**
     * No args. Do nothing. Always ignored. Can be used to test ACKs.
     */
    Noop = 0x80,

    /**
     * No args. Blink an LED or otherwise draw user's attention.
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
}

export enum ControlReg {
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
     * Constant string (bytes). URL with machine-readable metadata information about updating device firmware
     *
     * ```
     * const [firmwareUrl] = jdunpack<[string]>(buf, "s")
     * ```
     */
    FirmwareUrl = 0x188,

    /**
     * Specifies a status light animation sequence on a colored or monochrome LED
     * using the [LED animation format](/spec/led-animation).
     * Typically, up to 8 steps (repeats) are supported.
     *
     * ```
     * const [rest] = jdunpack<[([number, number, number, number])[]]>(buf, "r: u8 u8 u8 u8")
     * const [hue, saturation, value, duration8] = rest[0]
     * ```
     */
    StatusLight = 0x81,
}

// Service: Distance
export const SRV_DISTANCE = 0x141a6b8a

export enum DistanceVariant { // uint32_t
    Ultrasonic = 0x1,
    Infrared = 0x2,
    LiDAR = 0x3,
    Laser = 0x4,
}

export enum DistanceReg {
    /**
     * Read-only m u16.16 (uint32_t). Current distance from the object
     *
     * ```
     * const [distance] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    Distance = 0x101,

    /**
     * Constant m u16.16 (uint32_t). Minimum measurable distance
     *
     * ```
     * const [minRange] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    MinRange = 0x104,

    /**
     * Constant m u16.16 (uint32_t). Maximum measurable distance
     *
     * ```
     * const [maxRange] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    MaxRange = 0x105,

    /**
     * Constant Variant (uint32_t). Determines the type of sensor used.
     *
     * ```
     * const [variant] = jdunpack<[DistanceVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

// Service: Equivalent CO₂
export const SRV_E_CO2 = 0x169c9dc6

export enum ECO2Variant { // uint8_t
    VOC = 0x1,
    NDIR = 0x2,
}

export enum ECO2Reg {
    /**
     * Read-only ppm u22.10 (uint32_t). Equivalent CO₂ (eCO₂) readings.
     *
     * ```
     * const [e_CO2] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    E_CO2 = 0x101,

    /**
     * Read-only ppm u22.10 (uint32_t). Error on the reading value.
     *
     * ```
     * const [e_CO2Error] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    E_CO2Error = 0x106,

    /**
     * Constant ppm u22.10 (uint32_t). Minimum measurable value
     *
     * ```
     * const [minE_CO2] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    MinE_CO2 = 0x104,

    /**
     * Constant ppm u22.10 (uint32_t). Minimum measurable value
     *
     * ```
     * const [maxE_CO2] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    MaxE_CO2 = 0x105,

    /**
     * Constant s uint32_t. Time required to achieve good sensor stability before measuring after long idle period.
     *
     * ```
     * const [conditioningPeriod] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    ConditioningPeriod = 0x180,

    /**
     * Constant Variant (uint8_t). Type of physical sensor and capabilities.
     *
     * ```
     * const [variant] = jdunpack<[ECO2Variant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Gyroscope
export const SRV_GYROSCOPE = 0x1e1b06f2
export enum GyroscopeReg {
    /**
     * Indicates the current forces acting on accelerometer.
     *
     * ```
     * const [x, y, z] = jdunpack<[number, number, number]>(buf, "i16.16 i16.16 i16.16")
     * ```
     */
    RotationRates = 0x101,

    /**
     * Read-only °/s i16.16 (int32_t). Error on the reading value.
     *
     * ```
     * const [rotationRatesError] = jdunpack<[number]>(buf, "i16.16")
     * ```
     */
    RotationRatesError = 0x106,

    /**
     * Read-write °/s i16.16 (int32_t). Configures the range of range of rotation rates.
     *
     * ```
     * const [maxRate] = jdunpack<[number]>(buf, "i16.16")
     * ```
     */
    MaxRate = 0x80,
}

// Service: Heart Rate
export const SRV_HEART_RATE = 0x166c6dc4

export enum HeartRateVariant { // uint32_t
    Finger = 0x1,
    Chest = 0x2,
    Wrist = 0x3,
    Pump = 0x4,
    WebCam = 0x5,
}

export enum HeartRateReg {
    /**
     * Read-only bpm u16.16 (uint32_t). The estimated heart rate.
     *
     * ```
     * const [heartRate] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    HeartRate = 0x101,

    /**
     * Read-only bpm u16.16 (uint32_t). The estimated error on the reported sensor data.
     *
     * ```
     * const [heartRateError] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    HeartRateError = 0x106,

    /**
     * Constant Variant (uint32_t). The type of physical sensor
     *
     * ```
     * const [variant] = jdunpack<[HeartRateVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

// Service: HID Keyboard
export const SRV_HID_KEYBOARD = 0x18b05b6a

export enum HidKeyboardModifiers { // uint8_t
    LeftControl = 0xe0,
    LeftShift = 0xe1,
    LeftAlt = 0xe2,
    LeftGUID = 0xe3,
    RightControl = 0xe4,
    RightShift = 0xe5,
    RightAlt = 0xe6,
    RightGUID = 0xe7,
}


export enum HidKeyboardAction { // uint8_t
    Press = 0x0,
    Up = 0x1,
    Down = 0x2,
}

export enum HidKeyboardCmd {
    /**
     * Presses a key or a sequence of keys down.
     *
     * ```
     * const [rest] = jdunpack<[([number, HidKeyboardModifiers, HidKeyboardAction])[]]>(buf, "r: u16 u8 u8")
     * const [selector, modifiers, action] = rest[0]
     * ```
     */
    Key = 0x80,

    /**
     * No args. Clears all pressed keys.
     */
    Clear = 0x81,
}

// Service: HID Mouse
export const SRV_HID_MOUSE = 0x1885dc1c

export enum HidMouseButton { // uint16_t
    Right = 0x1,
    Middle = 0x4,
    Left = 0x2,
}


export enum HidMouseButtonEvent { // uint8_t
    Up = 0x1,
    Down = 0x2,
    Click = 0x3,
    DoubleClick = 0x4,
}

export enum HidMouseCmd {
    /**
     * Sets the up/down state of one or more buttons.
     * A ``Click`` is the same as ``Down`` followed by ``Up`` after 100ms.
     * A ``DoubleClick`` is two clicks with ``150ms`` gap between them (that is, ``100ms`` first click, ``150ms`` gap, ``100ms`` second click).
     *
     * ```
     * const [buttons, event] = jdunpack<[HidMouseButton, HidMouseButtonEvent]>(buf, "u16 u8")
     * ```
     */
    SetButton = 0x80,

    /**
     * Moves the mouse by the distance specified.
     * If the time is positive, it specifies how long to make the move.
     *
     * ```
     * const [dx, dy, time] = jdunpack<[number, number, number]>(buf, "i16 i16 u16")
     * ```
     */
    Move = 0x81,

    /**
     * Turns the wheel up or down. Positive if scrolling up.
     * If the time is positive, it specifies how long to make the move.
     *
     * ```
     * const [dy, time] = jdunpack<[number, number]>(buf, "i16 u16")
     * ```
     */
    Wheel = 0x82,
}

// Service: Humidity
export const SRV_HUMIDITY = 0x16c810b8
export enum HumidityReg {
    /**
     * Read-only %RH u22.10 (uint32_t). The relative humidity in percentage of full water saturation.
     *
     * ```
     * const [humidity] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    Humidity = 0x101,

    /**
     * Read-only %RH u22.10 (uint32_t). The real humidity is between `humidity - humidity_error` and `humidity + humidity_error`.
     *
     * ```
     * const [humidityError] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    HumidityError = 0x106,
}

// Service: Illuminance
export const SRV_ILLUMINANCE = 0x1e6ecaf2
export enum IlluminanceReg {
    /**
     * Read-only lux u22.10 (uint32_t). The amount of illuminance, as lumens per square metre.
     *
     * ```
     * const [light] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    Light = 0x101,

    /**
     * Read-only lux u22.10 (uint32_t). Error on the reported sensor value.
     *
     * ```
     * const [lightError] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    LightError = 0x106,
}

// Service: Azure IoT Hub
export const SRV_IOT_HUB = 0x19ed364c
export enum IotHubCmd {
    /**
     * No args. Try connecting using currently set `connection_string`.
     * The service normally preiodically tries to connect automatically.
     */
    Connect = 0x80,

    /**
     * No args. Disconnect from current Hub if any.
     * This disables auto-connect behavior, until a `connect` command is issued.
     */
    Disconnect = 0x81,

    /**
     * Sends a short message in string format (it's typically JSON-encoded). Multiple properties can be attached.
     *
     * ```
     * const [msg, rest] = jdunpack<[string, ([string, string])[]]>(buf, "z r: z z")
     * const [propertyName, propertyValue] = rest[0]
     * ```
     */
    SendStringMsg = 0x82,

    /**
     * No args. Sends an arbitrary, possibly binary, message. The size is only limited by RAM on the module.
     */
    SendMsgExt = 0x83,

    /**
     * report SendMsgExt
     * ```
     * const [message] = jdunpack<[number]>(buf, "u16")
     * ```
     */

    /**
     * Argument: devicebound pipe (bytes). Subscribes for cloud to device messages, which will be sent over the specified pipe.
     *
     * ```
     * const [devicebound] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    Subscribe = 0x84,

    /**
     * Argument: twin_result pipe (bytes). Ask for current device digital twin.
     *
     * ```
     * const [twinResult] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    GetTwin = 0x85,

    /**
     * Argument: twin_updates pipe (bytes). Subscribe to updates to our twin.
     *
     * ```
     * const [twinUpdates] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    SubscribeTwin = 0x87,

    /**
     * No args. Start twin update.
     */
    PatchTwin = 0x86,

    /**
     * report PatchTwin
     * ```
     * const [patchPort] = jdunpack<[number]>(buf, "u16")
     * ```
     */

    /**
     * Argument: method_call pipe (bytes). Subscribe to direct method calls.
     *
     * ```
     * const [methodCall] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    SubscribeMethod = 0x88,

    /**
     * Respond to a direct method call (`request_id` comes from `subscribe_method` pipe).
     *
     * ```
     * const [status, requestId] = jdunpack<[number, string]>(buf, "u32 z")
     * ```
     */
    RespondToMethod = 0x89,

    /**
     * report RespondToMethod
     * ```
     * const [responseBody] = jdunpack<[number]>(buf, "u16")
     * ```
     */
}


/**
 * pipe_command Message
 * ```
 * const [body] = jdunpack<[Uint8Array]>(buf, "b")
 * ```
 */

/**
 * pipe_report Devicebound
 * ```
 * const [body] = jdunpack<[Uint8Array]>(buf, "b")
 * ```
 */

/**
 * pipe_report TwinJson
 * ```
 * const [json] = jdunpack<[Uint8Array]>(buf, "b")
 * ```
 */

/**
 * pipe_report TwinUpdateJson
 * ```
 * const [json] = jdunpack<[Uint8Array]>(buf, "b")
 * ```
 */

/**
 * pipe_command TwinPatchJson
 * ```
 * const [json] = jdunpack<[Uint8Array]>(buf, "b")
 * ```
 */

/**
 * pipe_report MethodCallBody
 * ```
 * const [json] = jdunpack<[Uint8Array]>(buf, "b")
 * ```
 */

/**
 * pipe_command MethodResponse
 * ```
 * const [json] = jdunpack<[Uint8Array]>(buf, "b")
 * ```
 */


export enum IotHubPipeCmd {
    /**
     * Set properties on the message. Can be repeated multiple times.
     *
     * ```
     * const [rest] = jdunpack<[([string, string])[]]>(buf, "r: z z")
     * const [propertyName, propertyValue] = rest[0]
     * ```
     */
    Properties = 0x1,

    /**
     * If there are any properties, this meta-report is send one or more times.
     * All properties of a given message are always sent before the body.
     *
     * ```
     * const [rest] = jdunpack<[([string, string])[]]>(buf, "r: z z")
     * const [propertyName, propertyValue] = rest[0]
     * ```
     */
    DeviceboundProperties = 0x1,

    /**
     * Argument: status_code uint32_t. This emitted if status is not 200.
     *
     * ```
     * const [statusCode] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    TwinError = 0x1,

    /**
     * This is sent after the last part of the `method_call_body`.
     *
     * ```
     * const [methodName, requestId] = jdunpack<[string, string]>(buf, "z z")
     * ```
     */
    MethodCall = 0x1,
}

export enum IotHubReg {
    /**
     * Read-only string (bytes). Returns `"ok"` when connected, and an error description otherwise.
     *
     * ```
     * const [connectionStatus] = jdunpack<[string]>(buf, "s")
     * ```
     */
    ConnectionStatus = 0x180,

    /**
     * Read-write string (bytes). Connection string typically looks something like
     * `HostName=my-iot-hub.azure-devices.net;DeviceId=my-dev-007;SharedAccessKey=xyz+base64key`.
     * You can get it in `Shared access policies -> iothubowner -> Connection string-primary key` in the Azure Portal.
     * This register is write-only.
     * You can use `hub_name` and `device_id` to check if connection string is set, but you cannot get the shared access key.
     *
     * ```
     * const [connectionString] = jdunpack<[string]>(buf, "s")
     * ```
     */
    ConnectionString = 0x80,

    /**
     * Read-only string (bytes). Something like `my-iot-hub.azure-devices.net`; empty string when `connection_string` is not set.
     *
     * ```
     * const [hubName] = jdunpack<[string]>(buf, "s")
     * ```
     */
    HubName = 0x181,

    /**
     * Read-only string (bytes). Something like `my-dev-007`; empty string when `connection_string` is not set.
     *
     * ```
     * const [deviceId] = jdunpack<[string]>(buf, "s")
     * ```
     */
    DeviceId = 0x182,
}

export enum IotHubEvent {
    /**
     * Emitted upon successful connection.
     */
    Connected = 0x80,

    /**
     * Argument: reason string (bytes). Emitted when connection was lost.
     *
     * ```
     * const [reason] = jdunpack<[string]>(buf, "s")
     * ```
     */
    ConnectionError = 0x81,

    /**
     * This event is emitted upon reception of a cloud to device message, that is a string
     * (doesn't contain NUL bytes) and fits in a single event packet.
     * For reliable reception, use the `subscribe` command above.
     *
     * ```
     * const [msg, rest] = jdunpack<[string, ([string, string])[]]>(buf, "z r: z z")
     * const [propertyName, propertyValue] = rest[0]
     * ```
     */
    DeviceboundStr = 0x82,
}

// Service: Joystick
export const SRV_JOYSTICK = 0x1acb1890

export enum JoystickVariant { // uint8_t
    Thumb = 0x1,
    ArcadeBall = 0x2,
    ArcadeStick = 0x3,
}

export enum JoystickReg {
    /**
     * The direction of the joystick measure in two direction.
     * If joystick is digital, then each direction will read as either `-0x8000`, `0x0`, or `0x7fff`.
     *
     * ```
     * const [x, y] = jdunpack<[number, number]>(buf, "i1.15 i1.15")
     * ```
     */
    Direction = 0x101,

    /**
     * Constant Variant (uint8_t). The type of physical joystick.
     *
     * ```
     * const [variant] = jdunpack<[JoystickVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,

    /**
     * Constant bool (uint8_t). Indicates if the joystick is digital, typically made of switches.
     *
     * ```
     * const [digital] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Digital = 0x180,
}

// Service: LED
export const SRV_LED = 0x1e3048f8

export enum LedVariant { // uint32_t
    ThroughHole = 0x1,
    SMD = 0x2,
    Power = 0x3,
    Bead = 0x4,
}

export enum LedReg {
    /**
     * Read-write ratio u0.16 (uint16_t). Set the luminosity of the strip. The value is used to scale `value` in `steps` register.
     * At `0` the power to the strip is completely shut down.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Brightness = 0x1,

    /**
     * Animations are described using pairs of color description and duration,
     * similarly to the `status_light` register in the control service.
     * They repeat indefinitely until another animation is specified.
     * For monochrome LEDs, the hue and saturation are ignored.
     * A specification `(red, 80ms), (blue, 40ms), (blue, 0ms), (yellow, 80ms)`
     * means to start with red, cross-fade to blue over 80ms, stay blue for 40ms,
     * change to yellow, and cross-fade back to red in 80ms.
     *
     * ```
     * const [rest] = jdunpack<[([number, number, number, number])[]]>(buf, "r: u8 u8 u8 u8")
     * const [hue, saturation, value, duration] = rest[0]
     * ```
     */
    Steps = 0x82,

    /**
     * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
     *
     * ```
     * const [maxPower] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxPower = 0x7,

    /**
     * Constant uint16_t. If known, specifies the number of LEDs in parallel on this device.
     *
     * ```
     * const [ledCount] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    LedCount = 0x83,

    /**
     * Constant nm uint16_t. If monochrome LED, specifies the wave length of the LED.
     *
     * ```
     * const [waveLength] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    WaveLength = 0x84,

    /**
     * Constant mcd uint16_t. The luminous intensity of the LED, at full value, in micro candella.
     *
     * ```
     * const [luminousIntensity] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    LuminousIntensity = 0x85,

    /**
     * Constant Variant (uint32_t). The physical type of LED.
     *
     * ```
     * const [variant] = jdunpack<[LedVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

// Service: LED Matrix
export const SRV_LEDMATRIX = 0x110d154b
export enum LEDMatrixReg {
    /**
     * Read-write bytes. The state of the screen where pixel on/off state is
     * stored as a bit, column by column. The column should be byte aligned.
     *
     * ```
     * const [leds] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Leds = 0x2,

    /**
     * Read-write ratio u0.8 (uint8_t). Reads the general brightness of the LEDs. ``0`` when the screen is off.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u0.8")
     * ```
     */
    Brightness = 0x1,

    /**
     * Constant # uint16_t. Number of rows on the screen
     *
     * ```
     * const [rows] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    Rows = 0x181,

    /**
     * Constant # uint16_t. Number of columns on the screen
     *
     * ```
     * const [columns] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    Columns = 0x182,
}

// Service: LED Pixel
export const SRV_LED_PIXEL = 0x126f00e0

export enum LedPixelLightType { // uint8_t
    WS2812B_GRB = 0x0,
    APA102 = 0x10,
    SK9822 = 0x11,
}


export enum LedPixelVariant { // uint32_t
    Strip = 0x1,
    Ring = 0x2,
    Stick = 0x3,
    Jewel = 0x4,
    Matrix = 0x5,
}

export enum LedPixelReg {
    /**
     * Read-write ratio u0.8 (uint8_t). Set the luminosity of the strip.
     * At `0` the power to the strip is completely shut down.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u0.8")
     * ```
     */
    Brightness = 0x1,

    /**
     * Read-only ratio u0.8 (uint8_t). This is the luminosity actually applied to the strip.
     * May be lower than `brightness` if power-limited by the `max_power` register.
     * It will rise slowly (few seconds) back to `brightness` is limits are no longer required.
     *
     * ```
     * const [actualBrightness] = jdunpack<[number]>(buf, "u0.8")
     * ```
     */
    ActualBrightness = 0x180,

    /**
     * Read-write LightType (uint8_t). Specifies the type of light strip connected to controller.
     * Controllers which are sold with lights should default to the correct type
     * and could not allow change.
     *
     * ```
     * const [lightType] = jdunpack<[LedPixelLightType]>(buf, "u8")
     * ```
     */
    LightType = 0x80,

    /**
     * Read-write uint16_t. Specifies the number of pixels in the strip.
     * Controllers which are sold with lights should default to the correct length
     * and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.
     *
     * ```
     * const [numPixels] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    NumPixels = 0x81,

    /**
     * Read-write uint16_t. If the LED pixel strip is a matrix, specifies the number of columns. Otherwise, a square shape is assumed. Controllers which are sold with lights should default to the correct length
     * and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.
     *
     * ```
     * const [numColumns] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    NumColumns = 0x83,

    /**
     * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
     *
     * ```
     * const [maxPower] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxPower = 0x7,

    /**
     * Constant uint16_t. The maximum supported number of pixels.
     * All writes to `num_pixels` are clamped to `max_pixels`.
     *
     * ```
     * const [maxPixels] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxPixels = 0x181,

    /**
     * Read-write uint16_t. How many times to repeat the program passed in `run` command.
     * Should be set before the `run` command.
     * Setting to `0` means to repeat forever.
     *
     * ```
     * const [numRepeats] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    NumRepeats = 0x82,

    /**
     * Constant Variant (uint32_t). Specifies the shape of the light strip.
     *
     * ```
     * const [variant] = jdunpack<[LedPixelVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

export enum LedPixelCmd {
    /**
     * Argument: program bytes. Run the given light "program". See service description for details.
     *
     * ```
     * const [program] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Run = 0x81,
}

// Service: Light level
export const SRV_LIGHT_LEVEL = 0x17dc9a1c

export enum LightLevelVariant { // uint8_t
    PhotoResistor = 0x1,
    LEDMatrix = 0x2,
    Ambient = 0x3,
}

export enum LightLevelReg {
    /**
     * Read-only ratio u0.16 (uint16_t). Detect light level
     *
     * ```
     * const [lightLevel] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    LightLevel = 0x101,

    /**
     * Constant Variant (uint8_t). The type of physical sensor.
     *
     * ```
     * const [variant] = jdunpack<[LightLevelVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Logger
export const SRV_LOGGER = 0x12dc1fca

export enum LoggerPriority { // uint8_t
    Debug = 0x0,
    Log = 0x1,
    Warning = 0x2,
    Error = 0x3,
    Silent = 0x4,
}

export enum LoggerReg {
    /**
     * Read-write Priority (uint8_t). Messages with level lower than this won't be emitted. The default setting may vary.
     * Loggers should revert this to their default setting if the register has not been
     * updated in 3000ms, and also keep the lowest setting they have seen in the last 1500ms.
     * Thus, clients should write this register every 1000ms and ignore messages which are
     * too verbose for them.
     *
     * ```
     * const [minPriority] = jdunpack<[LoggerPriority]>(buf, "u8")
     * ```
     */
    MinPriority = 0x80,
}

export enum LoggerCmd {
    /**
     * Argument: message string (bytes). Report a message.
     *
     * ```
     * const [message] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Debug = 0x80,

    /**
     * Argument: message string (bytes). Report a message.
     *
     * ```
     * const [message] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Log = 0x81,

    /**
     * Argument: message string (bytes). Report a message.
     *
     * ```
     * const [message] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Warn = 0x82,

    /**
     * Argument: message string (bytes). Report a message.
     *
     * ```
     * const [message] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Error = 0x83,
}

// Service: Matrix Keypad
export const SRV_MATRIX_KEYPAD = 0x13062dc8

export enum MatrixKeypadVariant { // uint32_t
    Membrane = 0x1,
    Keyboard = 0x2,
    Elastomer = 0x3,
    ElastomerLEDPixel = 0x4,
}

export enum MatrixKeypadReg {
    /**
     * Read-only. The coordinate of the button currently pressed. Keys are zero-indexed from left to right, top to bottom:
     * ``row = index / columns``, ``column = index % columns``.
     *
     * ```
     * const [index] = jdunpack<[number[]]>(buf, "u8[]")
     * ```
     */
    Pressed = 0x101,

    /**
     * Constant uint8_t. Number of rows in the matrix
     *
     * ```
     * const [rows] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Rows = 0x180,

    /**
     * Constant uint8_t. Number of columns in the matrix
     *
     * ```
     * const [columns] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Columns = 0x181,

    /**
     * Constant. The characters printed on the keys if any, in indexing sequence.
     *
     * ```
     * const [label] = jdunpack<[string[]]>(buf, "z[]")
     * ```
     */
    Labels = 0x182,

    /**
     * Constant Variant (uint32_t). The type of physical keypad. If the variant is ``ElastomerLEDPixel``
     * and the next service on the device is a ``LEDPixel`` service, it is considered
     * as the service controlling the LED pixel on the keypad.
     *
     * ```
     * const [variant] = jdunpack<[MatrixKeypadVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

export enum MatrixKeypadEvent {
    /**
     * Argument: uint8_t. Emitted when a key, at the given index, goes from inactive (`pressed == 0`) to active.
     *
     * ```
     * const [down] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Down = 0x1,

    /**
     * Argument: uint8_t. Emitted when a key, at the given index, goes from active (`pressed == 1`) to inactive.
     *
     * ```
     * const [up] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Up = 0x2,

    /**
     * Argument: uint8_t. Emitted together with `up` when the press time was not longer than 500ms.
     *
     * ```
     * const [click] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Click = 0x80,

    /**
     * Argument: uint8_t. Emitted together with `up` when the press time was more than 500ms.
     *
     * ```
     * const [longClick] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    LongClick = 0x81,
}

// Service: Microphone
export const SRV_MICROPHONE = 0x113dac86
export enum MicrophoneCmd {
    /**
     * The samples will be streamed back over the `samples` pipe.
     * If `num_samples` is `0`, streaming will only stop when the pipe is closed.
     * Otherwise the specified number of samples is streamed.
     * Samples are sent as `i16`.
     *
     * ```
     * const [samples, numSamples] = jdunpack<[Uint8Array, number]>(buf, "b[12] u32")
     * ```
     */
    Sample = 0x81,
}

export enum MicrophoneReg {
    /**
     * Read-write μs uint32_t. Get or set microphone sampling period.
     * Sampling rate is `1_000_000 / sampling_period Hz`.
     *
     * ```
     * const [samplingPeriod] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    SamplingPeriod = 0x80,
}

// Service: Model Runner
export const SRV_MODEL_RUNNER = 0x140f9a78

export enum ModelRunnerModelFormat { // uint32_t
    TFLite = 0x334c4654,
    ML4F = 0x30470f62,
    EdgeImpulseCompiled = 0x30564945,
}

export enum ModelRunnerCmd {
    /**
     * Argument: model_size B uint32_t. Open pipe for streaming in the model. The size of the model has to be declared upfront.
     * The model is streamed over regular pipe data packets.
     * The format supported by this instance of the service is specified in `format` register.
     * When the pipe is closed, the model is written all into flash, and the device running the service may reset.
     *
     * ```
     * const [modelSize] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    SetModel = 0x80,

    /**
     * report SetModel
     * ```
     * const [modelPort] = jdunpack<[number]>(buf, "u16")
     * ```
     */

    /**
     * Argument: outputs pipe (bytes). Open channel that can be used to manually invoke the model. When enough data is sent over the `inputs` pipe, the model is invoked,
     * and results are send over the `outputs` pipe.
     *
     * ```
     * const [outputs] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    Predict = 0x81,

    /**
     * report Predict
     * ```
     * const [inputs] = jdunpack<[number]>(buf, "u16")
     * ```
     */
}

export enum ModelRunnerReg {
    /**
     * Read-write uint16_t. When register contains `N > 0`, run the model automatically every time new `N` samples are collected.
     * Model may be run less often if it takes longer to run than `N * sampling_interval`.
     * The `outputs` register will stream its value after each run.
     * This register is not stored in flash.
     *
     * ```
     * const [autoInvokeEvery] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    AutoInvokeEvery = 0x80,

    /**
     * Read-only. Results of last model invocation as `float32` array.
     *
     * ```
     * const [output] = jdunpack<[number[]]>(buf, "f32[]")
     * ```
     */
    Outputs = 0x101,

    /**
     * Read-only. The shape of the input tensor.
     *
     * ```
     * const [dimension] = jdunpack<[number[]]>(buf, "u16[]")
     * ```
     */
    InputShape = 0x180,

    /**
     * Read-only. The shape of the output tensor.
     *
     * ```
     * const [dimension] = jdunpack<[number[]]>(buf, "u16[]")
     * ```
     */
    OutputShape = 0x181,

    /**
     * Read-only μs uint32_t. The time consumed in last model execution.
     *
     * ```
     * const [lastRunTime] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    LastRunTime = 0x182,

    /**
     * Read-only B uint32_t. Number of RAM bytes allocated for model execution.
     *
     * ```
     * const [allocatedArenaSize] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    AllocatedArenaSize = 0x183,

    /**
     * Read-only B uint32_t. The size of the model in bytes.
     *
     * ```
     * const [modelSize] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    ModelSize = 0x184,

    /**
     * Read-only string (bytes). Textual description of last error when running or loading model (if any).
     *
     * ```
     * const [lastError] = jdunpack<[string]>(buf, "s")
     * ```
     */
    LastError = 0x185,

    /**
     * Constant ModelFormat (uint32_t). The type of ML models supported by this service.
     * `TFLite` is flatbuffer `.tflite` file.
     * `ML4F` is compiled machine code model for Cortex-M4F.
     * The format is typically present as first or second little endian word of model file.
     *
     * ```
     * const [format] = jdunpack<[ModelRunnerModelFormat]>(buf, "u32")
     * ```
     */
    Format = 0x186,

    /**
     * Constant uint32_t. A version number for the format.
     *
     * ```
     * const [formatVersion] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    FormatVersion = 0x187,

    /**
     * Constant bool (uint8_t). If present and true this service can run models independently of other
     * instances of this service on the device.
     *
     * ```
     * const [parallel] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Parallel = 0x188,
}

// Service: Motion
export const SRV_MOTION = 0x1179a749

export enum MotionVariant { // uint8_t
    PIR = 0x1,
}

export enum MotionReg {
    /**
     * Read-only bool (uint8_t). Reports is movement is currently detected by the sensor.
     *
     * ```
     * const [moving] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Moving = 0x101,

    /**
     * Constant m u16.16 (uint32_t). Maximum distance where objects can be detected.
     *
     * ```
     * const [maxDistance] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    MaxDistance = 0x180,

    /**
     * Constant ° uint16_t. Opening of the field of view
     *
     * ```
     * const [angle] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    Angle = 0x181,

    /**
     * Constant Variant (uint8_t). Type of physical sensor
     *
     * ```
     * const [variant] = jdunpack<[MotionVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Motor
export const SRV_MOTOR = 0x17004cd8
export enum MotorReg {
    /**
     * Read-write ratio i1.15 (int16_t). PWM duty cycle of the motor. Use negative/positive values to run the motor forwards and backwards.
     * Positive is recommended to be clockwise rotation and negative counterclockwise. A duty of ``0``
     * while ``enabled`` acts as brake.
     *
     * ```
     * const [duty] = jdunpack<[number]>(buf, "i1.15")
     * ```
     */
    Duty = 0x2,

    /**
     * Read-write bool (uint8_t). Turn the power to the motor on/off.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Constant kg/cm u16.16 (uint32_t). Torque required to produce the rated power of an electrical motor at load speed.
     *
     * ```
     * const [loadTorque] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    LoadTorque = 0x180,

    /**
     * Constant rpm u16.16 (uint32_t). Revolutions per minute of the motor under full load.
     *
     * ```
     * const [loadSpeed] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    LoadSpeed = 0x181,
}

// Service: Multitouch
export const SRV_MULTITOUCH = 0x18d55e2b
export enum MultitouchReg {
    /**
     * Read-only. Capacitance of channels. The capacitance is continuously calibrated, and a value of `0` indicates
     * no touch, wheres a value of around `100` or more indicates touch.
     * It's best to ignore this (unless debugging), and use events.
     *
     * ```
     * const [capacitance] = jdunpack<[number[]]>(buf, "i32[]")
     * ```
     */
    Capacity = 0x101,
}

export enum MultitouchEvent {
    /**
     * Argument: channel uint32_t. Emitted when an input is touched.
     *
     * ```
     * const [channel] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    Touch = 0x1,

    /**
     * Argument: channel uint32_t. Emitted when an input is no longer touched.
     *
     * ```
     * const [channel] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    Release = 0x2,

    /**
     * Argument: channel uint32_t. Emitted when an input is briefly touched. TODO Not implemented.
     *
     * ```
     * const [channel] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    Tap = 0x80,

    /**
     * Argument: channel uint32_t. Emitted when an input is touched for longer than 500ms. TODO Not implemented.
     *
     * ```
     * const [channel] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    LongPress = 0x81,

    /**
     * Emitted when input channels are successively touched in order of increasing channel numbers.
     */
    SwipePos = 0x90,

    /**
     * Emitted when input channels are successively touched in order of decreasing channel numbers.
     */
    SwipeNeg = 0x91,
}

// Service: Potentiometer
export const SRV_POTENTIOMETER = 0x1f274746

export enum PotentiometerVariant { // uint32_t
    Slider = 0x1,
    Rotary = 0x2,
}

export enum PotentiometerReg {
    /**
     * Read-only ratio u0.16 (uint16_t). The relative position of the slider between `0` and `1`.
     *
     * ```
     * const [position] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Position = 0x101,

    /**
     * Constant Variant (uint32_t). Specifies the physical layout of the potentiometer.
     *
     * ```
     * const [variant] = jdunpack<[PotentiometerVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

// Service: Power
export const SRV_POWER = 0x1fa4c95a
export enum PowerReg {
    /**
     * Read-write bool (uint8_t). Turn the power to the bus on/off.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Read-write mA uint16_t. Limit the power provided by the service. The actual maximum limit will depend on hardware.
     * This field may be read-only in some implementations - you should read it back after setting.
     *
     * ```
     * const [maxPower] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxPower = 0x7,

    /**
     * Read-only bool (uint8_t). Indicates whether the power has been shut down due to overdraw.
     *
     * ```
     * const [overload] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Overload = 0x181,

    /**
     * Read-only mA uint16_t. Present current draw from the bus.
     *
     * ```
     * const [currentDraw] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    CurrentDraw = 0x101,

    /**
     * Read-only mV uint16_t. Voltage on input.
     *
     * ```
     * const [batteryVoltage] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    BatteryVoltage = 0x180,

    /**
     * Read-only ratio u0.16 (uint16_t). Fraction of charge in the battery.
     *
     * ```
     * const [batteryCharge] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    BatteryCharge = 0x182,

    /**
     * Constant mWh uint32_t. Energy that can be delivered to the bus when battery is fully charged.
     * This excludes conversion overheads if any.
     *
     * ```
     * const [batteryCapacity] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    BatteryCapacity = 0x183,

    /**
     * Read-write ms uint16_t. Many USB power packs need current to be drawn from time to time to prevent shutdown.
     * This regulates how often and for how long such current is drawn.
     * Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.
     *
     * ```
     * const [keepOnPulseDuration] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    KeepOnPulseDuration = 0x80,

    /**
     * Read-write ms uint16_t. Many USB power packs need current to be drawn from time to time to prevent shutdown.
     * This regulates how often and for how long such current is drawn.
     * Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.
     *
     * ```
     * const [keepOnPulsePeriod] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    KeepOnPulsePeriod = 0x81,

    /**
     * Read-write int32_t. This value is added to `priority` of `active` reports, thus modifying amount of load-sharing
     * between different supplies.
     * The `priority` is clamped to `u32` range when included in `active` reports.
     *
     * ```
     * const [priorityOffset] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    PriorityOffset = 0x82,
}

export enum PowerCmd {
    /**
     * Argument: priority uint32_t. Emitted with announce packets when the service is running.
     * The `priority` should be computed as
     * `(((max_power >> 5) << 24) | remaining_capacity) + priority_offset`
     * where the `remaining_capacity` is `(battery_charge * battery_capacity) >> 16`,
     * or one of the special constants
     * `0xe00000` when the remaining capacity is unknown,
     * or `0xf00000` when the capacity is considered infinite (eg., wall charger).
     * The `priority` is clamped to `u32` range after computation.
     * In cases where battery capacity is unknown but the charge percentage can be estimated,
     * it's recommended to assume a fixed (typical) battery capacity for priority purposes,
     * rather than using `0xe00000`, as this will have a better load-sharing characteristic,
     * especially if several power providers of the same type are used.
     *
     * ```
     * const [priority] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    Active = 0x80,
}

// Service: Protocol Test
export const SRV_PROTO_TEST = 0x16c7466a
export enum ProtoTestReg {
    /**
     * Read-write bool (uint8_t). A read write bool register.
     *
     * ```
     * const [rwBool] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    RwBool = 0x81,

    /**
     * Read-only bool (uint8_t). A read only bool register. Mirrors rw_bool.
     *
     * ```
     * const [roBool] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    RoBool = 0x181,

    /**
     * Read-write uint32_t. A read write u32 register.
     *
     * ```
     * const [rwU32] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    RwU32 = 0x82,

    /**
     * Read-only uint32_t. A read only u32 register.. Mirrors rw_u32.
     *
     * ```
     * const [roU32] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    RoU32 = 0x182,

    /**
     * Read-write int32_t. A read write i32 register.
     *
     * ```
     * const [rwI32] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    RwI32 = 0x83,

    /**
     * Read-only int32_t. A read only i32 register.. Mirrors rw_i32.
     *
     * ```
     * const [roI32] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    RoI32 = 0x183,

    /**
     * Read-write string (bytes). A read write string register.
     *
     * ```
     * const [rwString] = jdunpack<[string]>(buf, "s")
     * ```
     */
    RwString = 0x84,

    /**
     * Read-only string (bytes). A read only string register. Mirrors rw_string.
     *
     * ```
     * const [roString] = jdunpack<[string]>(buf, "s")
     * ```
     */
    RoString = 0x184,

    /**
     * Read-write bytes. A read write string register.
     *
     * ```
     * const [rwBytes] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    RwBytes = 0x85,

    /**
     * Read-only bytes. A read only string register. Mirrors ro_bytes.
     *
     * ```
     * const [roBytes] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    RoBytes = 0x185,

    /**
     * A read write i8, u8, u16, i32 register.
     *
     * ```
     * const [i8, u8, u16, i32] = jdunpack<[number, number, number, number]>(buf, "i8 u8 u16 i32")
     * ```
     */
    RwI8U8U16I32 = 0x86,

    /**
     * A read only i8, u8, u16, i32 register.. Mirrors rw_i8_u8_u16_i32.
     *
     * ```
     * const [i8, u8, u16, i32] = jdunpack<[number, number, number, number]>(buf, "i8 u8 u16 i32")
     * ```
     */
    RoI8U8U16I32 = 0x186,
}

export enum ProtoTestEvent {
    /**
     * Argument: bool bool (uint8_t). An event raised when rw_bool is modified
     *
     * ```
     * const [bool] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    EBool = 0x81,

    /**
     * Argument: u32 uint32_t. An event raised when rw_u32 is modified
     *
     * ```
     * const [u32] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    EU32 = 0x82,

    /**
     * Argument: i32 int32_t. An event raised when rw_i32 is modified
     *
     * ```
     * const [i32] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    EI32 = 0x83,

    /**
     * Argument: string string (bytes). An event raised when rw_string is modified
     *
     * ```
     * const [string] = jdunpack<[string]>(buf, "s")
     * ```
     */
    EString = 0x84,

    /**
     * Argument: bytes bytes. An event raised when rw_bytes is modified
     *
     * ```
     * const [bytes] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    EBytes = 0x85,

    /**
     * An event raised when rw_i8_u8_u16_i32 is modified
     *
     * ```
     * const [i8, u8, u16, i32] = jdunpack<[number, number, number, number]>(buf, "i8 u8 u16 i32")
     * ```
     */
    EI8U8U16I32 = 0x86,
}

export enum ProtoTestCmd {
    /**
     * Argument: bool bool (uint8_t). A command to set rw_bool. Returns the value.
     *
     * ```
     * const [bool] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    CBool = 0x81,

    /**
     * Argument: u32 uint32_t. A command to set rw_u32. Returns the value.
     *
     * ```
     * const [u32] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    CU32 = 0x82,

    /**
     * Argument: i32 int32_t. A command to set rw_i32. Returns the value.
     *
     * ```
     * const [i32] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    CI32 = 0x83,

    /**
     * Argument: string string (bytes). A command to set rw_string. Returns the value.
     *
     * ```
     * const [string] = jdunpack<[string]>(buf, "s")
     * ```
     */
    CString = 0x84,

    /**
     * Argument: bytes bytes. A command to set rw_string. Returns the value.
     *
     * ```
     * const [bytes] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    CBytes = 0x85,

    /**
     * A command to set rw_bytes. Returns the value.
     *
     * ```
     * const [i8, u8, u16, i32] = jdunpack<[number, number, number, number]>(buf, "i8 u8 u16 i32")
     * ```
     */
    CI8U8U16I32 = 0x86,

    /**
     * Argument: p_bytes pipe (bytes). A command to read the content of rw_bytes, byte per byte, as a pipe.
     *
     * ```
     * const [pBytes] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    CReportPipe = 0x87,
}


/**
 * pipe_report PBytes
 * ```
 * const [byte] = jdunpack<[number]>(buf, "u8")
 * ```
 */


// Service: Pulse Oximeter
export const SRV_PULSE_OXIMETER = 0x10bb4eb6
export enum PulseOximeterReg {
    /**
     * Read-only % u8.8 (uint16_t). The estimated oxygen level in blood.
     *
     * ```
     * const [oxygen] = jdunpack<[number]>(buf, "u8.8")
     * ```
     */
    Oxygen = 0x101,

    /**
     * Read-only % u8.8 (uint16_t). The estimated error on the reported sensor data.
     *
     * ```
     * const [oxygenError] = jdunpack<[number]>(buf, "u8.8")
     * ```
     */
    OxygenError = 0x106,
}

// Service: Rain gauge
export const SRV_RAIN_GAUGE = 0x13734c95
export enum RainGaugeReg {
    /**
     * Read-only mm u16.16 (uint32_t). Total precipitation recorded so far.
     *
     * ```
     * const [precipitation] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    Precipitation = 0x101,

    /**
     * Constant mm u16.16 (uint32_t). Typically the amount of rain needed for tipping the bucket.
     *
     * ```
     * const [precipitationPrecision] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    PrecipitationPrecision = 0x108,
}

// Service: Real time clock
export const SRV_REAL_TIME_CLOCK = 0x1a8b1a28

export enum RealTimeClockVariant { // uint8_t
    Computer = 0x1,
    Crystal = 0x2,
    Cuckoo = 0x3,
}

export enum RealTimeClockReg {
    /**
     * Current time in 24h representation.
     * * ``day_of_month`` is day of the month, starting at ``1``
     * * ``day_of_week`` is day of the week, starting at ``1`` as monday
     * Default streaming period is 1 second.
     *
     * ```
     * const [year, month, dayOfMonth, dayOfWeek, hour, min, sec] = jdunpack<[number, number, number, number, number, number, number]>(buf, "u16 u8 u8 u8 u8 u8 u8")
     * ```
     */
    LocalTime = 0x101,

    /**
     * Read-only s u16.16 (uint32_t). Time drift since the last call to the ``set_time`` command.
     *
     * ```
     * const [error] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    Error = 0x180,

    /**
     * Constant ppm u16.16 (uint32_t). Error on the clock, in parts per million of seconds.
     *
     * ```
     * const [precision] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    Precision = 0x180,

    /**
     * Constant Variant (uint8_t). The type of physical clock used by the sensor.
     *
     * ```
     * const [variant] = jdunpack<[RealTimeClockVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

export enum RealTimeClockCmd {
    /**
     * Sets the current time and resets the error.
     *
     * ```
     * const [year, month, dayOfMonth, dayOfWeek, hour, min, sec] = jdunpack<[number, number, number, number, number, number, number]>(buf, "u16 u8 u8 u8 u8 u8 u8")
     * ```
     */
    SetTime = 0x80,
}

// Service: Reflected light
export const SRV_REFLECTED_LIGHT = 0x126c4cb2

export enum ReflectedLightVariant { // uint8_t
    InfraredDigital = 0x1,
    InfraredAnalog = 0x2,
}

export enum ReflectedLightReg {
    /**
     * Read-only ratio u0.16 (uint16_t). Reports the reflected brightness. It may be a digital value or, for some sensor, analog value.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Brightness = 0x101,

    /**
     * Constant Variant (uint8_t). Type of physical sensor used
     *
     * ```
     * const [variant] = jdunpack<[ReflectedLightVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

export enum ReflectedLightEvent {
    /**
     * The sensor detected a transition from light to dark
     */
    Dark = 0x2,

    /**
     * The sensor detected a transition from dark to light
     */
    Light = 0x1,
}

// Service: Relay
export const SRV_RELAY = 0x183fe656

export enum RelayVariant { // uint32_t
    Electromechanical = 0x1,
    SolidState = 0x2,
    Reed = 0x3,
}

export enum RelayReg {
    /**
     * Read-write bool (uint8_t). Indicates whether the relay circuit is currently on (closed) or off (closed).
     *
     * ```
     * const [closed] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Closed = 0x1,

    /**
     * Constant Variant (uint32_t). Describes the type of relay used.
     *
     * ```
     * const [variant] = jdunpack<[RelayVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,

    /**
     * Constant A uint16_t. Maximum switching current for a resistive load.
     *
     * ```
     * const [maxSwitchingCurrent] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxSwitchingCurrent = 0x180,
}

export enum RelayEvent {
    /**
     * Emitted when relay goes from ``off`` to ``on`` state.
     */
    On = 0x1,

    /**
     * Emitted when relay goes from ``on`` to ``off`` state.
     */
    Off = 0x2,
}

// Service: Role Manager
export const SRV_ROLE_MANAGER = 0x1e4b7e66
export enum RoleManagerReg {
    /**
     * Read-only bool (uint8_t). Indicates if all required roles have been allocated to devices.
     *
     * ```
     * const [allRolesAllocated] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    AllRolesAllocated = 0x181,
}

export enum RoleManagerCmd {
    /**
     * Get the role corresponding to given device identifer. Returns empty string if unset.
     *
     * ```
     * const [deviceId, serviceIdx] = jdunpack<[Uint8Array, number]>(buf, "b[8] u8")
     * ```
     */
    GetRole = 0x80,

    /**
     * report GetRole
     * ```
     * const [deviceId, serviceIdx, role] = jdunpack<[Uint8Array, number, string]>(buf, "b[8] u8 s")
     * ```
     */

    /**
     * Set role. Can set to empty to remove role binding.
     *
     * ```
     * const [deviceId, serviceIdx, role] = jdunpack<[Uint8Array, number, string]>(buf, "b[8] u8 s")
     * ```
     */
    SetRole = 0x81,

    /**
     * No args. Remove all role bindings.
     */
    ClearAllRoles = 0x84,

    /**
     * Argument: stored_roles pipe (bytes). Return all roles stored internally.
     *
     * ```
     * const [storedRoles] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    ListStoredRoles = 0x82,

    /**
     * Argument: required_roles pipe (bytes). List all roles required by the current program. `device_id` and `service_idx` are `0` if role is unbound.
     *
     * ```
     * const [requiredRoles] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    ListRequiredRoles = 0x83,
}


/**
 * pipe_report StoredRoles
 * ```
 * const [deviceId, serviceIdx, role] = jdunpack<[Uint8Array, number, string]>(buf, "b[8] u8 s")
 * ```
 */

/**
 * pipe_report RequiredRoles
 * ```
 * const [deviceId, serviceClass, serviceIdx, role] = jdunpack<[Uint8Array, number, number, string]>(buf, "b[8] u32 u8 s")
 * ```
 */


export enum RoleManagerEvent {
    /**
     * Emit notifying that the internal state of the service changed.
     */
    Change = 0x3,
}

// Service: Rotary encoder
export const SRV_ROTARY_ENCODER = 0x10fa29c9
export enum RotaryEncoderReg {
    /**
     * Read-only # int32_t. Upon device reset starts at `0` (regardless of the shaft position).
     * Increases by `1` for a clockwise "click", by `-1` for counter-clockwise.
     *
     * ```
     * const [position] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    Position = 0x101,

    /**
     * Constant # uint16_t. This specifies by how much `position` changes when the crank does 360 degree turn. Typically 12 or 24.
     *
     * ```
     * const [clicksPerTurn] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    ClicksPerTurn = 0x180,
}

// Service: Sensor Aggregator
export const SRV_SENSOR_AGGREGATOR = 0x1d90e1c5

export enum SensorAggregatorSampleType { // uint8_t
    U8 = 0x8,
    I8 = 0x88,
    U16 = 0x10,
    I16 = 0x90,
    U32 = 0x20,
    I32 = 0xa0,
}

export enum SensorAggregatorReg {
    /**
     * Set automatic input collection.
     * These settings are stored in flash.
     *
     * ```
     * const [samplingInterval, samplesInWindow, rest] = jdunpack<[number, number, ([Uint8Array, number, number, number, SensorAggregatorSampleType, number])[]]>(buf, "u16 u16 x[4] r: b[8] u32 u8 u8 u8 i8")
     * const [deviceId, serviceClass, serviceNum, sampleSize, sampleType, sampleShift] = rest[0]
     * ```
     */
    Inputs = 0x80,

    /**
     * Read-only uint32_t. Number of input samples collected so far.
     *
     * ```
     * const [numSamples] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    NumSamples = 0x180,

    /**
     * Read-only B uint8_t. Size of a single sample.
     *
     * ```
     * const [sampleSize] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    SampleSize = 0x181,

    /**
     * Read-write uint32_t. When set to `N`, will stream `N` samples as `current_sample` reading.
     *
     * ```
     * const [streamingSamples] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    StreamingSamples = 0x81,

    /**
     * Read-only bytes. Last collected sample.
     *
     * ```
     * const [currentSample] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    CurrentSample = 0x101,
}

// Service: Servo
export const SRV_SERVO = 0x12fc9103

export enum ServoVariant { // uint32_t
    PositionalRotation = 0x1,
    Linear = 0x2,
}

export enum ServoReg {
    /**
     * Read-write ° i16.16 (int32_t). Specifies the angle of the arm.
     *
     * ```
     * const [angle] = jdunpack<[number]>(buf, "i16.16")
     * ```
     */
    Angle = 0x2,

    /**
     * Read-write bool (uint8_t). Turn the power to the servo on/off.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Read-write ° i16.16 (int32_t). Correction applied to the angle to account for the servo arm drift.
     *
     * ```
     * const [offset] = jdunpack<[number]>(buf, "i16.16")
     * ```
     */
    Offset = 0x81,

    /**
     * Constant ° i16.16 (int32_t). Lowest angle that can be set.
     *
     * ```
     * const [minAngle] = jdunpack<[number]>(buf, "i16.16")
     * ```
     */
    MinAngle = 0x104,

    /**
     * Constant ° i16.16 (int32_t). Highest angle that can be set.
     *
     * ```
     * const [maxAngle] = jdunpack<[number]>(buf, "i16.16")
     * ```
     */
    MaxAngle = 0x105,

    /**
     * Constant Variant (uint32_t). Specifies the type of servo motor.
     * * Positional Rotation Servos: Positional servos can rotate the shaft in about half of the circle,
     * with features to avoid over-rotating. Most servo have a range of 180° but some allow 270° or 360°.
     * * Linear Servos: linear servos are also like a positional servo, but with additional gears to the adjust the output from circular to back-and-forth.
     *
     * ```
     * const [variant] = jdunpack<[ServoVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,

    /**
     * Constant kg/cm u16.16 (uint32_t). The servo motor will stop rotating when it is trying to move a ``stall_torque`` weight at a radial distance of ``1.0`` cm.
     *
     * ```
     * const [stallTorque] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    StallTorque = 0x180,

    /**
     * Constant s/60° u16.16 (uint32_t). Time to move 60°.
     *
     * ```
     * const [responseSpeed] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    ResponseSpeed = 0x181,
}

// Service: Settings
export const SRV_SETTINGS = 0x1107dc4a
export enum SettingsCmd {
    /**
     * Argument: key string (bytes). Get the value of given setting. If no such entry exists, the value returned is empty.
     *
     * ```
     * const [key] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Get = 0x80,

    /**
     * report Get
     * ```
     * const [key, value] = jdunpack<[string, Uint8Array]>(buf, "z b")
     * ```
     */

    /**
     * Set the value of a given setting.
     *
     * ```
     * const [key, value] = jdunpack<[string, Uint8Array]>(buf, "z b")
     * ```
     */
    Set = 0x81,

    /**
     * Argument: key string (bytes). Delete a given setting.
     *
     * ```
     * const [key] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Delete = 0x84,

    /**
     * Argument: results pipe (bytes). Return keys of all settings.
     *
     * ```
     * const [results] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    ListKeys = 0x82,

    /**
     * Argument: results pipe (bytes). Return keys and values of all settings.
     *
     * ```
     * const [results] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    List = 0x83,

    /**
     * No args. Clears all keys.
     */
    Clear = 0x85,
}


/**
 * pipe_report ListedKey
 * ```
 * const [key] = jdunpack<[string]>(buf, "s")
 * ```
 */

/**
 * pipe_report ListedEntry
 * ```
 * const [key, value] = jdunpack<[string, Uint8Array]>(buf, "z b")
 * ```
 */


export enum SettingsEvent {
    /**
     * Notifies that some setting have been modified.
     */
    Change = 0x3,
}

// Service: 7-segment display
export const SRV_SEVEN_SEGMENT_DISPLAY = 0x196158f7
export enum SevenSegmentDisplayReg {
    /**
     * Read-write bytes. Each byte encodes the display status of a digit using,
     * where bit 0 encodes segment `A`, bit 1 encodes segments `B`, ..., bit 6 encodes segments `G`, and bit 7 encodes the decimal point (if present).
     * If incoming ``digits`` data is smaller than `digit_count`, the remaining digits will be cleared.
     * Thus, sending an empty ``digits`` payload clears the screen.
     *
     * ```
     * const [digits] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Digits = 0x2,

    /**
     * Read-write ratio u0.16 (uint16_t). Controls the brightness of the LEDs. ``0`` means off.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Brightness = 0x1,

    /**
     * Read-write bool (uint8_t). Turn on or off the column LEDs (separating minutes from hours, etc.) in of the segment.
     * If the column LEDs is not supported, the value remains false.
     *
     * ```
     * const [doubleDots] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    DoubleDots = 0x80,

    /**
     * Constant uint8_t. The number of digits available on the display.
     *
     * ```
     * const [digitCount] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    DigitCount = 0x180,

    /**
     * Constant bool (uint8_t). True if decimal points are available (on all digits).
     *
     * ```
     * const [decimalPoint] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    DecimalPoint = 0x181,
}

// Service: Soil moisture
export const SRV_SOIL_MOISTURE = 0x1d4aa3b3

export enum SoilMoistureVariant { // uint8_t
    Resistive = 0x1,
    Capacitive = 0x2,
}

export enum SoilMoistureReg {
    /**
     * Read-only ratio u0.16 (uint16_t). Indicates the wetness of the soil, from ``dry`` to ``wet``.
     *
     * ```
     * const [moisture] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Moisture = 0x101,

    /**
     * Constant Variant (uint8_t). Describe the type of physical sensor.
     *
     * ```
     * const [variant] = jdunpack<[SoilMoistureVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Sound level
export const SRV_SOUND_LEVEL = 0x14ad1a5d
export enum SoundLevelReg {
    /**
     * Read-only ratio u0.16 (uint16_t). The sound level detected by the microphone
     *
     * ```
     * const [soundLevel] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    SoundLevel = 0x101,

    /**
     * Read-write ratio u0.16 (uint16_t). The sound level to trigger a loud event.
     *
     * ```
     * const [loudThreshold] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    LoudThreshold = 0x5,

    /**
     * Read-write ratio u0.16 (uint16_t). The sound level to trigger a quite event.
     *
     * ```
     * const [quietThreshold] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    QuietThreshold = 0x6,
}

export enum SoundLevelEvent {
    /**
     * Raised when a loud sound is detected
     */
    Loud = 0x6,

    /**
     * Raised when a period of quietness is detected
     */
    Quiet = 0x5,
}

// Service: Sound player
export const SRV_SOUND_PLAYER = 0x1403d338
export enum SoundPlayerReg {
    /**
     * Read-write ratio u0.16 (uint16_t). Global volume of the output. ``0`` means completely off. This volume is mixed with each play volumes.
     *
     * ```
     * const [volume] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Volume = 0x1,
}

export enum SoundPlayerCmd {
    /**
     * Starts playing a sounds with a specific volume.
     *
     * ```
     * const [volume, name] = jdunpack<[number, string]>(buf, "u0.16 s")
     * ```
     */
    Play = 0x80,

    /**
     * Argument: sounds_port pipe (bytes). Returns the list of sounds available to play.
     *
     * ```
     * const [soundsPort] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    ListSounds = 0x81,
}


/**
 * pipe_report ListSoundsPipe
 * ```
 * const [duration, name] = jdunpack<[number, string]>(buf, "u32 s")
 * ```
 */


// Service: Speech synthesis
export const SRV_SPEECH_SYNTHESIS = 0x1204d995
export enum SpeechSynthesisReg {
    /**
     * Read-write bool (uint8_t). Determines if the speech engine is in a non-paused state.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Read-write string (bytes). Language used for utterances as defined in https://www.ietf.org/rfc/bcp/bcp47.txt.
     *
     * ```
     * const [lang] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Lang = 0x80,

    /**
     * Read-write ratio u0.8 (uint8_t). Volume for utterances.
     *
     * ```
     * const [volume] = jdunpack<[number]>(buf, "u0.8")
     * ```
     */
    Volume = 0x81,

    /**
     * Read-write u16.16 (uint32_t). Pitch for utterances
     *
     * ```
     * const [pitch] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    Pitch = 0x82,

    /**
     * Read-write u16.16 (uint32_t). Rate for utterances
     *
     * ```
     * const [rate] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    Rate = 0x83,
}

export enum SpeechSynthesisCmd {
    /**
     * Argument: text string (bytes). Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
     *
     * ```
     * const [text] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Speak = 0x80,

    /**
     * No args. Cancels current utterance and all utterances from the utterance queue.
     */
    Cancel = 0x81,
}

// Service: Switch
export const SRV_SWITCH = 0x1ad29402

export enum SwitchVariant { // uint32_t
    Slide = 0x1,
    Tilt = 0x2,
    PushButton = 0x3,
    Tactile = 0x4,
    Toggle = 0x5,
    Proximity = 0x6,
    Magnetic = 0x7,
    FootPedal = 0x8,
}

export enum SwitchReg {
    /**
     * Read-only bool (uint8_t). Indicates whether the switch is currently active (on).
     *
     * ```
     * const [active] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Active = 0x101,

    /**
     * Constant Variant (uint32_t). Describes the type of switch used.
     *
     * ```
     * const [variant] = jdunpack<[SwitchVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,

    /**
     * Constant s u16.16 (uint32_t). Specifies the delay without activity to automatically turn off after turning on.
     * For example, some light switches in staircases have such a capability.
     *
     * ```
     * const [autoOffDelay] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    AutoOffDelay = 0x180,
}

export enum SwitchEvent {
    /**
     * Emitted when switch goes from ``off`` to ``on``.
     */
    On = 0x1,

    /**
     * Emitted when switch goes from ``on`` to ``off``.
     */
    Off = 0x2,
}

// Service: TCP
export const SRV_TCP = 0x1b43b70b

export enum TcpTcpError { // int32_t
    InvalidCommand = 0x1,
    InvalidCommandPayload = 0x2,
}

export enum TcpCmd {
    /**
     * Argument: inbound pipe (bytes). Open pair of pipes between network peripheral and a controlling device. In/outbound refers to direction from/to internet.
     *
     * ```
     * const [inbound] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    Open = 0x80,

    /**
     * report Open
     * ```
     * const [outboundPort] = jdunpack<[number]>(buf, "u16")
     * ```
     */
}

export enum TcpPipeCmd {
    /**
     * Open an SSL connection to a given host:port pair. Can be issued only once on given pipe.
     * After the connection is established, an empty data report is sent.
     * Connection is closed by closing the pipe.
     *
     * ```
     * const [tcpPort, hostname] = jdunpack<[number, string]>(buf, "u16 s")
     * ```
     */
    OpenSsl = 0x1,

    /**
     * Argument: error TcpError (int32_t). Reported when an error is encountered. Negative error codes come directly from the SSL implementation.
     *
     * ```
     * const [error] = jdunpack<[TcpTcpError]>(buf, "i32")
     * ```
     */
    Error = 0x0,
}


/**
 * pipe_command Outdata
 * ```
 * const [data] = jdunpack<[Uint8Array]>(buf, "b")
 * ```
 */

/**
 * pipe_report Indata
 * ```
 * const [data] = jdunpack<[Uint8Array]>(buf, "b")
 * ```
 */


// Service: Thermometer
export const SRV_THERMOMETER = 0x1421bac7

export enum ThermometerVariant { // uint32_t
    Outdoor = 0x1,
    Indoor = 0x2,
    Body = 0x3,
    HeatProbe = 0x4,
    Thermocouple = 0x5,
}

export enum ThermometerReg {
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
     * Constant Variant (uint32_t). Specifies the type of thermometer.
     *
     * ```
     * const [variant] = jdunpack<[ThermometerVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

// Service: Traffic Light
export const SRV_TRAFFIC_LIGHT = 0x15c38d9b
export enum TrafficLightReg {
    /**
     * Read-write bool (uint8_t). The on/off state of the red light.
     *
     * ```
     * const [red] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Red = 0x80,

    /**
     * Read-write bool (uint8_t). The on/off state of the red light.
     *
     * ```
     * const [orange] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Orange = 0x81,

    /**
     * Read-write bool (uint8_t). The on/off state of the red light.
     *
     * ```
     * const [green] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Green = 0x82,
}

// Service: Total Volatile organic compound
export const SRV_TVOC = 0x12a5b597
export enum TVOCReg {
    /**
     * Read-only ppb u22.10 (uint32_t). Total volatile organic compound readings in parts per billion.
     *
     * ```
     * const [tVOC] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    TVOC = 0x101,

    /**
     * Read-only ppb u22.10 (uint32_t). Error on the reading data
     *
     * ```
     * const [tVOCError] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    TVOCError = 0x106,

    /**
     * Constant ppb u22.10 (uint32_t). Minimum measurable value
     *
     * ```
     * const [min_TVOC] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    Min_TVOC = 0x104,

    /**
     * Constant ppb u22.10 (uint32_t). Minimum measurable value
     *
     * ```
     * const [max_TVOC] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    Max_TVOC = 0x105,

    /**
     * Constant s uint32_t. Time required to achieve good sensor stability before measuring after long idle period.
     *
     * ```
     * const [conditioningPeriod] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    ConditioningPeriod = 0x180,
}

// Service: UV index
export const SRV_UVINDEX = 0x1f6e0d90

export enum UVIndexVariant { // uint8_t
    UVA_UVB = 0x1,
    Visible_IR = 0x2,
}

export enum UVIndexReg {
    /**
     * Read-only uv u16.16 (uint32_t). Ultraviolet index, typically refreshed every second.
     *
     * ```
     * const [uvIndex] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    UvIndex = 0x101,

    /**
     * Read-only uv u16.16 (uint32_t). Error on the UV measure.
     *
     * ```
     * const [uvIndexError] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    UvIndexError = 0x106,

    /**
     * Constant Variant (uint8_t). The type of physical sensor and capabilities.
     *
     * ```
     * const [variant] = jdunpack<[UVIndexVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Vibration motor
export const SRV_VIBRATION_MOTOR = 0x183fc4a2
export enum VibrationMotorReg {
    /**
     * Read-only ratio u0.8 (uint8_t). Rotation speed of the motor. If only one rotation speed is supported,
     * then `0` shell be off, and any other number on.
     * Use the ``vibrate`` command to control the register.
     *
     * ```
     * const [speed] = jdunpack<[number]>(buf, "u0.8")
     * ```
     */
    Speed = 0x101,

    /**
     * Read-write bool (uint8_t). Determines if the vibration motor responds to vibrate commands.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,
}

export enum VibrationMotorCmd {
    /**
     * Starts a sequence of vibration and pauses.
     *
     * ```
     * const [rest] = jdunpack<[([number, number])[]]>(buf, "r: u8 u0.8")
     * const [duration, speed] = rest[0]
     * ```
     */
    Vibrate = 0x80,
}

// Service: Water level
export const SRV_WATER_LEVEL = 0x147b62ed

export enum WaterLevelVariant { // uint32_t
    Resistive = 0x1,
    ContactPhotoElectric = 0x2,
    NonContactPhotoElectric = 0x3,
}

export enum WaterLevelReg {
    /**
     * Read-only ratio u0.16 (uint16_t). The reported water level.
     *
     * ```
     * const [level] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Level = 0x101,

    /**
     * Constant Variant (uint32_t). The type of physical sensor.
     *
     * ```
     * const [variant] = jdunpack<[WaterLevelVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

// Service: Weight Scale
export const SRV_WEIGHT_SCALE = 0x1f4d5040

export enum WeightScaleVariant { // uint32_t
    Body = 0x1,
    Food = 0x2,
    Jewelry = 0x3,
}

export enum WeightScaleReg {
    /**
     * Read-only kg u16.16 (uint32_t). The reported weight.
     *
     * ```
     * const [weight] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    Weight = 0x101,

    /**
     * Read-only kg u16.16 (uint32_t). The estimate error on the reported reading.
     *
     * ```
     * const [weightError] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    WeightError = 0x106,

    /**
     * Read-write kg u16.16 (uint32_t). Calibrated zero offset error on the scale, i.e. the measured weight when nothing is on the scale.
     * You do not need to subtract that from the reading, it has already been done.
     *
     * ```
     * const [zeroOffset] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    ZeroOffset = 0x80,

    /**
     * Read-write u16.16 (uint32_t). Calibrated gain on the weight scale error.
     *
     * ```
     * const [gain] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    Gain = 0x81,

    /**
     * Constant kg u16.16 (uint32_t). Maximum supported weight on the scale.
     *
     * ```
     * const [maxWeight] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    MaxWeight = 0x105,

    /**
     * Constant kg u16.16 (uint32_t). Minimum recommend weight on the scale.
     *
     * ```
     * const [minWeight] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    MinWeight = 0x104,

    /**
     * Constant kg u16.16 (uint32_t). Smallest, yet distinguishable change in reading.
     *
     * ```
     * const [weightResolution] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    WeightResolution = 0x108,

    /**
     * Constant Variant (uint32_t). The type of physical scale
     *
     * ```
     * const [variant] = jdunpack<[WeightScaleVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

export enum WeightScaleCmd {
    /**
     * No args. Call this command when there is nothing on the scale. If supported, the module should save the calibration data.
     */
    CalibrateZeroOffset = 0x80,

    /**
     * Argument: weight g u22.10 (uint32_t). Call this command with the weight of the thing on the scale.
     *
     * ```
     * const [weight] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    CalibrateGain = 0x81,
}

// Service: WIFI
export const SRV_WIFI = 0x18aae1fa

export enum WifiAPFlags { // uint32_t
    HasPassword = 0x1,
    WPS = 0x2,
    HasSecondaryChannelAbove = 0x4,
    HasSecondaryChannelBelow = 0x8,
    IEEE_802_11B = 0x100,
    IEEE_802_11A = 0x200,
    IEEE_802_11G = 0x400,
    IEEE_802_11N = 0x800,
    IEEE_802_11AC = 0x1000,
    IEEE_802_11AX = 0x2000,
    IEEE_802_LongRange = 0x8000,
}

export enum WifiCmd {
    /**
     * Argument: results pipe (bytes). Initiate search for WiFi networks. Results are returned via pipe, one entry per packet.
     *
     * ```
     * const [results] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    Scan = 0x80,

    /**
     * Connect to named network.
     *
     * ```
     * const [ssid, password] = jdunpack<[string, string]>(buf, "z z")
     * ```
     */
    Connect = 0x81,

    /**
     * No args. Disconnect from current WiFi network if any.
     */
    Disconnect = 0x82,
}


/**
 * pipe_report Results
 * ```
 * const [flags, rssi, channel, bssid, ssid] = jdunpack<[WifiAPFlags, number, number, Uint8Array, string]>(buf, "u32 x[4] i8 u8 b[6] s[33]")
 * ```
 */


export enum WifiReg {
    /**
     * Read-only bool (uint8_t). Indicates whether or not we currently have an IP address assigned.
     *
     * ```
     * const [connected] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Connected = 0x180,
}

export enum WifiEvent {
    /**
     * Emitted upon successful join and IP address assignment.
     */
    GotIp = 0x1,

    /**
     * Emitted when disconnected from network.
     */
    LostIp = 0x2,
}

// Service: Wind direction
export const SRV_WIND_DIRECTION = 0x186be92b
export enum WindDirectionReg {
    /**
     * Read-only uint16_t. The direction of the wind.
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

// Service: Wind speed
export const SRV_WIND_SPEED = 0x1b591bbf
export enum WindSpeedReg {
    /**
     * Read-only m/s u16.16 (uint32_t). The velocity of the wind.
     *
     * ```
     * const [windSpeed] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    WindSpeed = 0x101,

    /**
     * Read-only m/s u16.16 (uint32_t). Error on the reading
     *
     * ```
     * const [windSpeedError] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    WindSpeedError = 0x106,

    /**
     * Constant m/s u16.16 (uint32_t). Maximum speed that can be measured by the sensor.
     *
     * ```
     * const [maxWindSpeed] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    MaxWindSpeed = 0x105,
}

