// Service: Common registers and commands
export const ANNOUNCE_INTERVAL = 0x1f4

export enum SystemReadingThreshold { // uint8_t
    Neutral = 0x1,
    Inactive = 0x2,
    Active = 0x3,
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

    /**
     * This report may be emitted by a server in response to a command (action or register operation)
     * that it does not understand.
     * The `service_command` and `packet_crc` fields are copied from the command packet that was unhandled.
     * Note that it's possible to get an ACK, followed by such an error report.
     *
     * ```
     * const [serviceCommand, packetCrc] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    CommandNotImplemented = 0x3,
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
     * Notifies that the threshold is back between ``low`` and ``high``.
     */
    Neutral = 0x7,
}

// Service: Base service
export enum BaseCmd {
    /**
     * This report may be emitted by a server in response to a command (action or register operation)
     * that it does not understand.
     * The `service_command` and `packet_crc` fields are copied from the command packet that was unhandled.
     * Note that it's possible to get an ACK, followed by such an error report.
     *
     * ```
     * const [serviceCommand, packetCrc] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    CommandNotImplemented = 0x3,
}

export enum BaseReg {
    /**
     * Constant string (bytes). A friendly name that describes the role of this service instance in the device.
     * It often corresponds to what's printed on the device:
     * for example, `A` for button A, or `S0` for servo channel 0.
     * Words like `left` should be avoided because of localization issues (unless they are printed on the device).
     *
     * ```
     * const [instanceName] = jdunpack<[string]>(buf, "s")
     * ```
     */
    InstanceName = 0x109,

    /**
     * Reports the current state or error status of the device. ``code`` is a standardized value from
     * the Jacdac status/error codes. ``vendor_code`` is any vendor specific error code describing the device
     * state. This report is typically not queried, when a device has an error, it will typically
     * add this report in frame along with the announce packet. If a service implements this register,
     * it should also support the ``status_code_changed`` event defined below.
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
     * const [x, y, z] = jdunpack<[number, number, number]>(buf, "i12.20 i12.20 i12.20")
     * ```
     */
    Forces = 0x101,

    /**
     * Read-only g u12.20 (uint32_t). Error on the reading value.
     *
     * ```
     * const [forcesError] = jdunpack<[number]>(buf, "u12.20")
     * ```
     */
    ForcesError = 0x106,

    /**
     * Read-write g u12.20 (uint32_t). Configures the range forces detected.
     * The value will be "rounded up" to one of `max_forces_supported`.
     *
     * ```
     * const [maxForce] = jdunpack<[number]>(buf, "u12.20")
     * ```
     */
    MaxForce = 0x8,

    /**
     * Constant. Lists values supported for writing `max_force`.
     *
     * ```
     * const [maxForce] = jdunpack<[number[]]>(buf, "u12.20[]")
     * ```
     */
    MaxForcesSupported = 0x10a,
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
    Force2g = 0x8c,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force3g = 0x88,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force6g = 0x89,

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    Force8g = 0x8a,
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

// Service: Arcade sound
export const SRV_ARCADE_SOUND = 0x1fc63606
export enum ArcadeSoundCmd {
    /**
     * Argument: samples bytes. Play samples, which are single channel, signed 16-bit little endian values.
     *
     * ```
     * const [samples] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Play = 0x80,
}

export enum ArcadeSoundReg {
    /**
     * Read-write Hz u22.10 (uint32_t). Get or set playback sample rate (in samples per second).
     * If you set it, read it back, as the value may be rounded up or down.
     *
     * ```
     * const [sampleRate] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    SampleRate = 0x80,

    /**
     * Constant B uint32_t. The size of the internal audio buffer.
     *
     * ```
     * const [bufferSize] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    BufferSize = 0x180,

    /**
     * Read-only B uint32_t. How much data is still left in the buffer to play.
     * Clients should not send more data than `buffer_size - buffer_pending`,
     * but can keep the `buffer_pending` as low as they want to ensure low latency
     * of audio playback.
     *
     * ```
     * const [bufferPending] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    BufferPending = 0x181,
}

// Service: Azure IoT Hub Health
export const SRV_AZURE_IOT_HUB_HEALTH = 0x1462eefc

export enum AzureIotHubHealthConnectionStatus { // uint16_t
    Connected = 0x1,
    Disconnected = 0x2,
    Connecting = 0x3,
    Disconnecting = 0x4,
}

export enum AzureIotHubHealthReg {
    /**
     * Read-only string (bytes). Something like `my-iot-hub.azure-devices.net`; empty string when not properly configured
     *
     * ```
     * const [hubName] = jdunpack<[string]>(buf, "s")
     * ```
     */
    HubName = 0x180,

    /**
     * Read-only string (bytes). Device identifier in Azure Iot Hub
     *
     * ```
     * const [hubDeviceId] = jdunpack<[string]>(buf, "s")
     * ```
     */
    HubDeviceId = 0x181,

    /**
     * Read-only ConnectionStatus (uint16_t). Indicates the status of connection. A message beyond the [0..3] range represents an HTTP error code.
     *
     * ```
     * const [connectionStatus] = jdunpack<[AzureIotHubHealthConnectionStatus]>(buf, "u16")
     * ```
     */
    ConnectionStatus = 0x182,
}

export enum AzureIotHubHealthCmd {
    /**
     * No args. Starts a connection to the IoT hub service
     */
    Connect = 0x81,

    /**
     * No args. Starts disconnecting from the IoT hub service
     */
    Disconnect = 0x82,

    /**
     * Argument: connection_string string (bytes). Restricted command to override the existing connection string to the Azure IoT Hub.
     *
     * ```
     * const [connectionString] = jdunpack<[string]>(buf, "s")
     * ```
     */
    SetConnectionString = 0x86,
}

export enum AzureIotHubHealthEvent {
    /**
     * Argument: connection_status ConnectionStatus (uint16_t). Raised when the connection status changes
     *
     * ```
     * const [connectionStatus] = jdunpack<[AzureIotHubHealthConnectionStatus]>(buf, "u16")
     * ```
     */
    ConnectionStatusChange = 0x3,

    /**
     * Raised when a message has been sent to the hub.
     */
    MessageSent = 0x80,
}

// Service: Barcode reader
export const SRV_BARCODE_READER = 0x1c739e6c

export enum BarcodeReaderFormat { // uint8_t
    Aztec = 0x1,
    Code128 = 0x2,
    Code39 = 0x3,
    Code93 = 0x4,
    Codabar = 0x5,
    DataMatrix = 0x6,
    Ean13 = 0x8,
    Ean8 = 0x9,
    ITF = 0xa,
    Pdf417 = 0xb,
    QrCode = 0xc,
    UpcA = 0xd,
    UpcE = 0xe,
}

export enum BarcodeReaderReg {
    /**
     * Read-write bool (uint8_t). Turns on or off the detection of barcodes.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Constant. Reports the list of supported barcode formats, as documented in https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API.
     *
     * ```
     * const [format] = jdunpack<[BarcodeReaderFormat[]]>(buf, "u8[]")
     * ```
     */
    Formats = 0x180,
}

export enum BarcodeReaderEvent {
    /**
     * Raised when a bar code is detected and decoded. If the reader detects multiple codes, it will issue multiple events.
     * In case of numeric barcodes, the `data` field should contain the ASCII (which is the same as UTF8 in that case) representation of the number.
     *
     * ```
     * const [format, data] = jdunpack<[BarcodeReaderFormat, string]>(buf, "u8 s")
     * ```
     */
    Detect = 0x1,
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

// Service: bit:radio
export const SRV_BIT_RADIO = 0x1ac986cf
export enum BitRadioReg {
    /**
     * Read-write bool (uint8_t). Turns on/off the radio antenna.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Read-write uint8_t. Group used to filter packets
     *
     * ```
     * const [group] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Group = 0x80,

    /**
     * Read-write uint8_t. Antenna power to increase or decrease range.
     *
     * ```
     * const [transmissionPower] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    TransmissionPower = 0x81,

    /**
     * Read-write uint8_t. Change the transmission and reception band of the radio to the given channel.
     *
     * ```
     * const [frequencyBand] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    FrequencyBand = 0x82,
}

export enum BitRadioCmd {
    /**
     * Argument: message string (bytes). Sends a string payload as a radio message, maximum 18 characters.
     *
     * ```
     * const [message] = jdunpack<[string]>(buf, "s")
     * ```
     */
    SendString = 0x80,

    /**
     * Argument: value f64 (uint64_t). Sends a double precision number payload as a radio message
     *
     * ```
     * const [value] = jdunpack<[number]>(buf, "f64")
     * ```
     */
    SendNumber = 0x81,

    /**
     * Sends a double precision number and a name payload as a radio message
     *
     * ```
     * const [value, name] = jdunpack<[number, string]>(buf, "f64 s")
     * ```
     */
    SendValue = 0x82,

    /**
     * Argument: data bytes. Sends a payload of bytes as a radio message
     *
     * ```
     * const [data] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    SendBuffer = 0x83,

    /**
     * Raised when a string packet is received
     *
     * ```
     * const [time, deviceSerialNumber, rssi, message] = jdunpack<[number, number, number, string]>(buf, "u32 u32 i8 x[1] s")
     * ```
     */
    StringReceived = 0x90,

    /**
     * Raised when a number packet is received
     *
     * ```
     * const [time, deviceSerialNumber, rssi, value, name] = jdunpack<[number, number, number, number, string]>(buf, "u32 u32 i8 x[3] f64 s")
     * ```
     */
    NumberReceived = 0x91,

    /**
     * Raised when a buffer packet is received
     *
     * ```
     * const [time, deviceSerialNumber, rssi, data] = jdunpack<[number, number, number, Uint8Array]>(buf, "u32 u32 i8 x[1] b")
     * ```
     */
    BufferReceived = 0x92,
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
     * No args. The `service_class` is always `0x1ffa9948`. The `product_identifer` identifies the kind of firmware
     * that "fits" this device.
     */
    Info = 0x0,

    /**
     * report Info
     * ```
     * const [serviceClass, pageSize, flashableSize, productIdentifer] = jdunpack<[number, number, number, number]>(buf, "u32 u32 u32 u32")
     * ```
     */

    /**
     * Argument: session_id uint32_t. The flashing server should generate a random id, and use this command to set it.
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

// Service: Braille display
export const SRV_BRAILLE_DISPLAY = 0x13bfb7cc
export enum BrailleDisplayReg {
    /**
     * Read-write bool (uint8_t). Determins if the braille display is active.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Read-write string (bytes). Braille patterns to show. Must be unicode characters between `0x2800` and `0x28ff`.
     *
     * ```
     * const [patterns] = jdunpack<[string]>(buf, "s")
     * ```
     */
    Patterns = 0x2,

    /**
     * Constant # uint8_t. Gets the number of patterns that can be displayed.
     *
     * ```
     * const [length] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Length = 0x181,
}

// Service: Button
export const SRV_BUTTON = 0x1473a263
export enum ButtonReg {
    /**
     * Read-only ratio u0.16 (uint16_t). Indicates the pressure state of the button, where ``0`` is open.
     *
     * ```
     * const [pressure] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Pressure = 0x101,

    /**
     * Constant bool (uint8_t). Indicates if the button provides analog ``pressure`` readings.
     *
     * ```
     * const [analog] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Analog = 0x180,

    /**
     * Read-only bool (uint8_t). Determines if the button is pressed currently.
     */
    Pressed = 0x181,
}

export enum ButtonEvent {
    /**
     * Emitted when button goes from inactive to active.
     */
    Down = 0x1,

    /**
     * Argument: time ms uint32_t. Emitted when button goes from active to inactive. The 'time' parameter
     * records the amount of time between the down and up events.
     *
     * ```
     * const [time] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    Up = 0x2,

    /**
     * Argument: time ms uint32_t. Emitted when the press time is greater than 500ms, and then at least every 500ms
     * as long as the button remains pressed. The 'time' parameter records the the amount of time
     * that the button has been held (since the down event).
     *
     * ```
     * const [time] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    Hold = 0x81,
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

    /**
     * Play a note at the given frequency and volume.
     */
    PlayNote = 0x81,
}

// Service: Capacitive Button
export const SRV_CAPACITIVE_BUTTON = 0x2865adc9
export enum CapacitiveButtonReg {
    /**
     * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``up`` events.
     *
     * ```
     * const [threshold] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Threshold = 0x6,
}

export enum CapacitiveButtonCmd {
    /**
     * No args. Request to calibrate the capactive. When calibration is requested, the device expects that no object is touching the button.
     * The report indicates the calibration is done.
     */
    Calibrate = 0x2,
}

// Service: Character Screen
export const SRV_CHARACTER_SCREEN = 0x1f37c56a

export enum CharacterScreenVariant { // uint8_t
    LCD = 0x1,
    OLED = 0x2,
    Braille = 0x3,
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
     * Read-write ratio u0.8 (uint8_t). Brightness of the screen. `0` means off.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u0.8")
     * ```
     */
    Brightness = 0x1,

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
     * Constant # uint8_t. Gets the number of rows.
     *
     * ```
     * const [rows] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Rows = 0x180,

    /**
     * Constant # uint8_t. Gets the number of columns.
     *
     * ```
     * const [columns] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Columns = 0x181,
}

export enum CharacterScreenCmd {
    /**
     * Overrides the content of a single line at a 0-based index.
     *
     * ```
     * const [index, message] = jdunpack<[number, string]>(buf, "u16 s")
     * ```
     */
    SetLine = 0x80,

    /**
     * No args. Clears all text from the display.
     */
    Clear = 0x81,
}

// Service: CODAL Message Bus
export const SRV_CODAL_MESSAGE_BUS = 0x121ff81d
export enum CodalMessageBusCmd {
    /**
     * Send a message on the CODAL bus. If `source` is `0`, it is treated as wildcard.
     *
     * ```
     * const [source, value] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    Send = 0x80,
}

export enum CodalMessageBusEvent {
    /**
     * Raised by the server is triggered by the server. The filtering logic of which event to send over JACDAC is up to the server implementation.
     *
     * ```
     * const [source, value] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    Message = 0x80,
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

// Service: Compass
export const SRV_COMPASS = 0x15b7b9bf
export enum CompassReg {
    /**
     * Read-only ° u16.16 (uint32_t). The heading with respect to the magnetic north.
     *
     * ```
     * const [heading] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    Heading = 0x101,

    /**
     * Read-write bool (uint8_t). Turn on or off the sensor. Turning on the sensor may start a calibration sequence.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Read-only ° u16.16 (uint32_t). Error on the heading reading
     *
     * ```
     * const [headingError] = jdunpack<[number]>(buf, "u16.16")
     * ```
     */
    HeadingError = 0x106,
}

export enum CompassCmd {
    /**
     * No args. Starts a calibration sequence for the compass.
     */
    Calibrate = 0x2,
}

// Service: Control
export const SRV_CONTROL = 0x0

export enum ControlAnnounceFlags { // uint16_t
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
    SupportsReliableCommands = 0x1000,
}

export enum ControlCmd {
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

    /**
     * No args. Force client device into proxy mode.
     */
    Proxy = 0x85,

    /**
     * Argument: seed uint32_t. This opens a pipe to the device to provide an alternative, reliable transport of actions
     * (and possibly other commands).
     * The commands are wrapped as pipe data packets.
     * Multiple invocations of this command with the same `seed` are dropped
     * (and thus the command is not `unique`); otherwise `seed` carries no meaning
     * and should be set to a random value by the client.
     * Note that while the commands sends this way are delivered exactly once, the
     * responses might get lost.
     *
     * ```
     * const [seed] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    ReliableCommands = 0x86,

    /**
     * report ReliableCommands
     * ```
     * const [commands] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
}


/**
 * pipe_command WrappedCommand
 * ```
 * const [serviceSize, serviceIndex, serviceCommand, payload] = jdunpack<[number, number, number, Uint8Array]>(buf, "u8 u8 u16 b")
 * ```
 */


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
     * const [productIdentifier] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    ProductIdentifier = 0x181,

    /**
     * Constant uint32_t. Typically the same as `product_identifier` unless device was flashed by hand; the bootloader will respond to that code.
     *
     * ```
     * const [bootloaderProductIdentifier] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    BootloaderProductIdentifier = 0x184,

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
}

// Service: Dimmer
export const SRV_DIMMER = 0x1fb02645

export enum DimmerVariant { // uint8_t
    Light = 0x1,
    Fan = 0x2,
    Pump = 0x3,
}

export enum DimmerReg {
    /**
     * Read-write ratio u0.16 (uint16_t). The intensity of the current. Set to ``0`` to turn off completely the current.
     *
     * ```
     * const [intensity] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Intensity = 0x1,

    /**
     * Constant Variant (uint8_t). The type of physical device
     *
     * ```
     * const [variant] = jdunpack<[DimmerVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Distance
export const SRV_DISTANCE = 0x141a6b8a

export enum DistanceVariant { // uint8_t
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
     * Constant Variant (uint8_t). Determines the type of sensor used.
     *
     * ```
     * const [variant] = jdunpack<[DistanceVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: DMX
export const SRV_DMX = 0x11cf8c05
export enum DmxReg {
    /**
     * Read-write bool (uint8_t). Determines if the DMX bridge is active
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,
}

export enum DmxCmd {
    /**
     * Argument: channels bytes. Send a DMX packet, up to 236bytes long, including the start code.
     *
     * ```
     * const [channels] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Send = 0x80,
}

// Service: Dot Matrix
export const SRV_DOT_MATRIX = 0x110d154b

export enum DotMatrixVariant { // uint8_t
    LED = 0x1,
    Braille = 0x2,
}

export enum DotMatrixReg {
    /**
     * Read-write bytes. The state of the screen where dot on/off state is
     * stored as a bit, column by column. The column should be byte aligned.
     *
     * ```
     * const [dots] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Dots = 0x2,

    /**
     * Read-write ratio u0.8 (uint8_t). Reads the general brightness of the display, brightness for LEDs. `0` when the screen is off.
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

    /**
     * Constant Variant (uint8_t). Describes the type of matrix used.
     *
     * ```
     * const [variant] = jdunpack<[DotMatrixVariant]>(buf, "u8")
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
     * const [eCO2] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    ECO2 = 0x101,

    /**
     * Read-only ppm u22.10 (uint32_t). Error on the reading value.
     *
     * ```
     * const [eCO2Error] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    ECO2Error = 0x106,

    /**
     * Constant ppm u22.10 (uint32_t). Minimum measurable value
     *
     * ```
     * const [minECO2] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    MinECO2 = 0x104,

    /**
     * Constant ppm u22.10 (uint32_t). Minimum measurable value
     *
     * ```
     * const [maxECO2] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    MaxECO2 = 0x105,

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

// Service: Flex
export const SRV_FLEX = 0x1f47c6c6

export enum FlexVariant { // uint8_t
    Linear22Inch = 0x1,
    Linear45Inch = 0x2,
}

export enum FlexReg {
    /**
     * Read-only ratio u0.16 (uint16_t). The relative position of the slider.
     *
     * ```
     * const [bending] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Bending = 0x101,

    /**
     * Constant Variant (uint8_t). Specifies the physical layout of the flex sensor.
     *
     * ```
     * const [variant] = jdunpack<[FlexVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Gyroscope
export const SRV_GYROSCOPE = 0x1e1b06f2
export enum GyroscopeReg {
    /**
     * Indicates the current rates acting on gyroscope.
     *
     * ```
     * const [x, y, z] = jdunpack<[number, number, number]>(buf, "i12.20 i12.20 i12.20")
     * ```
     */
    RotationRates = 0x101,

    /**
     * Read-only °/s u12.20 (uint32_t). Error on the reading value.
     *
     * ```
     * const [rotationRatesError] = jdunpack<[number]>(buf, "u12.20")
     * ```
     */
    RotationRatesError = 0x106,

    /**
     * Read-write °/s u12.20 (uint32_t). Configures the range of rotation rates.
     * The value will be "rounded up" to one of `max_rates_supported`.
     *
     * ```
     * const [maxRate] = jdunpack<[number]>(buf, "u12.20")
     * ```
     */
    MaxRate = 0x8,

    /**
     * Constant. Lists values supported for writing `max_rate`.
     *
     * ```
     * const [maxRate] = jdunpack<[number[]]>(buf, "u12.20[]")
     * ```
     */
    MaxRatesSupported = 0x10a,
}

// Service: Heart Rate
export const SRV_HEART_RATE = 0x166c6dc4

export enum HeartRateVariant { // uint8_t
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
     * Constant Variant (uint8_t). The type of physical sensor
     *
     * ```
     * const [variant] = jdunpack<[HeartRateVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: HID Adapter
export const SRV_HID_ADAPTER = 0x1e5758b5
export enum HidAdapterReg {
    /**
     * Read-write uint8_t. The number of configurations stored on the server.
     *
     * ```
     * const [numConfigurations] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    NumConfigurations = 0x80,

    /**
     * Read-write uint8_t. The current configuration the server is using.
     *
     * ```
     * const [currentConfiguration] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    CurrentConfiguration = 0x81,
}

export enum HidAdapterCmd {
    /**
     * Retrieves a configuration stored on the server. If the configuration does not exist, an empty report will be returned
     *
     * ```
     * const [results, configurationNumber] = jdunpack<[Uint8Array, number]>(buf, "b[12] u8")
     * ```
     */
    GetConfiguration = 0x80,

    /**
     * Stores the given binding on the server. If a binding exists at this index, the new binding will replace it.
     *
     * ```
     * const [configurationNumber, bindingIndex, deviceId, serviceClass, triggerValue, triggerContext, serviceIndex, selector, modifiers] = jdunpack<[number, number, number, number, number, number, number, number, number]>(buf, "u8 u8 x[2] u64 u32 u32 u8 u8 u16 u16")
     * ```
     */
    SetBinding = 0x82,

    /**
     * Clears a specific binding stored on the device.
     *
     * ```
     * const [configurationNumber, bindingIndex] = jdunpack<[number, number]>(buf, "u8 u8")
     * ```
     */
    ClearBinding = 0x83,

    /**
     * Argument: configuration_number uint8_t. Clears a specific configuration stored on the device.
     *
     * ```
     * const [configurationNumber] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    ClearConfiguration = 0x84,

    /**
     * No args. Clears all configurations and bindings stored on the device.
     */
    Clear = 0x85,
}


/**
 * pipe_report Configuration
 * ```
 * const [configurationNumber, bindingIndex, deviceId, serviceClass, triggerValue, triggerContext, serviceIndex, selector, modifiers] = jdunpack<[number, number, number, number, number, number, number, number, number]>(buf, "u8 u8 x[2] u64 u32 u32 u8 u8 u16 u16")
 * ```
 */


export enum HidAdapterEvent {
    /**
     * Event that notifies clients that the server has swapped to a new configuration or changed key bindings.
     */
    Changed = 0x3,
}

// Service: HID Keyboard
export const SRV_HID_KEYBOARD = 0x18b05b6a

export enum HidKeyboardModifiers { // uint8_t
    None = 0x0,
    LeftControl = 0x1,
    LeftShift = 0x2,
    LeftAlt = 0x4,
    LeftGUI = 0x8,
    RightControl = 0x10,
    RightShift = 0x20,
    RightAlt = 0x40,
    RightGUI = 0x80,
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
    Left = 0x1,
    Right = 0x2,
    Middle = 0x4,
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

    /**
     * Constant %RH u22.10 (uint32_t). Lowest humidity that can be reported.
     *
     * ```
     * const [minHumidity] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    MinHumidity = 0x104,

    /**
     * Constant %RH u22.10 (uint32_t). Highest humidity that can be reported.
     *
     * ```
     * const [maxHumidity] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    MaxHumidity = 0x105,
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

// Service: Indexed screen
export const SRV_INDEXED_SCREEN = 0x16fa36e5
export enum IndexedScreenCmd {
    /**
     * Sets the update window for subsequent `set_pixels` commands.
     *
     * ```
     * const [x, y, width, height] = jdunpack<[number, number, number, number]>(buf, "u16 u16 u16 u16")
     * ```
     */
    StartUpdate = 0x81,

    /**
     * Argument: pixels bytes. Set pixels in current window, according to current palette.
     * Each "line" of data is aligned to a byte.
     *
     * ```
     * const [pixels] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    SetPixels = 0x83,
}

export enum IndexedScreenReg {
    /**
     * Read-write ratio u0.8 (uint8_t). Set backlight brightness.
     * If set to `0` the display may go to sleep.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u0.8")
     * ```
     */
    Brightness = 0x1,

    /**
     * The current palette.
     * The color entry repeats `1 << bits_per_pixel` times.
     * This register may be write-only.
     *
     * ```
     * const [rest] = jdunpack<[([number, number, number])[]]>(buf, "r: u8 u8 u8 x[1]")
     * const [blue, green, red] = rest[0]
     * ```
     */
    Palette = 0x80,

    /**
     * Constant bit uint8_t. Determines the number of palette entries.
     * Typical values are 1, 2, 4, or 8.
     *
     * ```
     * const [bitsPerPixel] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    BitsPerPixel = 0x180,

    /**
     * Constant px uint16_t. Screen width in "natural" orientation.
     *
     * ```
     * const [width] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    Width = 0x181,

    /**
     * Constant px uint16_t. Screen height in "natural" orientation.
     *
     * ```
     * const [height] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    Height = 0x182,

    /**
     * Read-write bool (uint8_t). If true, consecutive pixels in the "width" direction are sent next to each other (this is typical for graphics cards).
     * If false, consecutive pixels in the "height" direction are sent next to each other.
     * For embedded screen controllers, this is typically true iff `width < height`
     * (in other words, it's only true for portrait orientation screens).
     * Some controllers may allow the user to change this (though the refresh order may not be optimal then).
     * This is independent of the `rotation` register.
     *
     * ```
     * const [widthMajor] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    WidthMajor = 0x81,

    /**
     * Read-write px uint8_t. Every pixel sent over wire is represented by `up_sampling x up_sampling` square of physical pixels.
     * Some displays may allow changing this (which will also result in changes to `width` and `height`).
     * Typical values are 1 and 2.
     *
     * ```
     * const [upSampling] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    UpSampling = 0x82,

    /**
     * Read-write ° uint16_t. Possible values are 0, 90, 180 and 270 only.
     * Write to this register do not affect `width` and `height` registers,
     * and may be ignored by some screens.
     *
     * ```
     * const [rotation] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    Rotation = 0x83,
}

// Service: Infrastructure
export const SRV_INFRASTRUCTURE = 0x1e1589eb
// Service: Joystick
export const SRV_JOYSTICK = 0x108f7456

export enum JoystickButtons { // uint32_t
    Left = 0x1,
    Up = 0x2,
    Right = 0x4,
    Down = 0x8,
    A = 0x10,
    B = 0x20,
    Menu = 0x40,
    Select = 0x80,
    Reset = 0x100,
    Exit = 0x200,
    X = 0x400,
    Y = 0x800,
}


export enum JoystickVariant { // uint8_t
    Thumb = 0x1,
    ArcadeBall = 0x2,
    ArcadeStick = 0x3,
    Gamepad = 0x4,
}

export enum JoystickReg {
    /**
     * If the joystick is analog, the directional buttons should be "simulated", based on joystick position
     * (`Left` is `{ x = -1, y = 0 }`, `Up` is `{ x = 0, y = -1}`).
     * If the joystick is digital, then each direction will read as either `-1`, `0`, or `1` (in fixed representation).
     * The primary button on the joystick is `A`.
     *
     * ```
     * const [buttons, x, y] = jdunpack<[JoystickButtons, number, number]>(buf, "u32 i1.15 i1.15")
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
     * Constant Buttons (uint32_t). Indicates a bitmask of the buttons that are mounted on the joystick.
     * If the `Left`/`Up`/`Right`/`Down` buttons are marked as available here, the joystick is digital.
     * Even when marked as not available, they will still be simulated based on the analog joystick.
     *
     * ```
     * const [buttonsAvailable] = jdunpack<[JoystickButtons]>(buf, "u32")
     * ```
     */
    ButtonsAvailable = 0x180,
}

export enum JoystickEvent {
    /**
     * Argument: buttons Buttons (uint32_t). Emitted whenever the state of buttons changes.
     *
     * ```
     * const [buttons] = jdunpack<[JoystickButtons]>(buf, "u32")
     * ```
     */
    ButtonsChanged = 0x3,
}

// Service: LED
export const SRV_LED = 0x1e3048f8

export enum LedVariant { // uint8_t
    ThroughHole = 0x1,
    SMD = 0x2,
    Power = 0x3,
    Bead = 0x4,
}

export enum LedCmd {
    /**
     * This has the same semantics as `set_status_light` in the control service.
     *
     * ```
     * const [toRed, toGreen, toBlue, speed] = jdunpack<[number, number, number, number]>(buf, "u8 u8 u8 u8")
     * ```
     */
    Animate = 0x80,
}

export enum LedReg {
    /**
     * The current color of the LED.
     *
     * ```
     * const [red, green, blue] = jdunpack<[number, number, number]>(buf, "u8 u8 u8")
     * ```
     */
    Color = 0x180,

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
    LedCount = 0x183,

    /**
     * Constant nm uint16_t. If monochrome LED, specifies the wave length of the LED.
     *
     * ```
     * const [waveLength] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    WaveLength = 0x181,

    /**
     * Constant mcd uint16_t. The luminous intensity of the LED, at full value, in micro candella.
     *
     * ```
     * const [luminousIntensity] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    LuminousIntensity = 0x182,

    /**
     * Constant Variant (uint8_t). The physical type of LED.
     *
     * ```
     * const [variant] = jdunpack<[LedVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: LED Pixel
export const SRV_LED_PIXEL = 0x126f00e0

export enum LedPixelLightType { // uint8_t
    WS2812B_GRB = 0x0,
    APA102 = 0x10,
    SK9822 = 0x11,
}


export enum LedPixelVariant { // uint8_t
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
     * Read-write # uint16_t. Specifies the number of pixels in the strip.
     * Controllers which are sold with lights should default to the correct length
     * and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.
     *
     * ```
     * const [numPixels] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    NumPixels = 0x81,

    /**
     * Read-write # uint16_t. If the LED pixel strip is a matrix, specifies the number of columns. Otherwise, a square shape is assumed. Controllers which are sold with lights should default to the correct length
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
     * Constant # uint16_t. The maximum supported number of pixels.
     * All writes to `num_pixels` are clamped to `max_pixels`.
     *
     * ```
     * const [maxPixels] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxPixels = 0x181,

    /**
     * Read-write # uint16_t. How many times to repeat the program passed in `run` command.
     * Should be set before the `run` command.
     * Setting to `0` means to repeat forever.
     *
     * ```
     * const [numRepeats] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    NumRepeats = 0x82,

    /**
     * Constant Variant (uint8_t). Specifies the shape of the light strip.
     *
     * ```
     * const [variant] = jdunpack<[LedPixelVariant]>(buf, "u8")
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

// Service: Light bulb
export const SRV_LIGHT_BULB = 0x1cab054c
export enum LightBulbReg {
    /**
     * Read-write ratio u0.16 (uint16_t). Indicates the brightness of the light bulb. Zero means completely off and 0xffff means completely on.
     * For non-dimmeable lights, the value should be clamp to 0xffff for any non-zero value.
     *
     * ```
     * const [brightness] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Brightness = 0x1,

    /**
     * Constant bool (uint8_t). Indicates if the light supports dimming.
     *
     * ```
     * const [dimmeable] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Dimmeable = 0x180,
}

export enum LightBulbEvent {
    /**
     * Emitted when the light brightness is greater than 0.
     */
    On = 0x1,

    /**
     * Emitted when the light is completely off with brightness to 0.
     */
    Off = 0x2,
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

// Service: Magnetometer
export const SRV_MAGNETOMETER = 0x13029088
export enum MagnetometerReg {
    /**
     * Indicates the current magnetic field on magnetometer.
     * For reference: `1 mgauss` is `100 nT` (and `1 gauss` is `100 000 nT`).
     *
     * ```
     * const [x, y, z] = jdunpack<[number, number, number]>(buf, "i32 i32 i32")
     * ```
     */
    Forces = 0x101,

    /**
     * Read-only nT int32_t. Error on the readings.
     *
     * ```
     * const [forcesError] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    ForcesError = 0x106,
}

export enum MagnetometerCmd {
    /**
     * No args. Forces a calibration sequence where the user/device
     * might have to rotate to be calibrated.
     */
    Calibrate = 0x2,
}

// Service: Matrix Keypad
export const SRV_MATRIX_KEYPAD = 0x13062dc8

export enum MatrixKeypadVariant { // uint8_t
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
     * Constant # uint8_t. Number of rows in the matrix
     *
     * ```
     * const [rows] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Rows = 0x180,

    /**
     * Constant # uint8_t. Number of columns in the matrix
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
     * Constant Variant (uint8_t). The type of physical keypad. If the variant is ``ElastomerLEDPixel``
     * and the next service on the device is a ``LEDPixel`` service, it is considered
     * as the service controlling the LED pixel on the keypad.
     *
     * ```
     * const [variant] = jdunpack<[MatrixKeypadVariant]>(buf, "u8")
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

// Service: MIDI output
export const SRV_MIDI_OUTPUT = 0x1a848cd7
export enum MidiOutputReg {
    /**
     * Read-write bool (uint8_t). Opens or closes the port to the MIDI device
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,
}

export enum MidiOutputCmd {
    /**
     * No args. Clears any pending send data that has not yet been sent from the MIDIOutput's queue.
     */
    Clear = 0x80,

    /**
     * Argument: data bytes. Enqueues the message to be sent to the corresponding MIDI port
     *
     * ```
     * const [data] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Send = 0x81,
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

export enum MotionEvent {
    /**
     * A movement was detected.
     */
    Movement = 0x1,
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

export enum PotentiometerVariant { // uint8_t
    Slider = 0x1,
    Rotary = 0x2,
}

export enum PotentiometerReg {
    /**
     * Read-only ratio u0.16 (uint16_t). The relative position of the slider.
     *
     * ```
     * const [position] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Position = 0x101,

    /**
     * Constant Variant (uint8_t). Specifies the physical layout of the potentiometer.
     *
     * ```
     * const [variant] = jdunpack<[PotentiometerVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Power
export const SRV_POWER = 0x1fa4c95a

export enum PowerPowerStatus { // uint8_t
    Disallowed = 0x0,
    Powering = 0x1,
    Overload = 0x2,
    Overprovision = 0x3,
}

export enum PowerReg {
    /**
     * Read-write bool (uint8_t). Can be used to completely disable the service.
     * When allowed, the service may still not be providing power, see
     * `power_status` for the actual current state.
     *
     * ```
     * const [allowed] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Allowed = 0x1,

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
     * Read-only PowerStatus (uint8_t). Indicates whether the power provider is currently providing power (`Powering` state), and if not, why not.
     * `Overprovision` means there was another power provider, and we stopped not to overprovision the bus.
     *
     * ```
     * const [powerStatus] = jdunpack<[PowerPowerStatus]>(buf, "u8")
     * ```
     */
    PowerStatus = 0x181,

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
}

export enum PowerCmd {
    /**
     * No args. Sent by the power service periodically, as broadcast.
     */
    Shutdown = 0x80,
}

export enum PowerEvent {
    /**
     * Argument: power_status PowerStatus (uint8_t). Emitted whenever `power_status` changes.
     *
     * ```
     * const [powerStatus] = jdunpack<[PowerPowerStatus]>(buf, "u8")
     * ```
     */
    PowerStatusChanged = 0x3,
}

// Service: Pressure Button
export const SRV_PRESSURE_BUTTON = 0x281740c3
export enum PressureButtonReg {
    /**
     * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``up`` events.
     *
     * ```
     * const [threshold] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    Threshold = 0x6,
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

    /**
     * A read write u8, string register.
     *
     * ```
     * const [u8, string] = jdunpack<[number, string]>(buf, "u8 s")
     * ```
     */
    RwU8String = 0x87,

    /**
     * A read only u8, string register.. Mirrors rw_u8_string.
     *
     * ```
     * const [u8, string] = jdunpack<[number, string]>(buf, "u8 s")
     * ```
     */
    RoU8String = 0x187,
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

    /**
     * An event raised when rw_u8_string is modified
     *
     * ```
     * const [u8, string] = jdunpack<[number, string]>(buf, "u8 s")
     * ```
     */
    EU8String = 0x87,
}

export enum ProtoTestCmd {
    /**
     * Argument: bool bool (uint8_t). A command to set rw_bool.
     *
     * ```
     * const [bool] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    CBool = 0x81,

    /**
     * Argument: u32 uint32_t. A command to set rw_u32.
     *
     * ```
     * const [u32] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    CU32 = 0x82,

    /**
     * Argument: i32 int32_t. A command to set rw_i32.
     *
     * ```
     * const [i32] = jdunpack<[number]>(buf, "i32")
     * ```
     */
    CI32 = 0x83,

    /**
     * Argument: string string (bytes). A command to set rw_string.
     *
     * ```
     * const [string] = jdunpack<[string]>(buf, "s")
     * ```
     */
    CString = 0x84,

    /**
     * Argument: bytes bytes. A command to set rw_string.
     *
     * ```
     * const [bytes] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    CBytes = 0x85,

    /**
     * A command to set rw_bytes.
     *
     * ```
     * const [i8, u8, u16, i32] = jdunpack<[number, number, number, number]>(buf, "i8 u8 u16 i32")
     * ```
     */
    CI8U8U16I32 = 0x86,

    /**
     * A command to set rw_u8_string.
     *
     * ```
     * const [u8, string] = jdunpack<[number, string]>(buf, "u8 s")
     * ```
     */
    CU8String = 0x87,

    /**
     * Argument: p_bytes pipe (bytes). A command to read the content of rw_bytes, byte per byte, as a pipe.
     *
     * ```
     * const [pBytes] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    CReportPipe = 0x90,
}


/**
 * pipe_report PBytes
 * ```
 * const [byte] = jdunpack<[number]>(buf, "u8")
 * ```
 */


// Service: Proxy
export const SRV_PROXY = 0x16f19949
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
    Precision = 0x181,

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

export enum RelayVariant { // uint8_t
    Electromechanical = 0x1,
    SolidState = 0x2,
    Reed = 0x3,
}

export enum RelayReg {
    /**
     * Read-write bool (uint8_t). Indicates whether the relay circuit is currently energized (closed) or not.
     *
     * ```
     * const [closed] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Closed = 0x1,

    /**
     * Constant Variant (uint8_t). Describes the type of relay used.
     *
     * ```
     * const [variant] = jdunpack<[RelayVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,

    /**
     * Constant mA uint32_t. Maximum switching current for a resistive load.
     *
     * ```
     * const [maxSwitchingCurrent] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    MaxSwitchingCurrent = 0x180,
}

export enum RelayEvent {
    /**
     * Emitted when relay goes from `inactive` to `active` state.
     * Normally open (NO) relays close the circuit when activated.
     */
    Active = 0x1,

    /**
     * Emitted when relay goes from `active` to `inactive` state.
     * Normally closed (NC) relays open the circuit when activated.
     */
    Inactive = 0x2,
}

// Service: Random Number Generator
export const SRV_RNG = 0x1789f0a2

export enum RngVariant { // uint8_t
    Quantum = 0x1,
    ADCNoise = 0x2,
    WebCrypto = 0x3,
}

export enum RngReg {
    /**
     * Read-only bytes. A register that returns a 64 bytes random buffer on every request.
     * This never blocks for a long time. If you need additional random bytes, keep querying the register.
     *
     * ```
     * const [random] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    Random = 0x180,

    /**
     * Constant Variant (uint8_t). The type of algorithm/technique used to generate the number.
     * `Quantum` refers to dedicated hardware device generating random noise due to quantum effects.
     * `ADCNoise` is the noise from quick readings of analog-digital converter, which reads temperature of the MCU or some floating pin.
     * `WebCrypto` refers is used in simulators, where the source of randomness comes from an advanced operating system.
     *
     * ```
     * const [variant] = jdunpack<[RngVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Role Manager
export const SRV_ROLE_MANAGER = 0x1e4b7e66
export enum RoleManagerReg {
    /**
     * Read-write bool (uint8_t). Normally, if some roles are unfilled, and there are idle services that can fulfill them,
     * the brain device will assign roles (bind) automatically.
     * Such automatic assignment happens every second or so, and is trying to be smart about
     * co-locating roles that share "host" (part before first slash),
     * as well as reasonably stable assignments.
     * Once user start assigning roles manually using this service, auto-binding should be disabled to avoid confusion.
     *
     * ```
     * const [autoBind] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    AutoBind = 0x80,

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
     * Notifies that role bindings have changed.
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

// Service: Rover
export const SRV_ROVER = 0x19f4d06b
export enum RoverReg {
    /**
     * The current position and orientation of the robot.
     *
     * ```
     * const [x, y, vx, vy, heading] = jdunpack<[number, number, number, number, number]>(buf, "i16.16 i16.16 i16.16 i16.16 i16.16")
     * ```
     */
    Kinematics = 0x101,
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
     * Read-write # uint32_t. When set to `N`, will stream `N` samples as `current_sample` reading.
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
export enum ServoReg {
    /**
     * Read-write ° i16.16 (int32_t). Specifies the angle of the arm (request).
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
    MinAngle = 0x110,

    /**
     * Read-write μs uint16_t. The length of pulse corresponding to lowest angle.
     *
     * ```
     * const [minPulse] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MinPulse = 0x83,

    /**
     * Constant ° i16.16 (int32_t). Highest angle that can be set.
     *
     * ```
     * const [maxAngle] = jdunpack<[number]>(buf, "i16.16")
     * ```
     */
    MaxAngle = 0x111,

    /**
     * Read-write μs uint16_t. The length of pulse corresponding to highest angle.
     *
     * ```
     * const [maxPulse] = jdunpack<[number]>(buf, "u16")
     * ```
     */
    MaxPulse = 0x85,

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

    /**
     * Read-only ° i16.16 (int32_t). The current physical position of the arm.
     *
     * ```
     * const [currentAngle] = jdunpack<[number]>(buf, "i16.16")
     * ```
     */
    CurrentAngle = 0x101,
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

export enum SevenSegmentDisplayCmd {
    /**
     * Argument: value f64 (uint64_t). Shows the number on the screen using the decimal dot if available.
     */
    SetNumber = 0x80,

    /**
     * Argument: text string (bytes). Shows the text on the screen. The client may decide to scroll the text if too long.
     */
    SetText = 0x81,
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
     * Read-only ratio u0.16 (uint16_t). The error on the moisture reading.
     *
     * ```
     * const [moistureError] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    MoistureError = 0x106,

    /**
     * Constant Variant (uint8_t). Describe the type of physical sensor.
     *
     * ```
     * const [variant] = jdunpack<[SoilMoistureVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Solenoid
export const SRV_SOLENOID = 0x171723ca

export enum SolenoidVariant { // uint8_t
    PushPull = 0x1,
    Valve = 0x2,
    Latch = 0x3,
}

export enum SolenoidReg {
    /**
     * Read-write bool (uint8_t). Indicates whether the solenoid is energized and pulled (on) or pushed (off).
     *
     * ```
     * const [pulled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Pulled = 0x1,

    /**
     * Constant Variant (uint8_t). Describes the type of solenoid used.
     *
     * ```
     * const [variant] = jdunpack<[SolenoidVariant]>(buf, "u8")
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
     * Read-write bool (uint8_t). Turn on or off the microphone.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Read-write dB int16_t. The minimum power value considered by the sensor.
     * If both ``min_decibels`` and ``max_decibels`` are supported,
     * the volume in deciment can be linearly interpolated between
     * ``[min_decibels, max_decibels]``.
     *
     * ```
     * const [minDecibels] = jdunpack<[number]>(buf, "i16")
     * ```
     */
    MinDecibels = 0x81,

    /**
     * Read-write dB int16_t. The maximum power value considered by the sensor.
     * If both ``min_decibels`` and ``max_decibels`` are supported,
     * the volume in deciment can be linearly interpolated between
     * ``[min_decibels, max_decibels]``.
     *
     * ```
     * const [maxDecibels] = jdunpack<[number]>(buf, "i16")
     * ```
     */
    MaxDecibels = 0x82,

    /**
     * Read-write ratio u0.16 (uint16_t). The sound level to trigger a loud event.
     *
     * ```
     * const [loudThreshold] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    LoudThreshold = 0x6,

    /**
     * Read-write ratio u0.16 (uint16_t). The sound level to trigger a quiet event.
     *
     * ```
     * const [quietThreshold] = jdunpack<[number]>(buf, "u0.16")
     * ```
     */
    QuietThreshold = 0x5,
}

export enum SoundLevelEvent {
    /**
     * Raised when a loud sound is detected
     */
    Loud = 0x1,

    /**
     * Raised when a period of quietness is detected
     */
    Quiet = 0x2,
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
     * Argument: name string (bytes). Starts playing a sound.
     *
     * ```
     * const [name] = jdunpack<[string]>(buf, "s")
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


// Service: Sound Spectrum
export const SRV_SOUND_SPECTRUM = 0x157abc1e
export enum SoundSpectrumReg {
    /**
     * Read-only bytes. The computed frequency data.
     *
     * ```
     * const [frequencyBins] = jdunpack<[Uint8Array]>(buf, "b")
     * ```
     */
    FrequencyBins = 0x101,

    /**
     * Read-write bool (uint8_t). Turns on/off the micropohone.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Read-write uint8_t. The power of 2 used as the size of the FFT to be used to determine the frequency domain.
     *
     * ```
     * const [fftPow2Size] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    FftPow2Size = 0x80,

    /**
     * Read-write dB int16_t. The minimum power value in the scaling range for the FFT analysis data
     *
     * ```
     * const [minDecibels] = jdunpack<[number]>(buf, "i16")
     * ```
     */
    MinDecibels = 0x81,

    /**
     * Read-write dB int16_t. The maximum power value in the scaling range for the FFT analysis data
     *
     * ```
     * const [maxDecibels] = jdunpack<[number]>(buf, "i16")
     * ```
     */
    MaxDecibels = 0x82,

    /**
     * Read-write ratio u0.8 (uint8_t). The averaging constant with the last analysis frame.
     * If ``0`` is set, there is no averaging done, whereas a value of ``1`` means "overlap the previous and current buffer quite a lot while computing the value".
     *
     * ```
     * const [smoothingTimeConstant] = jdunpack<[number]>(buf, "u0.8")
     * ```
     */
    SmoothingTimeConstant = 0x83,
}

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

export enum SwitchVariant { // uint8_t
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
     * Constant Variant (uint8_t). Describes the type of switch used.
     *
     * ```
     * const [variant] = jdunpack<[SwitchVariant]>(buf, "u8")
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


// Service: Thermocouple
export const SRV_THERMOCOUPLE = 0x143ac061

export enum ThermocoupleVariant { // uint8_t
    TypeK = 0x1,
    TypeJ = 0x2,
    TypeT = 0x3,
    TypeE = 0x4,
    TypeN = 0x5,
    TypeS = 0x6,
    TypeR = 0x7,
    TypeB = 0x8,
}

export enum ThermocoupleReg {
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

// Service: Thermometer
export const SRV_THERMOMETER = 0x1421bac7

export enum ThermometerVariant { // uint8_t
    Outdoor = 0x1,
    Indoor = 0x2,
    Body = 0x3,
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
     * Constant Variant (uint8_t). Specifies the type of thermometer.
     *
     * ```
     * const [variant] = jdunpack<[ThermometerVariant]>(buf, "u8")
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
export enum TvocReg {
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
     * const [minTVOC] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    MinTVOC = 0x104,

    /**
     * Constant ppb u22.10 (uint32_t). Minimum measurable value
     *
     * ```
     * const [maxTVOC] = jdunpack<[number]>(buf, "u22.10")
     * ```
     */
    MaxTVOC = 0x105,

    /**
     * Constant s uint32_t. Time required to achieve good sensor stability before measuring after long idle period.
     *
     * ```
     * const [conditioningPeriod] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    ConditioningPeriod = 0x180,
}

// Service: Unique Brain
export const SRV_UNIQUE_BRAIN = 0x103c4ee5
// Service: UV index
export const SRV_UV_INDEX = 0x1f6e0d90

export enum UvIndexVariant { // uint8_t
    UVA_UVB = 0x1,
    Visible_IR = 0x2,
}

export enum UvIndexReg {
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
     * const [variant] = jdunpack<[UvIndexVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Verified Telemetry
export const SRV_VERIFIED_TELEMETRY = 0x2194841f

export enum VerifiedTelemetryStatus { // uint8_t
    Unknown = 0x0,
    Working = 0x1,
    Faulty = 0x2,
}


export enum VerifiedTelemetryFingerprintType { // uint8_t
    FallCurve = 0x1,
    CurrentSense = 0x2,
    Custom = 0x3,
}

export enum VerifiedTelemetryReg {
    /**
     * Read-only Status (uint8_t). Reads the telemetry working status, where ``true`` is working and ``false`` is faulty.
     *
     * ```
     * const [telemetryStatus] = jdunpack<[VerifiedTelemetryStatus]>(buf, "u8")
     * ```
     */
    TelemetryStatus = 0x180,

    /**
     * Read-write ms uint32_t. Specifies the interval between computing the fingerprint information.
     *
     * ```
     * const [telemetryStatusInterval] = jdunpack<[number]>(buf, "u32")
     * ```
     */
    TelemetryStatusInterval = 0x80,

    /**
     * Constant FingerprintType (uint8_t). Type of the fingerprint.
     *
     * ```
     * const [fingerprintType] = jdunpack<[VerifiedTelemetryFingerprintType]>(buf, "u8")
     * ```
     */
    FingerprintType = 0x181,

    /**
     * Template Fingerprint information of a working sensor.
     *
     * ```
     * const [confidence, template] = jdunpack<[number, Uint8Array]>(buf, "u16 b")
     * ```
     */
    FingerprintTemplate = 0x182,
}

export enum VerifiedTelemetryCmd {
    /**
     * No args. This command will clear the template fingerprint of a sensor and collect a new template fingerprint of the attached sensor.
     */
    ResetFingerprintTemplate = 0x80,

    /**
     * No args. This command will append a new template fingerprint to the `fingerprintTemplate`. Appending more fingerprints will increase the accuracy in detecting the telemetry status.
     */
    RetrainFingerprintTemplate = 0x81,
}

export enum VerifiedTelemetryEvent {
    /**
     * Argument: telemetry_status Status (uint8_t). The telemetry status of the device was updated.
     *
     * ```
     * const [telemetryStatus] = jdunpack<[VerifiedTelemetryStatus]>(buf, "u8")
     * ```
     */
    TelemetryStatusChange = 0x3,

    /**
     * The fingerprint template was updated
     */
    FingerprintTemplateChange = 0x80,
}

// Service: Vibration motor
export const SRV_VIBRATION_MOTOR = 0x183fc4a2
export enum VibrationMotorReg {
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
     * Starts a sequence of vibration and pauses. To stop any existing vibration, send an empty payload.
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

export enum WaterLevelVariant { // uint8_t
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
     * Constant Variant (uint8_t). The type of physical sensor.
     *
     * ```
     * const [variant] = jdunpack<[WaterLevelVariant]>(buf, "u8")
     * ```
     */
    Variant = 0x107,
}

// Service: Weight Scale
export const SRV_WEIGHT_SCALE = 0x1f4d5040

export enum WeightScaleVariant { // uint8_t
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
     * Constant Variant (uint8_t). The type of physical scale
     *
     * ```
     * const [variant] = jdunpack<[WeightScaleVariant]>(buf, "u8")
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
     * Argument: results pipe (bytes). Return list of WiFi network from the last scan.
     * Scans are performed periodically while not connected (in particular, on startup and after current connection drops),
     * as well as upon `reconnect` and `scan` commands.
     *
     * ```
     * const [results] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    LastScanResults = 0x80,

    /**
     * Automatically connect to named network if available. Also set password if network is not open.
     *
     * ```
     * const [ssid, password] = jdunpack<[string, string]>(buf, "z z")
     * ```
     */
    AddNetwork = 0x81,

    /**
     * No args. Enable the WiFi (if disabled), initiate a scan, wait for results, disconnect from current WiFi network if any,
     * and then reconnect (using regular algorithm, see `set_network_priority`).
     */
    Reconnect = 0x82,

    /**
     * Argument: ssid string (bytes). Prevent from automatically connecting to named network in future.
     * Forgetting a network resets its priority to `0`.
     *
     * ```
     * const [ssid] = jdunpack<[string]>(buf, "s")
     * ```
     */
    ForgetNetwork = 0x83,

    /**
     * No args. Clear the list of known networks.
     */
    ForgetAllNetworks = 0x84,

    /**
     * Set connection priority for a network.
     * By default, all known networks have priority of `0`.
     *
     * ```
     * const [priority, ssid] = jdunpack<[number, string]>(buf, "i16 s")
     * ```
     */
    SetNetworkPriority = 0x85,

    /**
     * No args. Initiate search for WiFi networks. Generates `scan_complete` event.
     */
    Scan = 0x86,

    /**
     * Argument: results pipe (bytes). Return list of known WiFi networks.
     * `flags` is currently always 0.
     *
     * ```
     * const [results] = jdunpack<[Uint8Array]>(buf, "b[12]")
     * ```
     */
    ListKnownNetworks = 0x87,
}


/**
 * pipe_report Results
 * ```
 * const [flags, rssi, channel, bssid, ssid] = jdunpack<[WifiAPFlags, number, number, Uint8Array, string]>(buf, "u32 x[4] i8 u8 b[6] s[33]")
 * ```
 */

/**
 * pipe_report NetworkResults
 * ```
 * const [priority, flags, ssid] = jdunpack<[number, number, string]>(buf, "i16 i16 s")
 * ```
 */


export enum WifiReg {
    /**
     * Read-write bool (uint8_t). Determines whether the WiFi radio is enabled. It starts enabled upon reset.
     *
     * ```
     * const [enabled] = jdunpack<[number]>(buf, "u8")
     * ```
     */
    Enabled = 0x1,

    /**
     * Read-only bytes. 0, 4 or 16 byte buffer with the IPv4 or IPv6 address assigned to device if any.
     *
     * ```
     * const [ipAddress] = jdunpack<[Uint8Array]>(buf, "b[16]")
     * ```
     */
    IpAddress = 0x181,

    /**
     * Constant bytes. The 6-byte MAC address of the device. If a device does MAC address randomization it will have to "restart".
     *
     * ```
     * const [eui48] = jdunpack<[Uint8Array]>(buf, "b[6]")
     * ```
     */
    Eui48 = 0x182,

    /**
     * Read-only string (bytes). SSID of the access-point to which device is currently connected.
     * Empty string if not connected.
     *
     * ```
     * const [ssid] = jdunpack<[string]>(buf, "s[32]")
     * ```
     */
    Ssid = 0x183,

    /**
     * Read-only dB int8_t. Current signal strength. Returns -128 when not connected.
     *
     * ```
     * const [rssi] = jdunpack<[number]>(buf, "i8")
     * ```
     */
    Rssi = 0x184,
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

    /**
     * A WiFi network scan has completed. Results can be read with the `last_scan_results` command.
     * The event indicates how many networks where found, and how many are considered
     * as candidates for connection.
     *
     * ```
     * const [numNetworks, numKnownNetworks] = jdunpack<[number, number]>(buf, "u16 u16")
     * ```
     */
    ScanComplete = 0x80,

    /**
     * Emitted whenever the list of known networks is updated.
     */
    NetworksChanged = 0x81,

    /**
     * Argument: ssid string (bytes). Emitted when when a network was detected in scan, the device tried to connect to it
     * and failed.
     * This may be because of wrong password or other random failure.
     *
     * ```
     * const [ssid] = jdunpack<[string]>(buf, "s")
     * ```
     */
    ConnectionFailed = 0x82,
}

// Service: Wind direction
export const SRV_WIND_DIRECTION = 0x186be92b
export enum WindDirectionReg {
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

