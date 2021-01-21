// Service: Common registers and commands
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
     * Read-only int32_t. The real value of whatever is measured is between `reading - reading_error` and `reading + reading_error`.
     * This register is often, but not always `const`.
     *
     * ```
     * const [readingError] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    ReadingError = 0x106,

    /**
     * Read-write int32_t. Thresholds for event generation for event generation for analog sensors.
     *
     * ```
     * const [lowThreshold] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    LowThreshold = 0x5,

    /**
     * Read-write int32_t. Thresholds for event generation for event generation for analog sensors.
     *
     * ```
     * const [highThreshold] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    HighThreshold = 0x6,

    /**
     * Reports the current state or error status of the device. ``code`` is a standardized value from
     * the JACDAC error codes. ``vendor_code`` is any vendor specific error code describing the device
     * state. This report is typically not queried, when a device has an error, it will typically
     * add this report in frame along with the announce packet.
     *
     * ```
     * const [code, vendorCode] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    StatusCode = 0x103,

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
     * Notifies that the internal state of the service changed.
     */
    Change = 0x3,
}

// Service: Base service
export enum BaseReg {
    /**
     * Reports the current state or error status of the device. ``code`` is a standardized value from
     * the JACDAC error codes. ``vendor_code`` is any vendor specific error code describing the device
     * state. This report is typically not queried, when a device has an error, it will typically
     * add this report in frame along with the announce packet.
     *
     * ```
     * const [code, vendorCode] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    StatusCode = 0x103,
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
     * Read-write ratio uint8_t. The volume (duty cycle) of the buzzer.
     *
     * ```
     * const [volume] = jdunpack<[number]>(buf, "u8")
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

// Service: CODAL Message Bus
export const SRV_CODAL_MESSAGE_BUS = 0x16ad7cd5
export enum CodalMessageBusCmd {
    /**
     * Sends a new event on the message bus.
     *
     * ```
     * const [id, event] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    Send = 0x80,
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
     * Specifies a status light animation sequence on a colored or monochrome LED.
     * ``hue``, ``saturation``, ``value`` are the components of an HSV color
     * and ``duration8`` is the duration of transition to the next color in the array, in units of ``8ms``.
     * Module with monochrome LED can ignore ``hue``, ``saturation`` and use ``value``. The animation is played in a loop.
     * Typically, up to 8 steps (repeats) are supported.
     * Set the register to empty buffer to disable the animation.
     * The status light is also used by JACDAC software stack to indicate various status mode
     * and this animation may be overridden when those modes are enabled.
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

// Service: Gamepad
export const SRV_GAMEPAD = 0x1deaa06e

export enum GamepadButton { // uint16_t
    Left = 0x1,
    Up = 0x2,
    Right = 0x3,
    Down = 0x4,
    A = 0x5,
    B = 0x6,
    Menu = 0x7,
    MenuAlt = 0x8,
    Reset = 0x9,
    Exit = 0xa,
}

export enum GamepadCmd {
    /**
     * No args. Indicates number of players supported and which buttons are present on the controller.
     */
    Announce = 0x0,

    /**
     * report Announce
     * ```
     * const [flags, numPlayers, buttonPresent] = jdunpack<[number, number, GamepadButton[]]>(buf, "u8 u8 u16[]")
     * ```
     */
}

export enum GamepadReg {
    /**
     * Indicates which buttons are currently active (pressed).
     * `pressure` should be `0xff` for digital buttons, and proportional for analog ones.
     *
     * ```
     * const [rest] = jdunpack<[([GamepadButton, number, number])[]]>(buf, "r: u16 u8 u8")
     * const [button, playerIndex, pressure] = rest[0]
     * ```
     */
    Buttons = 0x101,
}

export enum GamepadEvent {
    /**
     * Emitted when button goes from inactive to active.
     *
     * ```
     * const [button, playerIndex] = jdunpack<[GamepadButton, number]>(buf, "u16 u16")
     * ```
     */
    Down = 0x1,

    /**
     * Emitted when button goes from active to inactive.
     *
     * ```
     * const [button, playerIndex] = jdunpack<[GamepadButton, number]>(buf, "u16 u16")
     * ```
     */
    Up = 0x2,
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

// Service: Keyboard
export const SRV_KEYBOARD = 0x18b05b6a

export enum KeyboardModifiers { // uint8_t
    LeftControl = 0xe0,
    LeftShift = 0xe1,
    LeftAlt = 0xe2,
    LeftGUID = 0xe3,
    RightControl = 0xe4,
    RightShift = 0xe5,
    RightAlt = 0xe6,
    RightGUID = 0xe7,
}


export enum KeyboardAction { // uint8_t
    Press = 0x0,
    Up = 0x1,
    Down = 0x2,
}

export enum KeyboardCmd {
    /**
     * Presses a key or a sequence of keys down.
     *
     * ```
     * const [rest] = jdunpack<[([number, KeyboardModifiers, KeyboardAction])[]]>(buf, "r: u16 u8 u8")
     * const [selector, modifiers, action] = rest[0]
     * ```
     */
    Key = 0x80,

    /**
     * No args. Clears all pressed keys.
     */
    Clear = 0x81,
}

// Service: LED Matrix Controller
export const SRV_LED_MATRIX_CONTROLLER = 0x1d35e393
export enum LedMatrixControllerReg {
    /**
     * Read-write bytes. Read or writes the state of the screen where pixel on/off state is
     * stored as a bit, column by column. The column should be byte aligned.
     *
     * ```
     * const [leds] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Leds = 0x80,

    /**
     * Read-write bool (uint8_t). Disables or enables the whole screen.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x81,

    /**
     * Read-write uint8_t. Sets the general brightness of the LEDs.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Brightness = 0x82,

    /**
     * Constant # uint16_t. Number of rows on the screen
     *
     * ```
     * const [rows] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    Rows = 0x83,

    /**
     * Constant # uint16_t. Number of columns on the screen
     *
     * ```
     * const [columns] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    Columns = 0x84,
}

export enum LedMatrixControllerCmd {
    /**
     * No args. Shorthand command to clear all the LEDs on the screen.
     */
    Clear = 0x80,
}

// Service: LED Matrix Display
export const SRV_LED_MATRIX_DISPLAY = 0x110d154b
export enum LedMatrixDisplayReg {
    /**
     * Read-only bytes. Streams the state of the screen where pixel on/off state is
     * stored as a bit, column by column. The column should be byte aligned.
     *
     * ```
     * const [leds] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Leds = 0x101,
}

// Service: Light
export const SRV_LIGHT = 0x126f00e0

export enum LightLightType { // uint8_t
    WS2812B_GRB = 0x0,
    APA102 = 0x10,
    SK9822 = 0x11,
}


export enum LightVariant { // uint32_t
    Strip = 0x1,
    Ring = 0x2,
    Stick = 0x3,
    Jewel = 0x4,
}

export enum LightReg {
    /**
     * Read-write ratio uint8_t. Set the luminosity of the strip.
     * At `0` the power to the strip is completely shut down.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Brightness = 0x1,

    /**
     * Read-only ratio uint8_t. This is the luminosity actually applied to the strip.
     * May be lower than `brightness` if power-limited by the `max_power` register.
     * It will rise slowly (few seconds) back to `brightness` is limits are no longer required.
     *
     * ```
     * const [actualBrightness] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    ActualBrightness = 0x180,

    /**
     * Read-write LightType (uint8_t). Specifies the type of light strip connected to controller.
     * Controllers which are sold with lights should default to the correct type
     * and could not allow change.
     *
     * ```
     * const [lightType] = jdunpack<[LightLightType]>(buf, "u8")
     * ```
     */
    LightType = 0x80,

    /**
     * Read-write uint16_t. Specifies the number of pixels in the strip.
     * Controllers which are sold with lights should default to the correct length
     * and could not allow change.
     * Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.
     *
     * ```
     * const [numPixels] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    NumPixels = 0x81,

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
     * const [variant] = jdunpack<[LightVariant]>(buf, "u32")
     * ```
     */
    Variant = 0x107,
}

export enum LightCmd {
    /**
     * Argument: program bytes. Run the given light "program". See service description for details.
     *
     * ```
     * const [program] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Run = 0x81,
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

// Service: Mono Light
export const SRV_MONO_LIGHT = 0x1fb57453
export enum MonoLightReg {
    /**
     * Read-write ratio uint16_t. Set the luminosity of the strip. The value is used to scale `start_intensity` in `steps` register.
     * At `0` the power to the strip is completely shut down.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    Brightness = 0x1,

    /**
     * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
     *
     * ```
     * const [maxPower] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxPower = 0x7,

    /**
     * Constant uint8_t. Maximum number of steps allowed in animation definition. This determines the size of the `steps` register.
     *
     * ```
     * const [maxSteps] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    MaxSteps = 0x180,

    /**
     * The steps of current animation. Setting this also sets `current_iteration` to `0`.
     * Step with `duration == 0` is treated as an end marker.
     *
     * ```
     * const [rest] = jdunpack<[([number, number])[]]>(buf, "r: u16 u16")
     * const [startIntensity, duration] = rest[0]
     * ```
     */
    Steps = 0x82,

    /**
     * Read-write uint16_t. Currently excecuting iteration of animation. Can be set to `0` to restart current animation.
     * If `current_iteration > max_iterations`, then no animation is currently running.
     *
     * ```
     * const [currentIteration] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    CurrentIteration = 0x80,

    /**
     * Read-write uint16_t. The animation will be repeated `max_iterations + 1` times.
     *
     * ```
     * const [maxIterations] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxIterations = 0x81,
}

// Service: Motor
export const SRV_MOTOR = 0x17004cd8
export enum MotorReg {
    /**
     * Read-write ratio int16_t. PWM duty cycle of the motor. Use negative/positive values to run the motor forwards and backwards.
     * Positive is recommended to be clockwise rotation and negative counterclockwise. A duty of ``0``
     * while ``enabled`` acts as brake.
     *
     * ```
     * const [duty] = jdunpack<[number]>(buf, "i16")
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

// Service: Mouse
export const SRV_MOUSE = 0x1885dc1c

export enum MouseButton { // uint16_t
    Right = 0x1,
    Middle = 0x4,
    Left = 0x2,
}


export enum MouseButtonEvent { // uint8_t
    Up = 0x1,
    Down = 0x2,
    Click = 0x3,
    DoubleClick = 0x4,
}

export enum MouseCmd {
    /**
     * Sets the up/down state of one or more buttons.
     * A ``Click`` is the same as ``Down`` followed by ``Up`` after 100ms.
     * A ``DoubleClick`` is two clicks with ``150ms`` gap between them (that is, ``100ms`` first click, ``150ms`` gap, ``100ms`` second click).
     *
     * ```
     * const [buttons, event] = jdunpack<[MouseButton, MouseButtonEvent]>(buf, "u16 u8")
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
     * Read-only ratio uint16_t. The relative position of the slider between `0x0000` and `0xffff`.
     *
     * ```
     * const [position] = jdunpack<[number]>(buf, "u16")
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
     * Read-only ratio uint16_t. Fraction of charge in the battery.
     *
     * ```
     * const [batteryCharge] = jdunpack<[number]>(buf, "u16")
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


// Service: Relay
export const SRV_RELAY = 0x183fe656

export enum RelayVariant { // uint32_t
    Electromechanical = 0x1,
    SolidState = 0x2,
    Reed = 0x3,
}

export enum RelayReg {
    /**
     * Read-write bool (uint8_t). Indicates whether the relay is currently on (closed).
     *
     * ```
     * const [conducting] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Conducting = 0x1,

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
export const SRV_ROLE_MANAGER = 0x119c3ad1
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
     * Argument: device_id devid (uint64_t). Get the role corresponding to given device identifer. Returns empty string if unset.
     *
     * ```
     * const [deviceId] = jdunpack<[Uint8Array]>(buf, "b[8]")
     * ```
     */
    GetRole = 0x80,

    /**
     * report GetRole
     * ```
     * const [deviceId, role] = jdunpack<[Uint8Array, string]>(buf, "b[8] s")
     * ```
     */

    /**
     * Set role. Can set to empty to remove role binding.
     *
     * ```
     * const [deviceId, role] = jdunpack<[Uint8Array, string]>(buf, "b[8] s")
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
     * Argument: required_roles pipe (bytes). List all roles required by the current program. `device_id` is `0` if role is unbound.
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
 * const [deviceId, role] = jdunpack<[Uint8Array, string]>(buf, "b[8] s")
 * ```
 */

/**
 * pipe_report RequiredRoles
 * ```
 * const [deviceId, serviceClass, roles] = jdunpack<[Uint8Array, number, string]>(buf, "b[8] u32 s")
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

// Service: Switch
export const SRV_SWITCH = 0x1ad29402

export enum SwitchVariant { // uint32_t
    Slide = 0x1,
    Tilt = 0x2,
    PushButton = 0x3,
    Tactile = 0x4,
    Toggle = 0x5,
    Proximity = 0x6,
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

// Service: Vibration motor
export const SRV_VIBRATION_MOTOR = 0x183fc4a2
export enum VibrationMotorReg {
    /**
     * Read-write ratio uint8_t. Rotation speed of the motor.
     * If only one rotation speed is supported, then `0` shell be off, and any other number on.
     *
     * ```
     * const [speed] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Speed = 0x1,
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

