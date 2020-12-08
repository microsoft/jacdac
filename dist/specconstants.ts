// Service: Common registers and commands
export const SRV_SYSTEM_EVENT_REPORT_PACK_FORMAT = "u32 u32"
export const SRV_SYSTEM_INTENSITY_RW_PACK_FORMAT = "u32"
export const SRV_SYSTEM_VALUE_RW_PACK_FORMAT = "i32"
export const SRV_SYSTEM_MAX_POWER_RW_PACK_FORMAT = "u16"
export const SRV_SYSTEM_STREAMING_SAMPLES_RW_PACK_FORMAT = "u8"
export const SRV_SYSTEM_STREAMING_INTERVAL_RW_PACK_FORMAT = "u32"
export const SRV_SYSTEM_READING_RO_PACK_FORMAT = "i32"
export const SRV_SYSTEM_LOW_THRESHOLD_RW_PACK_FORMAT = "i32"
export const SRV_SYSTEM_HIGH_THRESHOLD_RW_PACK_FORMAT = "i32"
export const SRV_SYSTEM_STATUS_CODE_RO_PACK_FORMAT = "u16 u16"
export const SRV_SYSTEM_STREAMING_PREFERRED_INTERVAL_CONST_PACK_FORMAT = "u32"
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
     */
    Intensity = 0x1,

    /**
     * Read-write int32_t. The primary value of actuator (eg. servo pulse length, or motor duty cycle).
     */
    Value = 0x2,

    /**
     * Read-write mA uint16_t. Limit the power drawn by the service, in mA.
     */
    MaxPower = 0x7,

    /**
     * Read-write uint8_t. Asks device to stream a given number of samples
     * (clients will typically write `255` to this register every second or so, while streaming is required).
     */
    StreamingSamples = 0x3,

    /**
     * Read-write ms uint32_t. Period between packets of data when streaming in milliseconds.
     */
    StreamingInterval = 0x4,

    /**
     * Read-only int32_t. Read-only value of the sensor, also reported in streaming.
     */
    Reading = 0x101,

    /**
     * Read-write int32_t. Thresholds for event generation for event generation for analog sensors.
     */
    LowThreshold = 0x5,

    /**
     * Read-write int32_t. Thresholds for event generation for event generation for analog sensors.
     */
    HighThreshold = 0x6,

    /**
     * Reports the current state or error status of the device. ``code`` is a standardized value from
     * the JACDAC error codes. ``vendor_code`` is any vendor specific error code describing the device
     * state. This report is typically not queried, when a device has an error, it will typically
     * add this report in frame along with the anounce packet.
     *
     * ```
     * const [code, vendorCode] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    StatusCode = 0x103,

    /**
     * Constant ms uint32_t. Preferred default streaming interval for sensor in milliseconds.
     */
    StreamingPreferredInterval = 0x102,
}

export enum SystemEvent {
    /**
     * Emit notifying that the internal state of the service changed.
     */
    Change = 0x2,
}

// Service: Base service
export const SRV_BASE_STATUS_CODE_RO_PACK_FORMAT = "u16 u16"
export enum BaseReg {
    /**
     * Reports the current state or error status of the device. ``code`` is a standardized value from
     * the JACDAC error codes. ``vendor_code`` is any vendor specific error code describing the device
     * state. This report is typically not queried, when a device has an error, it will typically
     * add this report in frame along with the anounce packet.
     *
     * ```
     * const [code, vendorCode] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    StatusCode = 0x103,
}

// Service: Sensor
export const SRV_SENSOR_STREAMING_SAMPLES_RW_PACK_FORMAT = "u8"
export const SRV_SENSOR_STREAMING_INTERVAL_RW_PACK_FORMAT = "u32"
export const SRV_SENSOR_STREAMING_PREFERRED_INTERVAL_CONST_PACK_FORMAT = "u32"
export enum SensorReg {
    /**
     * Read-write uint8_t. Asks device to stream a given number of samples
     * (clients will typically write `255` to this register every second or so, while streaming is required).
     */
    StreamingSamples = 0x3,

    /**
     * Read-write ms uint32_t. Period between packets of data when streaming in milliseconds.
     */
    StreamingInterval = 0x4,

    /**
     * Constant ms uint32_t. Preferred default streaming interval for sensor in milliseconds.
     */
    StreamingPreferredInterval = 0x102,
}

// Service: Accelerometer
export const SRV_ACCELEROMETER = 0x1f140409
export const SRV_ACCELEROMETER_FORCES_RO_PACK_FORMAT = "i6.10 i6.10 i6.10"
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
    TiltUp = 0x1,

    /**
     * Emitted when accelerometer is tilted in the given direction.
     */
    TiltDown = 0x2,

    /**
     * Emitted when accelerometer is tilted in the given direction.
     */
    TiltLeft = 0x3,

    /**
     * Emitted when accelerometer is tilted in the given direction.
     */
    TiltRight = 0x4,

    /**
     * Emitted when accelerometer is laying flat in the given direction.
     */
    FaceUp = 0x5,

    /**
     * Emitted when accelerometer is laying flat in the given direction.
     */
    FaceDown = 0x6,

    /**
     * Emitted when total force acting on accelerometer is much less than 1g.
     */
    Freefall = 0x7,

    /**
     * Emitted when forces change violently a few times.
     */
    Shake = 0xb,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force_2g = 0xc,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force_3g = 0x8,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force_6g = 0x9,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force_8g = 0xa,
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

export const SRV_SENSOR_AGGREGATOR_INPUTS_RW_PACK_FORMAT = "u16 u16 u32 r: b[8] u32 u8 u8 u8 i8"
export const SRV_SENSOR_AGGREGATOR_NUM_SAMPLES_RO_PACK_FORMAT = "u32"
export const SRV_SENSOR_AGGREGATOR_SAMPLE_SIZE_RO_PACK_FORMAT = "u8"
export const SRV_SENSOR_AGGREGATOR_STREAMING_SAMPLES_RW_PACK_FORMAT = "u32"
export const SRV_SENSOR_AGGREGATOR_CURRENT_SAMPLE_RO_PACK_FORMAT = "b"
export enum SensorAggregatorReg {
    /**
     * Set automatic input collection.
     * These settings are stored in flash.
     *
     * ```
     * const [samplingInterval, samplesInWindow, rest] = jdunpack<[number, number, ([UInt8Array, number, number, number, SensorAggregatorSampleType, number])[]]>(buf, "u16 u16 x[4] r: b[8] u32 u8 u8 u8 i8")
     * const [deviceId, serviceClass, serviceNum, sampleSize, sampleType, sampleShift] = rest[0]
     * ```
     */
    Inputs = 0x80,

    /**
     * Read-only uint32_t. Number of input samples collected so far.
     */
    NumSamples = 0x180,

    /**
     * Read-only B uint8_t. Size of a single sample.
     */
    SampleSize = 0x181,

    /**
     * Read-write uint32_t. When set to `N`, will stream `N` samples as `current_sample` reading.
     */
    StreamingSamples = 0x81,

    /**
     * Read-only bytes. Last collected sample.
     */
    CurrentSample = 0x101,
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

export const SRV_BOOTLOADER_INFO_REPORT_PACK_FORMAT = "u32 u32 u32 u32"
export const SRV_BOOTLOADER_SET_SESSION_COMMAND_PACK_FORMAT = "u32"
export const SRV_BOOTLOADER_SET_SESSION_REPORT_PACK_FORMAT = "u32"
export const SRV_BOOTLOADER_PAGE_DATA_COMMAND_PACK_FORMAT = "u32 u16 u8 u8 u32 u32 u32 u32 u32 b[208]"
export const SRV_BOOTLOADER_PAGE_DATA_REPORT_PACK_FORMAT = "u32 u32 u32"
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
     */
    SetSession = 0x81,

    /**
     * Use to send flashing data. A physical page is split into `chunk_max + 1` chunks, where `chunk_no = 0 ... chunk_max`.
     * Each chunk is stored at `page_address + page_offset`. `page_address` has to be equal in all chunks,
     * and is included in response.
     * Only the last chunk causes writing to flash and elicits response.
     *
     * ```
     * const [pageAddress, pageOffset, chunkNo, chunkMax, sessionId, pageData] = jdunpack<[number, number, number, number, number, UInt8Array]>(buf, "u32 u16 u8 u8 u32 x[4] x[4] x[4] x[4] b[208]")
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
export const SRV_BUTTON_PRESSED_RO_PACK_FORMAT = "u8"
export enum ButtonReg {
    /**
     * Read-only bool (uint8_t). Indicates whether the button is currently active (pressed).
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
    Click = 0x3,

    /**
     * Emitted together with `up` when the press time was more than 500ms.
     */
    LongClick = 0x4,
}

// Service: Buzzer
export const SRV_BUZZER = 0x1b57b1d7
export const SRV_BUZZER_VOLUME_RW_PACK_FORMAT = "u8"
export const SRV_BUZZER_PLAY_TONE_COMMAND_PACK_FORMAT = "u16 u16 u16"
export enum BuzzerReg {
    /**
     * Read-write ratio uint8_t. The volume (duty cycle) of the buzzer.
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
export const SRV_CODAL_MESSAGE_BUS_SEND_COMMAND_PACK_FORMAT = "u16 u16"
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

export const SRV_CONTROL_SERVICES_REPORT_PACK_FORMAT = "u8 u8 u16 r: u32"
export const SRV_CONTROL_DEVICE_DESCRIPTION_CONST_PACK_FORMAT = "s"
export const SRV_CONTROL_FIRMWARE_IDENTIFIER_CONST_PACK_FORMAT = "u32"
export const SRV_CONTROL_BOOTLOADER_FIRMWARE_IDENTIFIER_CONST_PACK_FORMAT = "u32"
export const SRV_CONTROL_FIRMWARE_VERSION_CONST_PACK_FORMAT = "s"
export const SRV_CONTROL_MCU_TEMPERATURE_RO_PACK_FORMAT = "i16"
export const SRV_CONTROL_UPTIME_RO_PACK_FORMAT = "u64"
export const SRV_CONTROL_DEVICE_URL_CONST_PACK_FORMAT = "s"
export const SRV_CONTROL_FIRMWARE_URL_CONST_PACK_FORMAT = "s"
export enum ControlCmd {
    /**
     * No args. The `restart_counter` starts at `0x1` and increments by one until it reaches `0xf`, then it stays at `0xf`.
     * If this number ever goes down, it indicates that the device restarted.
     * The upper 4 bits of `restart_counter` are reserved.
     * `service_class` indicates class identifier for each service index (service index `0` is always control, so it's
     * skipped in this enumeration).
     * The command form can be used to induce report, which is otherwise broadcast every 500ms.
     */
    Services = 0x0,

    /**
     * report Services
     * ```
     * const [restartCounter, flags, serviceClass] = jdunpack<[number, ControlAnnounceFlags, number[]]>(buf, "u8 u8 x[2] u32[]")
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
}

export enum ControlReg {
    /**
     * Constant string (bytes). Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)
     */
    DeviceDescription = 0x180,

    /**
     * Constant uint32_t. A numeric code for the string above; used to identify firmware images and devices.
     */
    FirmwareIdentifier = 0x181,

    /**
     * Constant uint32_t. Typically the same as `firmware_identifier` unless device was flashed by hand; the bootloader will respond to that code.
     */
    BootloaderFirmwareIdentifier = 0x184,

    /**
     * Constant string (bytes). A string describing firmware version; typically semver.
     */
    FirmwareVersion = 0x185,

    /**
     * Read-only °C int16_t. MCU temperature in degrees Celsius (approximate).
     */
    McuTemperature = 0x182,

    /**
     * Read-only μs uint64_t. Number of microseconds since boot.
     */
    Uptime = 0x186,

    /**
     * Constant string (bytes). Request the information web site for this device
     */
    DeviceUrl = 0x187,

    /**
     * Constant string (bytes). URL with machine-readable metadata information about updating device firmware
     */
    FirmwareUrl = 0x188,
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

export const SRV_GAMEPAD_ANNOUNCE_REPORT_PACK_FORMAT = "u8 u8 r: u16"
export const SRV_GAMEPAD_BUTTONS_RO_PACK_FORMAT = "r: u16 u8 u8"
export const SRV_GAMEPAD_DOWN_EVENT_PACK_FORMAT = "u16 u16"
export const SRV_GAMEPAD_UP_EVENT_PACK_FORMAT = "u16 u16"
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
export const SRV_HUMIDITY_HUMIDITY_RO_PACK_FORMAT = "u22.10"
export enum HumidityReg {
    /**
     * Read-only %RH u22.10 (uint32_t). The relative humidity in percentage of full water saturation.
     */
    Humidity = 0x101,
}

// Service: Azure IoT Hub
export const SRV_IOT_HUB = 0x19ed364c
export const SRV_IOT_HUB_SEND_STRING_MSG_COMMAND_PACK_FORMAT = "z r: z z"
export const SRV_IOT_HUB_SEND_MSG_EXT_REPORT_PACK_FORMAT = "u16"
export const SRV_IOT_HUB_MESSAGE_PIPE_COMMAND_PACK_FORMAT = "b"
export const SRV_IOT_HUB_PROPERTIES_META_PIPE_COMMAND_PACK_FORMAT = "r: z z"
export const SRV_IOT_HUB_SUBSCRIBE_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_IOT_HUB_DEVICEBOUND_PROPERTIES_META_PIPE_REPORT_PACK_FORMAT = "r: z z"
export const SRV_IOT_HUB_DEVICEBOUND_PIPE_REPORT_PACK_FORMAT = "b"
export const SRV_IOT_HUB_GET_TWIN_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_IOT_HUB_TWIN_JSON_PIPE_REPORT_PACK_FORMAT = "b"
export const SRV_IOT_HUB_TWIN_ERROR_META_PIPE_REPORT_PACK_FORMAT = "u32"
export const SRV_IOT_HUB_SUBSCRIBE_TWIN_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_IOT_HUB_TWIN_UPDATE_JSON_PIPE_REPORT_PACK_FORMAT = "b"
export const SRV_IOT_HUB_PATCH_TWIN_REPORT_PACK_FORMAT = "u16"
export const SRV_IOT_HUB_TWIN_PATCH_JSON_PIPE_COMMAND_PACK_FORMAT = "b"
export const SRV_IOT_HUB_SUBSCRIBE_METHOD_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_IOT_HUB_METHOD_CALL_BODY_PIPE_REPORT_PACK_FORMAT = "b"
export const SRV_IOT_HUB_METHOD_CALL_META_PIPE_REPORT_PACK_FORMAT = "z z"
export const SRV_IOT_HUB_RESPOND_TO_METHOD_COMMAND_PACK_FORMAT = "u32 z"
export const SRV_IOT_HUB_RESPOND_TO_METHOD_REPORT_PACK_FORMAT = "u16"
export const SRV_IOT_HUB_METHOD_RESPONSE_PIPE_COMMAND_PACK_FORMAT = "b"
export const SRV_IOT_HUB_CONNECTION_STATUS_RO_PACK_FORMAT = "s"
export const SRV_IOT_HUB_CONNECTION_STRING_RW_PACK_FORMAT = "s"
export const SRV_IOT_HUB_HUB_NAME_RO_PACK_FORMAT = "s"
export const SRV_IOT_HUB_DEVICE_ID_RO_PACK_FORMAT = "s"
export const SRV_IOT_HUB_CONNECTION_ERROR_EVENT_PACK_FORMAT = "s"
export const SRV_IOT_HUB_DEVICEBOUND_STR_EVENT_PACK_FORMAT = "z r: z z"
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
     * Argument: devicebound pipe (bytes). Subscribes for cloud to device messages, which will be sent over the specified pipe.
     */
    Subscribe = 0x84,

    /**
     * Argument: twin_result pipe (bytes). Ask for current device digital twin.
     */
    GetTwin = 0x85,

    /**
     * Argument: twin_updates pipe (bytes). Subscribe to updates to our twin.
     */
    SubscribeTwin = 0x87,

    /**
     * No args. Start twin update.
     */
    PatchTwin = 0x86,

    /**
     * Argument: method_call pipe (bytes). Subscribe to direct method calls.
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
}

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
     */
    ConnectionStatus = 0x180,

    /**
     * Read-write string (bytes). Connection string typically looks something like
     * `HostName=my-iot-hub.azure-devices.net;DeviceId=my-dev-007;SharedAccessKey=xyz+base64key`.
     * You can get it in `Shared access policies -> iothubowner -> Connection string-primary key` in the Azure Portal.
     * This register is write-only.
     * You can use `hub_name` and `device_id` to check if connection string is set, but you cannot get the shared access key.
     */
    ConnectionString = 0x80,

    /**
     * Read-only string (bytes). Something like `my-iot-hub.azure-devices.net`; empty string when `connection_string` is not set.
     */
    HubName = 0x181,

    /**
     * Read-only string (bytes). Something like `my-dev-007`; empty string when `connection_string` is not set.
     */
    DeviceId = 0x182,
}

export enum IotHubEvent {
    /**
     * Emitted upon successful connection.
     */
    Connected = 0x1,

    /**
     * Argument: reason string (bytes). Emitted when connection was lost.
     */
    ConnectionError = 0x2,

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
    DeviceboundStr = 0x3,
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

export const SRV_KEYBOARD_KEY_COMMAND_PACK_FORMAT = "r: u16 u8 u8"
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
export const SRV_LED_MATRIX_CONTROLLER_LEDS_RW_PACK_FORMAT = "b"
export const SRV_LED_MATRIX_CONTROLLER_ENABLED_RW_PACK_FORMAT = "u8"
export const SRV_LED_MATRIX_CONTROLLER_BRIGHTNESS_RW_PACK_FORMAT = "u8"
export const SRV_LED_MATRIX_CONTROLLER_ROWS_CONST_PACK_FORMAT = "u16"
export const SRV_LED_MATRIX_CONTROLLER_COLUMNS_CONST_PACK_FORMAT = "u16"
export enum LedMatrixControllerReg {
    /**
     * Read-write bytes. Read or writes the state of the screen where pixel on/off state is
     * stored as a bit, column by column. The column should be byte aligned.
     */
    Leds = 0x80,

    /**
     * Read-write bool (uint8_t). Disables or enables the whole screen.
     */
    Enabled = 0x81,

    /**
     * Read-write uint8_t. Sets the general brightness of the LEDs.
     */
    Brightness = 0x82,

    /**
     * Constant # uint16_t. Number of rows on the screen
     */
    Rows = 0x83,

    /**
     * Constant # uint16_t. Number of columns on the screen
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
export const SRV_LED_MATRIX_DISPLAY_LEDS_RO_PACK_FORMAT = "b"
export enum LedMatrixDisplayReg {
    /**
     * Read-only bytes. Streams the state of the screen where pixel on/off state is
     * stored as a bit, column by column. The column should be byte aligned.
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

export const SRV_LIGHT_BRIGHTNESS_RW_PACK_FORMAT = "u8"
export const SRV_LIGHT_ACTUAL_BRIGHTNESS_RO_PACK_FORMAT = "u8"
export const SRV_LIGHT_LIGHT_TYPE_RW_PACK_FORMAT = "u8"
export const SRV_LIGHT_NUM_PIXELS_RW_PACK_FORMAT = "u16"
export const SRV_LIGHT_MAX_POWER_RW_PACK_FORMAT = "u16"
export const SRV_LIGHT_RUN_COMMAND_PACK_FORMAT = "b"
export enum LightReg {
    /**
     * Read-write ratio uint8_t. Set the luminosity of the strip.
     * At `0` the power to the strip is completely shut down.
     */
    Brightness = 0x1,

    /**
     * Read-only ratio uint8_t. This is the luminosity actually applied to the strip.
     * May be lower than `brightness` if power-limited by the `max_power` register.
     * It will rise slowly (few seconds) back to `brightness` is limits are no longer required.
     */
    ActualBrightness = 0x180,

    /**
     * Read-write LightType (uint8_t). Specifies the type of light strip connected to controller.
     * Controllers which are sold with lights should default to the correct type
     * and could not allow change.
     */
    LightType = 0x80,

    /**
     * Read-write uint16_t. Specifies the number of pixels in the strip.
     * Controllers which are sold with lights should default to the correct length
     * and could not allow change.
     * Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.
     */
    NumPixels = 0x81,

    /**
     * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
     */
    MaxPower = 0x7,
}

export enum LightCmd {
    /**
     * Argument: program bytes. Run the given light "program". See service description for details.
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
}

export const SRV_LOGGER_MIN_PRIORITY_RW_PACK_FORMAT = "u8"
export const SRV_LOGGER_DEBUG_REPORT_PACK_FORMAT = "s"
export const SRV_LOGGER_LOG_REPORT_PACK_FORMAT = "s"
export const SRV_LOGGER_WARN_REPORT_PACK_FORMAT = "s"
export const SRV_LOGGER_ERROR_REPORT_PACK_FORMAT = "s"
export enum LoggerReg {
    /**
     * Read-write Priority (uint8_t). Messages with level lower than this won't be emitted. The default setting may vary.
     * Loggers should revert this to their default setting if the register has not been
     * updated in 3000ms, and also keep the lowest setting they have seen in the last 1500ms.
     * Thus, clients should write this register every 1000ms and ignore messages which are
     * too verbose for them.
     */
    MinPriority = 0x80,
}

export enum LoggerCmd {
    /**
     * Argument: message string (bytes). Report a message.
     */
    Debug = 0x80,

    /**
     * Argument: message string (bytes). Report a message.
     */
    Log = 0x81,

    /**
     * Argument: message string (bytes). Report a message.
     */
    Warn = 0x82,

    /**
     * Argument: message string (bytes). Report a message.
     */
    Error = 0x83,
}

// Service: Microphone
export const SRV_MICROPHONE = 0x113dac86
export const SRV_MICROPHONE_SAMPLE_COMMAND_PACK_FORMAT = "b[12] u32"
export const SRV_MICROPHONE_SAMPLING_PERIOD_RW_PACK_FORMAT = "u32"
export enum MicrophoneCmd {
    /**
     * The samples will be streamed back over the `samples` pipe.
     * If `num_samples` is `0`, streaming will only stop when the pipe is closed.
     * Otherwise the specified number of samples is streamed.
     * Samples are sent as `i16`.
     *
     * ```
     * const [samples, numSamples] = jdunpack<[UInt8Array, number]>(buf, "b[12] u32")
     * ```
     */
    Sample = 0x81,
}

export enum MicrophoneReg {
    /**
     * Read-write μs uint32_t. Get or set microphone sampling period.
     * Sampling rate is `1_000_000 / sampling_period Hz`.
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

export const SRV_MODEL_RUNNER_SET_MODEL_COMMAND_PACK_FORMAT = "u32"
export const SRV_MODEL_RUNNER_SET_MODEL_REPORT_PACK_FORMAT = "u16"
export const SRV_MODEL_RUNNER_PREDICT_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_MODEL_RUNNER_PREDICT_REPORT_PACK_FORMAT = "u16"
export const SRV_MODEL_RUNNER_AUTO_INVOKE_EVERY_RW_PACK_FORMAT = "u16"
export const SRV_MODEL_RUNNER_OUTPUTS_RO_PACK_FORMAT = "r: f32"
export const SRV_MODEL_RUNNER_INPUT_SHAPE_RO_PACK_FORMAT = "r: u16"
export const SRV_MODEL_RUNNER_OUTPUT_SHAPE_RO_PACK_FORMAT = "r: u16"
export const SRV_MODEL_RUNNER_LAST_RUN_TIME_RO_PACK_FORMAT = "u32"
export const SRV_MODEL_RUNNER_ALLOCATED_ARENA_SIZE_RO_PACK_FORMAT = "u32"
export const SRV_MODEL_RUNNER_MODEL_SIZE_RO_PACK_FORMAT = "u32"
export const SRV_MODEL_RUNNER_LAST_ERROR_RO_PACK_FORMAT = "s"
export const SRV_MODEL_RUNNER_FORMAT_CONST_PACK_FORMAT = "u32"
export const SRV_MODEL_RUNNER_FORMAT_VERSION_CONST_PACK_FORMAT = "u32"
export const SRV_MODEL_RUNNER_PARALLEL_CONST_PACK_FORMAT = "u8"
export enum ModelRunnerCmd {
    /**
     * Argument: model_size B uint32_t. Open pipe for streaming in the model. The size of the model has to be declared upfront.
     * The model is streamed over regular pipe data packets.
     * The format supported by this instance of the service is specified in `format` register.
     * When the pipe is closed, the model is written all into flash, and the device running the service may reset.
     */
    SetModel = 0x80,

    /**
     * Argument: outputs pipe (bytes). Open channel that can be used to manually invoke the model. When enough data is sent over the `inputs` pipe, the model is invoked,
     * and results are send over the `outputs` pipe.
     */
    Predict = 0x81,
}

export enum ModelRunnerReg {
    /**
     * Read-write uint16_t. When register contains `N > 0`, run the model automatically every time new `N` samples are collected.
     * Model may be run less often if it takes longer to run than `N * sampling_interval`.
     * The `outputs` register will stream its value after each run.
     * This register is not stored in flash.
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
     */
    LastRunTime = 0x182,

    /**
     * Read-only B uint32_t. Number of RAM bytes allocated for model execution.
     */
    AllocatedArenaSize = 0x183,

    /**
     * Read-only B uint32_t. The size of the model in bytes.
     */
    ModelSize = 0x184,

    /**
     * Read-only string (bytes). Textual description of last error when running or loading model (if any).
     */
    LastError = 0x185,

    /**
     * Constant ModelFormat (uint32_t). The type of ML models supported by this service.
     * `TFLite` is flatbuffer `.tflite` file.
     * `ML4F` is compiled machine code model for Cortex-M4F.
     * The format is typically present as first or second little endian word of model file.
     */
    Format = 0x186,

    /**
     * Constant uint32_t. A version number for the format.
     */
    FormatVersion = 0x187,

    /**
     * Constant bool (uint8_t). If present and true this service can run models independently of other
     * instances of this service on the device.
     */
    Parallel = 0x188,
}

// Service: Motor
export const SRV_MOTOR = 0x17004cd8
export const SRV_MOTOR_DUTY_RW_PACK_FORMAT = "i16"
export const SRV_MOTOR_ENABLED_RW_PACK_FORMAT = "u8"
export enum MotorReg {
    /**
     * Read-write ratio int16_t. PWM duty cycle of the motor. Use negative/positive values to run the motor forwards and backwards.
     * Positive is recommended to be clockwise rotation and negative counterclockwise.
     */
    Duty = 0x2,

    /**
     * Read-write bool (uint8_t). Turn the power to the motor on/off.
     */
    Enabled = 0x1,
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

export const SRV_MOUSE_SET_BUTTON_COMMAND_PACK_FORMAT = "u16 u8"
export const SRV_MOUSE_MOVE_COMMAND_PACK_FORMAT = "i16 i16 u16"
export const SRV_MOUSE_WHEEL_COMMAND_PACK_FORMAT = "i16 u16"
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
export const SRV_MULTITOUCH_CAPACITY_RO_PACK_FORMAT = "r: i32"
export const SRV_MULTITOUCH_TOUCH_EVENT_PACK_FORMAT = "u32"
export const SRV_MULTITOUCH_RELEASE_EVENT_PACK_FORMAT = "u32"
export const SRV_MULTITOUCH_TAP_EVENT_PACK_FORMAT = "u32"
export const SRV_MULTITOUCH_LONG_PRESS_EVENT_PACK_FORMAT = "u32"
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
     */
    Touch = 0x1,

    /**
     * Argument: channel uint32_t. Emitted when an input is no longer touched.
     */
    Release = 0x2,

    /**
     * Argument: channel uint32_t. Emitted when an input is briefly touched. TODO Not implemented.
     */
    Tap = 0x3,

    /**
     * Argument: channel uint32_t. Emitted when an input is touched for longer than 500ms. TODO Not implemented.
     */
    LongPress = 0x4,

    /**
     * Emitted when input channels are successively touched in order of increasing channel numbers.
     */
    SwipePos = 0x10,

    /**
     * Emitted when input channels are successively touched in order of decreasing channel numbers.
     */
    SwipeNeg = 0x11,
}

// Service: Power
export const SRV_POWER = 0x1fa4c95a
export const SRV_POWER_ENABLED_RW_PACK_FORMAT = "u8"
export const SRV_POWER_MAX_POWER_RW_PACK_FORMAT = "u16"
export const SRV_POWER_OVERLOAD_RO_PACK_FORMAT = "u8"
export const SRV_POWER_CURRENT_DRAW_RO_PACK_FORMAT = "u16"
export const SRV_POWER_BATTERY_VOLTAGE_RO_PACK_FORMAT = "u16"
export const SRV_POWER_BATTERY_CHARGE_RO_PACK_FORMAT = "u16"
export const SRV_POWER_BATTERY_CAPACITY_CONST_PACK_FORMAT = "u32"
export const SRV_POWER_KEEP_ON_PULSE_DURATION_RW_PACK_FORMAT = "u16"
export const SRV_POWER_KEEP_ON_PULSE_PERIOD_RW_PACK_FORMAT = "u16"
export enum PowerReg {
    /**
     * Read-write bool (uint8_t). Turn the power to the bus on/off.
     */
    Enabled = 0x1,

    /**
     * Read-write mA uint16_t. Limit the power provided by the service. The actual maximum limit will depend on hardware.
     * This field may be read-only in some implementations - you should read it back after setting.
     */
    MaxPower = 0x7,

    /**
     * Read-only bool (uint8_t). Indicates whether the power has been shut down due to overdraw.
     */
    Overload = 0x181,

    /**
     * Read-only mA uint16_t. Present current draw from the bus.
     */
    CurrentDraw = 0x101,

    /**
     * Read-only mV uint16_t. Voltage on input.
     */
    BatteryVoltage = 0x180,

    /**
     * Read-only ratio uint16_t. Fraction of charge in the battery.
     */
    BatteryCharge = 0x182,

    /**
     * Constant mWh uint32_t. Energy that can be delivered to the bus when battery is fully charged.
     * This excludes conversion overheads if any.
     */
    BatteryCapacity = 0x183,

    /**
     * Read-write ms uint16_t. Many USB power packs need current to be drawn from time to time to prevent shutdown.
     * This regulates how often and for how long such current is drawn.
     * Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.
     */
    KeepOnPulseDuration = 0x80,

    /**
     * Read-write ms uint16_t. Many USB power packs need current to be drawn from time to time to prevent shutdown.
     * This regulates how often and for how long such current is drawn.
     * Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.
     */
    KeepOnPulsePeriod = 0x81,
}

// Service: Protocol Test
export const SRV_PROTO_TEST = 0x16c7466a
export const SRV_PROTO_TEST_RW_BOOL_RW_PACK_FORMAT = "u8"
export const SRV_PROTO_TEST_RO_BOOL_RO_PACK_FORMAT = "u8"
export const SRV_PROTO_TEST_RW_U32_RW_PACK_FORMAT = "u32"
export const SRV_PROTO_TEST_RO_U32_RO_PACK_FORMAT = "u32"
export const SRV_PROTO_TEST_RW_I32_RW_PACK_FORMAT = "i32"
export const SRV_PROTO_TEST_RO_I32_RO_PACK_FORMAT = "i32"
export const SRV_PROTO_TEST_RW_STRING_RW_PACK_FORMAT = "s"
export const SRV_PROTO_TEST_RO_STRING_RO_PACK_FORMAT = "s"
export const SRV_PROTO_TEST_RW_BYTES_RW_PACK_FORMAT = "b"
export const SRV_PROTO_TEST_RO_BYTES_RO_PACK_FORMAT = "b"
export const SRV_PROTO_TEST_E_BOOL_EVENT_PACK_FORMAT = "u8"
export const SRV_PROTO_TEST_E_U32_EVENT_PACK_FORMAT = "u32"
export const SRV_PROTO_TEST_E_I32_EVENT_PACK_FORMAT = "i32"
export const SRV_PROTO_TEST_C_BOOL_COMMAND_PACK_FORMAT = "u8"
export const SRV_PROTO_TEST_C_U32_COMMAND_PACK_FORMAT = "u32"
export const SRV_PROTO_TEST_C_I32_COMMAND_PACK_FORMAT = "i32"
export enum ProtoTestReg {
    /**
     * Read-write bool (uint8_t). A read write bool register.
     */
    RwBool = 0x81,

    /**
     * Read-only bool (uint8_t). A read only bool register. Mirrors rw_bool.
     */
    RoBool = 0x181,

    /**
     * Read-write uint32_t. A read write u32 register.
     */
    RwU32 = 0x82,

    /**
     * Read-only uint32_t. A read only u32 register.. Mirrors rw_u32.
     */
    RoU32 = 0x182,

    /**
     * Read-write int32_t. A read write i32 register.
     */
    RwI32 = 0x83,

    /**
     * Read-only int32_t. A read only i32 register.. Mirrors rw_i32.
     */
    RoI32 = 0x183,

    /**
     * Read-write string (bytes). A read write string register.
     */
    RwString = 0x84,

    /**
     * Read-only string (bytes). A read only string register. Mirrors rw_string.
     */
    RoString = 0x184,

    /**
     * Read-write bytes. A read write string register.
     */
    RwBytes = 0x85,

    /**
     * Read-only bytes. A read only string register. Mirrors ro_bytes.
     */
    RoBytes = 0x185,
}

export enum ProtoTestEvent {
    /**
     * Argument: bool bool (uint8_t). An event raised when rw_bool is modified
     */
    EBool = 0x180,

    /**
     * Argument: u32 uint32_t. An event raised when rw_u32 is modified
     */
    EU32 = 0x190,

    /**
     * Argument: i32 int32_t. An event raised when rw_i32 is modified
     */
    EI32 = 0x192,
}

export enum ProtoTestCmd {
    /**
     * Argument: bool bool (uint8_t). A command to set rw_bool. Returns the value.
     */
    CBool = 0x80,

    /**
     * Argument: u32 uint32_t. A command to set rw_u32. Returns the value.
     */
    CU32 = 0x81,

    /**
     * Argument: i32 int32_t. A command to set rw_i32. Returns the value.
     */
    CI32 = 0x82,
}

// Service: PWM Light
export const SRV_PWM_LIGHT = 0x1fb57453
export const SRV_PWM_LIGHT_BRIGHTNESS_RW_PACK_FORMAT = "u16"
export const SRV_PWM_LIGHT_MAX_POWER_RW_PACK_FORMAT = "u16"
export const SRV_PWM_LIGHT_MAX_STEPS_CONST_PACK_FORMAT = "u8"
export const SRV_PWM_LIGHT_STEPS_RW_PACK_FORMAT = "r: u16 u16"
export const SRV_PWM_LIGHT_CURRENT_ITERATION_RW_PACK_FORMAT = "u16"
export const SRV_PWM_LIGHT_MAX_ITERATIONS_RW_PACK_FORMAT = "u16"
export enum PwmLightReg {
    /**
     * Read-write ratio uint16_t. Set the luminosity of the strip. The value is used to scale `start_intensity` in `steps` register.
     * At `0` the power to the strip is completely shut down.
     */
    Brightness = 0x1,

    /**
     * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
     */
    MaxPower = 0x7,

    /**
     * Constant uint8_t. Maximum number of steps allowed in animation definition. This determines the size of the `steps` register.
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
     */
    CurrentIteration = 0x80,

    /**
     * Read-write uint16_t. The animation will be repeated `max_iterations + 1` times.
     */
    MaxIterations = 0x81,
}

// Service: Role Manager
export const SRV_ROLE_MANAGER = 0x119c3ad1
export const SRV_ROLE_MANAGER_ALL_ROLES_ALLOCATED_RO_PACK_FORMAT = "u8"
export const SRV_ROLE_MANAGER_GET_ROLE_COMMAND_PACK_FORMAT = "b[8]"
export const SRV_ROLE_MANAGER_GET_ROLE_REPORT_PACK_FORMAT = "b[8] s"
export const SRV_ROLE_MANAGER_SET_ROLE_COMMAND_PACK_FORMAT = "b[8] s"
export const SRV_ROLE_MANAGER_LIST_STORED_ROLES_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_ROLE_MANAGER_STORED_ROLES_PIPE_REPORT_PACK_FORMAT = "b[8] s"
export const SRV_ROLE_MANAGER_LIST_REQUIRED_ROLES_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_ROLE_MANAGER_REQUIRED_ROLES_PIPE_REPORT_PACK_FORMAT = "b[8] u32 s"
export enum RoleManagerReg {
    /**
     * Read-only bool (uint8_t). Indicates if all required roles have been allocated to devices.
     */
    AllRolesAllocated = 0x181,
}

export enum RoleManagerCmd {
    /**
     * Argument: device_id devid (uint64_t). Get the role corresponding to given device identifer. Returns empty string if unset.
     */
    GetRole = 0x80,

    /**
     * report GetRole
     * ```
     * const [deviceId, role] = jdunpack<[UInt8Array, string]>(buf, "b[8] s")
     * ```
     */

    /**
     * Set role. Can set to empty to remove role binding.
     *
     * ```
     * const [deviceId, role] = jdunpack<[UInt8Array, string]>(buf, "b[8] s")
     * ```
     */
    SetRole = 0x81,

    /**
     * No args. Remove all role bindings.
     */
    ClearAllRoles = 0x84,

    /**
     * Argument: stored_roles pipe (bytes). Return all roles stored internally.
     */
    ListStoredRoles = 0x82,

    /**
     * Argument: required_roles pipe (bytes). List all roles required by the current program. `device_id` is `0` if role is unbound.
     */
    ListRequiredRoles = 0x83,
}


/**
 * pipe_report StoredRoles
 * ```
 * const [deviceId, role] = jdunpack<[UInt8Array, string]>(buf, "b[8] s")
 * ```
 */

/**
 * pipe_report RequiredRoles
 * ```
 * const [deviceId, serviceClass, roles] = jdunpack<[UInt8Array, number, string]>(buf, "b[8] u32 s")
 * ```
 */


export enum RoleManagerEvent {
    /**
     * Emit notifying that the internal state of the service changed.
     */
    Change = 0x2,
}

// Service: Rotary encoder
export const SRV_ROTARY_ENCODER = 0x10fa29c9
export const SRV_ROTARY_ENCODER_POSITION_RO_PACK_FORMAT = "i32"
export const SRV_ROTARY_ENCODER_CLICKS_PER_TURN_CONST_PACK_FORMAT = "u16"
export enum RotaryEncoderReg {
    /**
     * Read-only # int32_t. Upon device reset starts at `0` (regardless of the shaft position).
     * Increases by `1` for a clockwise "click", by `-1` for counter-clockwise.
     */
    Position = 0x101,

    /**
     * Constant # uint16_t. This specifies by how much `position` changes when the crank does 360 degree turn. Typically 12 or 24.
     */
    ClicksPerTurn = 0x180,
}

// Service: Servo
export const SRV_SERVO = 0x12fc9103
export const SRV_SERVO_PULSE_RW_PACK_FORMAT = "u32"
export const SRV_SERVO_ENABLED_RW_PACK_FORMAT = "u8"
export enum ServoReg {
    /**
     * Read-write μs uint32_t. Specifies length of the pulse in microseconds. The period is always 20ms.
     */
    Pulse = 0x2,

    /**
     * Read-write bool (uint8_t). Turn the power to the servo on/off.
     */
    Enabled = 0x1,
}

// Service: Settings
export const SRV_SETTINGS = 0x1107dc4a
export const SRV_SETTINGS_GET_COMMAND_PACK_FORMAT = "s"
export const SRV_SETTINGS_GET_REPORT_PACK_FORMAT = "z b"
export const SRV_SETTINGS_SET_COMMAND_PACK_FORMAT = "z b"
export const SRV_SETTINGS_DELETE_COMMAND_PACK_FORMAT = "s"
export const SRV_SETTINGS_LIST_KEYS_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_SETTINGS_LISTED_KEY_PIPE_REPORT_PACK_FORMAT = "s"
export const SRV_SETTINGS_LIST_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_SETTINGS_LISTED_ENTRY_PIPE_REPORT_PACK_FORMAT = "z b"
export enum SettingsCmd {
    /**
     * Argument: key string (bytes). Get the value of given setting. If no such entry exists, the value returned is empty.
     */
    Get = 0x80,

    /**
     * report Get
     * ```
     * const [key, value] = jdunpack<[string, UInt8Array]>(buf, "z b")
     * ```
     */

    /**
     * Set the value of a given setting.
     *
     * ```
     * const [key, value] = jdunpack<[string, UInt8Array]>(buf, "z b")
     * ```
     */
    Set = 0x81,

    /**
     * Argument: key string (bytes). Delete a given setting.
     */
    Delete = 0x84,

    /**
     * Argument: results pipe (bytes). Return keys of all settings.
     */
    ListKeys = 0x82,

    /**
     * Argument: results pipe (bytes). Return keys and values of all settings.
     */
    List = 0x83,

    /**
     * No args. Clears all keys.
     */
    Clear = 0x85,
}


/**
 * pipe_report ListedEntry
 * ```
 * const [key, value] = jdunpack<[string, UInt8Array]>(buf, "z b")
 * ```
 */


// Service: Slider
export const SRV_SLIDER = 0x1f274746
export const SRV_SLIDER_POSITION_RO_PACK_FORMAT = "u16"
export enum SliderReg {
    /**
     * Read-only ratio uint16_t. The relative position of the slider between `0x0000` and `0xffff`.
     */
    Position = 0x101,
}

// Service: TCP
export const SRV_TCP = 0x1b43b70b

export enum TcpTcpError { // int32_t
    InvalidCommand = 0x1,
    InvalidCommandPayload = 0x2,
}

export const SRV_TCP_OPEN_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_TCP_OPEN_REPORT_PACK_FORMAT = "u16"
export const SRV_TCP_OPEN_SSL_META_PIPE_COMMAND_PACK_FORMAT = "u16 s"
export const SRV_TCP_OUTDATA_PIPE_COMMAND_PACK_FORMAT = "b"
export const SRV_TCP_INDATA_PIPE_REPORT_PACK_FORMAT = "b"
export const SRV_TCP_ERROR_META_PIPE_REPORT_PACK_FORMAT = "i32"
export enum TcpCmd {
    /**
     * Argument: inbound pipe (bytes). Open pair of pipes between network peripheral and a controlling device. In/outbound refers to direction from/to internet.
     */
    Open = 0x80,
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
     */
    Error = 0x0,
}

// Service: Thermometer
export const SRV_THERMOMETER = 0x1421bac7
export const SRV_THERMOMETER_TEMPERATURE_RO_PACK_FORMAT = "u22.10"
export enum ThermometerReg {
    /**
     * Read-only °C u22.10 (uint32_t). The temperature.
     */
    Temperature = 0x101,
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

export const SRV_WIFI_SCAN_COMMAND_PACK_FORMAT = "b[12]"
export const SRV_WIFI_RESULTS_PIPE_REPORT_PACK_FORMAT = "u32 u32 i8 u8 b[6] s[33]"
export const SRV_WIFI_CONNECT_COMMAND_PACK_FORMAT = "z z"
export const SRV_WIFI_CONNECTED_RO_PACK_FORMAT = "u8"
export enum WifiCmd {
    /**
     * Argument: results pipe (bytes). Initiate search for WiFi networks. Results are returned via pipe, one entry per packet.
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
 * const [flags, rssi, channel, bssid, ssid] = jdunpack<[WifiAPFlags, number, number, UInt8Array, string]>(buf, "u32 x[4] i8 u8 b[6] s[33]")
 * ```
 */


export enum WifiReg {
    /**
     * Read-only bool (uint8_t). Indicates whether or not we currently have an IP address assigned.
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

