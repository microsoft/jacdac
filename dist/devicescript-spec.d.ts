// Service: Common registers and commands
declare enum SystemReadingThreshold { // uint8_t
    Neutral = 0x1,
    Inactive = 0x2,
    Active = 0x3,
}

declare enum SystemStatusCodes { // uint16_t
    Ready = 0x0,
    Initializing = 0x1,
    Calibrating = 0x2,
    Sleeping = 0x3,
    WaitingForInput = 0x4,
    CalibrationNeeded = 0x64,
}

declare class SystemRole extends Role {
    /**
     * No args. Enumeration data for control service; service-specific advertisement data otherwise.
     * Control broadcasts it automatically every ``announce_interval``ms, but other service have to be queried to provide it.
     */
    announce(): void

    /**
     * No args. Registers number `N` is fetched by issuing command `0x1000 | N`.
     * The report format is the same as the format of the register.
     */
    getRegister(): void

    /**
     * No args. Registers number `N` is set by issuing command `0x2000 | N`, with the format
     * the same as the format of the register.
     */
    setRegister(): void

    /**
     * No args. Request to calibrate a sensor. The report indicates the calibration is done.
     */
    calibrate(): void

    /**
     * Read-write uint32_t. This is either binary on/off (0 or non-zero), or can be gradual (eg. brightness of an RGB LED strip).
     */
    intensity: JDRegisterNum

    /**
     * Read-write int32_t. The primary value of actuator (eg. servo pulse length, or motor duty cycle).
     */
    value: JDRegisterNum

    /**
     * Constant int32_t. The lowest value that can be reported for the value register.
     */
    minValue: JDRegisterNum

    /**
     * Constant int32_t. The highest value that can be reported for the value register.
     */
    maxValue: JDRegisterNum

    /**
     * Read-write mA uint16_t. Limit the power drawn by the service, in mA.
     */
    maxPower: JDRegisterNum

    /**
     * Read-write # uint8_t. Asks device to stream a given number of samples
     * (clients will typically write `255` to this register every second or so, while streaming is required).
     */
    streamingSamples: JDRegisterNum

    /**
     * Read-write ms uint32_t. Period between packets of data when streaming in milliseconds.
     */
    streamingInterval: JDRegisterNum

    /**
     * Read-only int32_t. Read-only value of the sensor, also reported in streaming.
     */
    reading: JDRegisterNum

    /**
     * Read-write uint32_t. For sensors that support it, sets the range (sometimes also described `min`/`max_reading`).
     * Typically only a small set of values is supported.
     * Setting it to `X` will select the smallest possible range that is at least `X`,
     * or if it doesn't exist, the largest supported range.
     */
    readingRange: JDRegisterNum

    /**
     * Constant. Lists the values supported as `reading_range`.
     */
    supportedRanges: JDRegisterArray

    /**
     * Constant int32_t. The lowest value that can be reported by the sensor.
     */
    minReading: JDRegisterNum

    /**
     * Constant int32_t. The highest value that can be reported by the sensor.
     */
    maxReading: JDRegisterNum

    /**
     * Read-only uint32_t. The real value of whatever is measured is between `reading - reading_error` and `reading + reading_error`. It should be computed from the internal state of the sensor. This register is often, but not always `const`. If the register value is modified,
     * send a report in the same frame of the ``reading`` report.
     */
    readingError: JDRegisterNum

    /**
     * Constant uint32_t. Smallest, yet distinguishable change in reading.
     */
    readingResolution: JDRegisterNum

    /**
     * Read-write int32_t. Threshold when reading data gets inactive and triggers a ``inactive``.
     */
    inactiveThreshold: JDRegisterNum

    /**
     * Read-write int32_t. Thresholds when reading data gets active and triggers a ``active`` event.
     */
    activeThreshold: JDRegisterNum

    /**
     * Constant ms uint32_t. Preferred default streaming interval for sensor in milliseconds.
     */
    streamingPreferredInterval: JDRegisterNum

    /**
     * Constant uint32_t. The hardware variant of the service.
     * For services which support this, there's an enum defining the meaning.
     */
    variant: JDRegisterNum

    /**
     * Reports the current state or error status of the device. ``code`` is a standardized value from
     * the Jacdac status/error codes. ``vendor_code`` is any vendor specific error code describing the device
     * state. This report is typically not queried, when a device has an error, it will typically
     * add this report in frame along with the announce packet.
     */
    statusCode: JDRegisterArray & {
        code: SystemStatusCodes
        vendor_code: number
    }

    /**
     * Constant string (bytes). A friendly name that describes the role of this service instance in the device.
     */
    instanceName: JDRegisterString

    /**
     * Notifies that the service has been activated (eg. button pressed, network connected, etc.)
     */
    active: JDEvent

    /**
     * Notifies that the service has been dis-activated.
     */
    inactive: JDEvent

    /**
     * Notifies that the some state of the service changed.
     */
    change: JDEvent

    /**
     * Notifies that the status code of the service changed.
     */
    statusCodeChanged: JDEvent

    /**
     * Notifies that the threshold is back between ``low`` and ``high``.
     */
    neutral: JDEvent
}

// Service: Base service
declare class BaseRole extends Role {
    /**
     * Constant string (bytes). A friendly name that describes the role of this service instance in the device.
     * It often corresponds to what's printed on the device:
     * for example, `A` for button A, or `S0` for servo channel 0.
     * Words like `left` should be avoided because of localization issues (unless they are printed on the device).
     */
    instanceName: JDRegisterString

    /**
     * Reports the current state or error status of the device. ``code`` is a standardized value from
     * the Jacdac status/error codes. ``vendor_code`` is any vendor specific error code describing the device
     * state. This report is typically not queried, when a device has an error, it will typically
     * add this report in frame along with the announce packet. If a service implements this register,
     * it should also support the ``status_code_changed`` event defined below.
     */
    statusCode: JDRegisterArray & { code: number; vendor_code: number }

    /**
     * Notifies that the status code of the service changed.
     */
    statusCodeChanged: JDEvent
}

// Service: Sensor
declare class SensorRole extends Role {
    /**
     * Read-write # uint8_t. Asks device to stream a given number of samples
     * (clients will typically write `255` to this register every second or so, while streaming is required).
     */
    streamingSamples: JDRegisterNum

    /**
     * Read-write ms uint32_t. Period between packets of data when streaming in milliseconds.
     */
    streamingInterval: JDRegisterNum

    /**
     * Constant ms uint32_t. Preferred default streaming interval for sensor in milliseconds.
     */
    streamingPreferredInterval: JDRegisterNum
}

// Service: Accelerometer
declare class AccelerometerRole extends SensorRole {
    /**
     * Indicates the current forces acting on accelerometer.
     */
    forces: JDRegisterArray & { x: number; y: number; z: number }

    /**
     * Read-only g u12.20 (uint32_t). Error on the reading value.
     */
    forcesError: JDRegisterNum

    /**
     * Read-write g u12.20 (uint32_t). Configures the range forces detected.
     * The value will be "rounded up" to one of `max_forces_supported`.
     */
    maxForce: JDRegisterNum

    /**
     * Constant. Lists values supported for writing `max_force`.
     */
    maxForcesSupported: JDRegisterArray

    /**
     * Emitted when accelerometer is tilted in the given direction.
     */
    tiltUp: JDEvent

    /**
     * Emitted when accelerometer is tilted in the given direction.
     */
    tiltDown: JDEvent

    /**
     * Emitted when accelerometer is tilted in the given direction.
     */
    tiltLeft: JDEvent

    /**
     * Emitted when accelerometer is tilted in the given direction.
     */
    tiltRight: JDEvent

    /**
     * Emitted when accelerometer is laying flat in the given direction.
     */
    faceUp: JDEvent

    /**
     * Emitted when accelerometer is laying flat in the given direction.
     */
    faceDown: JDEvent

    /**
     * Emitted when total force acting on accelerometer is much less than 1g.
     */
    freefall: JDEvent

    /**
     * Emitted when forces change violently a few times.
     */
    shake: JDEvent

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    force2g: JDEvent

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    force3g: JDEvent

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    force6g: JDEvent

    /**
     * Emitted when force in any direction exceeds given threshold.
     */
    force8g: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Accelerometer service role.
     **/
    function accelerometer(): AccelerometerRole
}

// Service: Acidity
declare class AcidityRole extends SensorRole {
    /**
     * Read-only pH u4.12 (uint16_t). The acidity, pH, of water.
     */
    acidity: JDRegisterNum

    /**
     * Read-only pH u4.12 (uint16_t). Error on the acidity reading.
     */
    acidityError: JDRegisterNum

    /**
     * Constant pH u4.12 (uint16_t). Lowest acidity that can be reported.
     */
    minAcidity: JDRegisterNum

    /**
     * Constant pH u4.12 (uint16_t). Highest acidity that can be reported.
     */
    maxHumidity: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Acidity service role.
     **/
    function acidity(): AcidityRole
}

// Service: Air Pressure
declare class AirPressureRole extends SensorRole {
    /**
     * Read-only hPa u22.10 (uint32_t). The air pressure.
     */
    pressure: JDRegisterNum

    /**
     * Read-only hPa u22.10 (uint32_t). The real pressure is between `pressure - pressure_error` and `pressure + pressure_error`.
     */
    pressureError: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Air Pressure service role.
     **/
    function airPressure(): AirPressureRole
}

// Service: Air Quality Index
declare class AirQualityIndexRole extends SensorRole {
    /**
     * Read-only AQI u16.16 (uint32_t). Air quality index, typically refreshed every second.
     */
    aqiIndex: JDRegisterNum

    /**
     * Read-only AQI u16.16 (uint32_t). Error on the AQI measure.
     */
    aqiIndexError: JDRegisterNum

    /**
     * Constant AQI u16.16 (uint32_t). Minimum AQI reading, representing a good air quality. Typically 0.
     */
    minAqiIndex: JDRegisterNum

    /**
     * Constant AQI u16.16 (uint32_t). Maximum AQI reading, representing a very poor air quality.
     */
    maxAqiIndex: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Air Quality Index service role.
     **/
    function airQualityIndex(): AirQualityIndexRole
}

// Service: Arcade Gamepad
declare enum ArcadeGamepadButton { // uint8_t
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

declare class ArcadeGamepadRole extends SensorRole {
    /**
     * Indicates which buttons are currently active (pressed).
     * `pressure` should be `0xff` for digital buttons, and proportional for analog ones.
     */
    buttons: JDRegisterArray & { button: ArcadeGamepadButton; pressure: number }

    /**
     * Constant. Indicates number of players supported and which buttons are present on the controller.
     */
    availableButtons: JDRegisterArray

    /**
     * Argument: button Button (uint8_t). Emitted when button goes from inactive to active.
     */
    down: JDEvent

    /**
     * Argument: button Button (uint8_t). Emitted when button goes from active to inactive.
     */
    up: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Arcade Gamepad service role.
     **/
    function arcadeGamepad(): ArcadeGamepadRole
}

// Service: Arcade Sound
declare class ArcadeSoundRole extends Role {
    /**
     * Argument: samples bytes. Play samples, which are single channel, signed 16-bit little endian values.
     */
    play(samples: number): void

    /**
     * Read-write Hz u22.10 (uint32_t). Get or set playback sample rate (in samples per second).
     * If you set it, read it back, as the value may be rounded up or down.
     */
    sampleRate: JDRegisterNum

    /**
     * Constant B uint32_t. The size of the internal audio buffer.
     */
    bufferSize: JDRegisterNum

    /**
     * Read-only B uint32_t. How much data is still left in the buffer to play.
     * Clients should not send more data than `buffer_size - buffer_pending`,
     * but can keep the `buffer_pending` as low as they want to ensure low latency
     * of audio playback.
     */
    bufferPending: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Arcade Sound service role.
     **/
    function arcadeSound(): ArcadeSoundRole
}

// Service: Azure IoT Hub Health
declare enum AzureIotHubHealthConnectionStatus { // uint16_t
    Connected = 0x1,
    Disconnected = 0x2,
    Connecting = 0x3,
    Disconnecting = 0x4,
}

declare class AzureIotHubHealthRole extends Role {
    /**
     * Read-only string (bytes). Something like `my-iot-hub.azure-devices.net` if available.
     */
    hubName: JDRegisterString

    /**
     * Read-only string (bytes). Device identifier in Azure Iot Hub if available.
     */
    hubDeviceId: JDRegisterString

    /**
     * Read-only ConnectionStatus (uint16_t). Indicates the status of connection. A message beyond the [0..3] range represents an HTTP error code.
     */
    connectionStatus: JDRegisterNum

    /**
     * Read-write ms uint32_t. How often to push data to the cloud.
     */
    pushPeriod: JDRegisterNum

    /**
     * Read-write ms uint32_t. If no message is published within given period, the device resets.
     * This can be due to connectivity problems or due to the device having nothing to publish.
     * Forced to be at least `2 * flush_period`.
     * Set to `0` to disable (default).
     */
    pushWatchdogPeriod: JDRegisterNum

    /**
     * No args. Starts a connection to the IoT hub service
     */
    connect(): void

    /**
     * No args. Starts disconnecting from the IoT hub service
     */
    disconnect(): void

    /**
     * Argument: connection_string string (bytes). Restricted command to override the existing connection string to the Azure IoT Hub.
     */
    setConnectionString(connection_string: string): void

    /**
     * Argument: connection_status ConnectionStatus (uint16_t). Raised when the connection status changes
     */
    connectionStatusChange: JDEvent

    /**
     * Raised when a message has been sent to the hub.
     */
    messageSent: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Azure IoT Hub Health service role.
     **/
    function azureIotHubHealth(): AzureIotHubHealthRole
}

// Service: Barcode reader
declare enum BarcodeReaderFormat { // uint8_t
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

declare class BarcodeReaderRole extends Role {
    /**
     * Read-write bool (uint8_t). Turns on or off the detection of barcodes.
     */
    enabled: JDRegisterNum

    /**
     * Constant. Reports the list of supported barcode formats, as documented in https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API.
     */
    formats: JDRegisterArray

    /**
     * Raised when a bar code is detected and decoded. If the reader detects multiple codes, it will issue multiple events.
     * In case of numeric barcodes, the `data` field should contain the ASCII (which is the same as UTF8 in that case) representation of the number.
     */
    detect: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Barcode reader service role.
     **/
    function barcodeReader(): BarcodeReaderRole
}

// Service: bit:radio
declare class BitRadioRole extends Role {
    /**
     * Read-write bool (uint8_t). Turns on/off the radio antenna.
     */
    enabled: JDRegisterNum

    /**
     * Read-write uint8_t. Group used to filter packets
     */
    group: JDRegisterNum

    /**
     * Read-write uint8_t. Antenna power to increase or decrease range.
     */
    transmissionPower: JDRegisterNum

    /**
     * Read-write uint8_t. Change the transmission and reception band of the radio to the given channel.
     */
    frequencyBand: JDRegisterNum

    /**
     * Argument: message string (bytes). Sends a string payload as a radio message, maximum 18 characters.
     */
    sendString(message: string): void

    /**
     * Argument: value f64 (uint64_t). Sends a double precision number payload as a radio message
     */
    sendNumber(value: number): void

    /**
     * Sends a double precision number and a name payload as a radio message
     */
    sendValue(value: number, name: string): void

    /**
     * Argument: data bytes. Sends a payload of bytes as a radio message
     */
    sendBuffer(data: number): void
}
declare namespace roles {
    /**
     * Declares a new bit:radio service role.
     **/
    function bitRadio(): BitRadioRole
}

// Service: Bootloader
declare enum BootloaderError { // uint32_t
    NoError = 0x0,
    PacketTooSmall = 0x1,
    OutOfFlashableRange = 0x2,
    InvalidPageOffset = 0x3,
    NotPageAligned = 0x4,
}

declare class BootloaderRole extends Role {
    /**
     * No args. The `service_class` is always `0x1ffa9948`. The `product_identifier` identifies the kind of firmware
     * that "fits" this device.
     */
    info(): void

    /**
     * Argument: session_id uint32_t. The flashing server should generate a random id, and use this command to set it.
     */
    setSession(session_id: number): void

    /**
     * Use to send flashing data. A physical page is split into `chunk_max + 1` chunks, where `chunk_no = 0 ... chunk_max`.
     * Each chunk is stored at `page_address + page_offset`. `page_address` has to be equal in all chunks,
     * and is included in response.
     * Only the last chunk causes writing to flash and elicits response.
     */
    pageData(
        page_address: number,
        page_offset: number,
        chunk_no: number,
        chunk_max: number,
        session_id: number,
        reserved0: number,
        reserved1: number,
        reserved2: number,
        reserved3: number,
        page_data: number
    ): void
}
declare namespace roles {
    /**
     * Declares a new Bootloader service role.
     **/
    function bootloader(): BootloaderRole
}

// Service: Braille display
declare class BrailleDisplayRole extends Role {
    /**
     * Read-write bool (uint8_t). Determines if the braille display is active.
     */
    enabled: JDRegisterNum

    /**
     * Read-write string (bytes). Braille patterns to show. Must be unicode characters between `0x2800` and `0x28ff`.
     */
    patterns: JDRegisterString

    /**
     * Constant # uint8_t. Gets the number of patterns that can be displayed.
     */
    length: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Braille display service role.
     **/
    function brailleDisplay(): BrailleDisplayRole
}

// Service: Bridge
declare class BridgeRole extends Role {
    /**
     * Read-write bool (uint8_t). Enables or disables the bridge.
     */
    enabled: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Bridge service role.
     **/
    function bridge(): BridgeRole
}

// Service: Button
declare class ButtonRole extends SensorRole {
    /**
     * Read-only ratio u0.16 (uint16_t). Indicates the pressure state of the button, where `0` is open.
     */
    pressure: JDRegisterNum

    /**
     * Constant bool (uint8_t). Indicates if the button provides analog `pressure` readings.
     */
    analog: JDRegisterNum

    /**
     * Read-only bool (uint8_t). Determines if the button is pressed currently.
     */
    pressed: JDRegisterNum

    /**
     * Emitted when button goes from inactive to active.
     */
    down: JDEvent

    /**
     * Argument: time ms uint32_t. Emitted when button goes from active to inactive. The 'time' parameter
     * records the amount of time between the down and up events.
     */
    up: JDEvent

    /**
     * Argument: time ms uint32_t. Emitted when the press time is greater than 500ms, and then at least every 500ms
     * as long as the button remains pressed. The 'time' parameter records the the amount of time
     * that the button has been held (since the down event).
     */
    hold: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Button service role.
     **/
    function button(): ButtonRole
}

// Service: Buzzer
declare class BuzzerRole extends Role {
    /**
     * Read-write ratio u0.8 (uint8_t). The volume (duty cycle) of the buzzer.
     */
    volume: JDRegisterNum

    /**
     * Play a PWM tone with given period and duty for given duration.
     * The duty is scaled down with `volume` register.
     * To play tone at frequency `F` Hz and volume `V` (in `0..1`) you will want
     * to send `P = 1000000 / F` and `D = P * V / 2`.
     */
    playTone(period: number, duty: number, duration: number): void

    /**
     * Play a note at the given frequency and volume.
     */
    playNote(frequency: number, volume: number, duration: number): void
}
declare namespace roles {
    /**
     * Declares a new Buzzer service role.
     **/
    function buzzer(): BuzzerRole
}

// Service: Capacitive Button
declare class CapacitiveButtonRole extends Role {
    /**
     * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``up`` events.
     */
    threshold: JDRegisterNum

    /**
     * No args. Request to calibrate the capactive. When calibration is requested, the device expects that no object is touching the button.
     * The report indicates the calibration is done.
     */
    calibrate(): void
}
declare namespace roles {
    /**
     * Declares a new Capacitive Button service role.
     **/
    function capacitiveButton(): CapacitiveButtonRole
}

// Service: Character Screen
declare enum CharacterScreenVariant { // uint8_t
    LCD = 0x1,
    OLED = 0x2,
    Braille = 0x3,
}

declare enum CharacterScreenTextDirection { // uint8_t
    LeftToRight = 0x1,
    RightToLeft = 0x2,
}

declare class CharacterScreenRole extends Role {
    /**
     * Read-write string (bytes). Text to show. Use `\n` to break lines.
     */
    message: JDRegisterString

    /**
     * Read-write ratio u0.16 (uint16_t). Brightness of the screen. `0` means off.
     */
    brightness: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Describes the type of character LED screen.
     */
    variant: JDRegisterNum

    /**
     * Read-write TextDirection (uint8_t). Specifies the RTL or LTR direction of the text.
     */
    textDirection: JDRegisterNum

    /**
     * Constant # uint8_t. Gets the number of rows.
     */
    rows: JDRegisterNum

    /**
     * Constant # uint8_t. Gets the number of columns.
     */
    columns: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Character Screen service role.
     **/
    function characterScreen(): CharacterScreenRole
}

// Service: Cloud Adapter
declare enum CloudAdapterCommandStatus { // uint32_t
    OK = 0xc8,
    NotFound = 0x194,
    Busy = 0x1ad,
}

declare class CloudAdapterRole extends Role {
    /**
     * Upload a labelled tuple of values to the cloud.
     * The tuple will be automatically tagged with timestamp and originating device.
     */
    upload(label: string, ...value: number[]): void

    /**
     * Argument: payload bytes. Upload a binary message to the cloud.
     */
    uploadBin(payload: number): void

    /**
     * Should be called when it finishes handling a `cloud_command`.
     */
    ackCloudCommand(
        seq_no: number,
        status: CloudAdapterCommandStatus,
        ...result: number[]
    ): void

    /**
     * Read-only bool (uint8_t). Indicate whether we're currently connected to the cloud server.
     * When offline, `upload` commands are queued, and `get_twin` respond with cached values.
     */
    connected: JDRegisterNum

    /**
     * Read-only string (bytes). User-friendly name of the connection, typically includes name of the server
     * and/or type of cloud service (`"something.cloud.net (Provider IoT)"`).
     */
    connectionName: JDRegisterString

    /**
     * Emitted when cloud requests to run some action.
     */
    cloudCommand: JDEvent

    /**
     * Emitted when we connect or disconnect from the cloud.
     */
    change: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Cloud Adapter service role.
     **/
    function cloudAdapter(): CloudAdapterRole
}

// Service: CODAL Message Bus
declare class CodalMessageBusRole extends Role {
    /**
     * Send a message on the CODAL bus. If `source` is `0`, it is treated as wildcard.
     */
    send(source: number, value: number): void

    /**
     * Raised by the server is triggered by the server. The filtering logic of which event to send over Jacdac is up to the server implementation.
     */
    message: JDEvent
}
declare namespace roles {
    /**
     * Declares a new CODAL Message Bus service role.
     **/
    function codalMessageBus(): CodalMessageBusRole
}

// Service: Color
declare class ColorRole extends SensorRole {
    /**
     * Detected color in the RGB color space.
     */
    color: JDRegisterArray & { red: number; green: number; blue: number }
}
declare namespace roles {
    /**
     * Declares a new Color service role.
     **/
    function color(): ColorRole
}

// Service: Compass
declare class CompassRole extends SensorRole {
    /**
     * Read-only ° u16.16 (uint32_t). The heading with respect to the magnetic north.
     */
    heading: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Turn on or off the sensor. Turning on the sensor may start a calibration sequence.
     */
    enabled: JDRegisterNum

    /**
     * Read-only ° u16.16 (uint32_t). Error on the heading reading
     */
    headingError: JDRegisterNum

    /**
     * No args. Starts a calibration sequence for the compass.
     */
    calibrate(): void
}
declare namespace roles {
    /**
     * Declares a new Compass service role.
     **/
    function compass(): CompassRole
}

// Service: Control
declare enum ControlAnnounceFlags { // uint16_t
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

declare class ControlRole extends Role {
    /**
     * No args. The `restart_counter` is computed from the `flags & RestartCounterSteady`, starts at `0x1` and increments by one until it reaches `0xf`, then it stays at `0xf`.
     * If this number ever goes down, it indicates that the device restarted.
     * `service_class` indicates class identifier for each service index (service index `0` is always control, so it's
     * skipped in this enumeration).
     * `packet_count` indicates the number of reports sent by the current device since last announce,
     * including the current announce packet (it is always 0 if this feature is not supported).
     * The command form can be used to induce report, which is otherwise broadcast every 500ms.
     */
    services(): void

    /**
     * No args. Do nothing. Always ignored. Can be used to test ACKs.
     */
    noop(): void

    /**
     * No args. Blink the status LED (262ms on, 262ms off, four times, with the blue LED) or otherwise draw user's attention to device with no status light.
     * For devices with status light (this can be discovered in the announce flags), the client should
     * send the sequence of status light command to generate the identify animation.
     */
    identify(): void

    /**
     * No args. Reset device. ACK may or may not be sent.
     */
    reset(): void

    /**
     * The device will respond `num_responses` times, as fast as it can, setting the `counter` field in the report
     * to `start_counter`, then `start_counter + 1`, ..., and finally `start_counter + num_responses - 1`.
     * The `dummy_payload` is `size` bytes long and contains bytes `0, 1, 2, ...`.
     */
    floodPing(num_responses: number, start_counter: number, size: number): void

    /**
     * Initiates a color transition of the status light from its current color to the one specified.
     * The transition will complete in about `512 / speed` frames
     * (each frame is currently 100ms, so speed of `51` is about 1 second and `26` 0.5 second).
     * As a special case, if speed is `0` the transition is immediate.
     * If MCU is not capable of executing transitions, it can consider `speed` to be always `0`.
     * If a monochrome LEDs is fitted, the average value of `red`, `green`, `blue` is used.
     * If intensity of a monochrome LED cannot be controlled, any value larger than `0` should be considered
     * on, and `0` (for all three channels) should be considered off.
     */
    setStatusLight(
        to_red: number,
        to_green: number,
        to_blue: number,
        speed: number
    ): void

    /**
     * No args. Force client device into proxy mode.
     */
    proxy(): void

    /**
     * Argument: seed uint32_t. This opens a pipe to the device to provide an alternative, reliable transport of actions
     * (and possibly other commands).
     * The commands are wrapped as pipe data packets.
     * Multiple invocations of this command with the same `seed` are dropped
     * (and thus the command is not `unique`); otherwise `seed` carries no meaning
     * and should be set to a random value by the client.
     * Note that while the commands sends this way are delivered exactly once, the
     * responses might get lost.
     */
    reliableCommands(seed: number): void

    /**
     * Read-write μs uint32_t. When set to value other than `0`, it asks the device to reset after specified number of microseconds.
     * This is typically used to implement watchdog functionality, where a brain device sets `reset_in` to
     * say 1.6s every 0.5s.
     */
    resetIn: JDRegisterNum

    /**
     * Constant string (bytes). Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)
     */
    deviceDescription: JDRegisterString

    /**
     * Constant uint32_t. A numeric code for the string above; used to identify firmware images and devices.
     */
    productIdentifier: JDRegisterNum

    /**
     * Constant uint32_t. Typically the same as `product_identifier` unless device was flashed by hand; the bootloader will respond to that code.
     */
    bootloaderProductIdentifier: JDRegisterNum

    /**
     * Constant string (bytes). A string describing firmware version; typically semver.
     */
    firmwareVersion: JDRegisterString

    /**
     * Read-only °C int16_t. MCU temperature in degrees Celsius (approximate).
     */
    mcuTemperature: JDRegisterNum

    /**
     * Read-only μs uint64_t. Number of microseconds since boot.
     */
    uptime: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Control service role.
     **/
    function control(): ControlRole
}

// Service: Dashboard
declare class DashboardRole extends Role {}
declare namespace roles {
    /**
     * Declares a new Dashboard service role.
     **/
    function dashboard(): DashboardRole
}

// Service: DC Current Measurement
declare class DcCurrentMeasurementRole extends SensorRole {
    /**
     * Constant string (bytes). A string containing the net name that is being measured e.g. `POWER_DUT` or a reference e.g. `DIFF_DEV1_DEV2`. These constants can be used to identify a measurement from client code.
     */
    measurementName: JDRegisterString

    /**
     * Read-only A f64 (uint64_t). The current measurement.
     */
    measurement: JDRegisterNum

    /**
     * Read-only A f64 (uint64_t). Absolute error on the reading value.
     */
    measurementError: JDRegisterNum

    /**
     * Constant A f64 (uint64_t). Minimum measurable current
     */
    minMeasurement: JDRegisterNum

    /**
     * Constant A f64 (uint64_t). Maximum measurable current
     */
    maxMeasurement: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new DC Current Measurement service role.
     **/
    function dcCurrentMeasurement(): DcCurrentMeasurementRole
}

// Service: DC Voltage Measurement
declare enum DcVoltageMeasurementVoltageMeasurementType { // uint8_t
    Absolute = 0x0,
    Differential = 0x1,
}

declare class DcVoltageMeasurementRole extends SensorRole {
    /**
     * Constant VoltageMeasurementType (uint8_t). The type of measurement that is taking place. Absolute results are measured with respect to ground, whereas differential results are measured against another signal that is not ground.
     */
    measurementType: JDRegisterNum

    /**
     * Constant string (bytes). A string containing the net name that is being measured e.g. `POWER_DUT` or a reference e.g. `DIFF_DEV1_DEV2`. These constants can be used to identify a measurement from client code.
     */
    measurementName: JDRegisterString

    /**
     * Read-only V f64 (uint64_t). The voltage measurement.
     */
    measurement: JDRegisterNum

    /**
     * Read-only V f64 (uint64_t). Absolute error on the reading value.
     */
    measurementError: JDRegisterNum

    /**
     * Constant V f64 (uint64_t). Minimum measurable current
     */
    minMeasurement: JDRegisterNum

    /**
     * Constant V f64 (uint64_t). Maximum measurable current
     */
    maxMeasurement: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new DC Voltage Measurement service role.
     **/
    function dcVoltageMeasurement(): DcVoltageMeasurementRole
}

// Service: DeviceScript Condition
declare class DeviceScriptConditionRole extends Role {
    /**
     * No args. Triggers a `signalled` event.
     */
    signal(): void

    /**
     * Triggered by `signal` command.
     */
    signalled: JDEvent
}
declare namespace roles {
    /**
     * Declares a new DeviceScript Condition service role.
     **/
    function deviceScriptCondition(): DeviceScriptConditionRole
}

// Service: DeviceScript Manager
declare enum DeviceScriptManagerMessageFlags { // uint8_t
    ToBeContinued = 0x1,
}

declare class DeviceScriptManagerRole extends Role {
    /**
     * Argument: bytecode_size B uint32_t. Open pipe for streaming in the bytecode of the program. The size of the bytecode has to be declared upfront.
     * To clear the program, use `bytecode_size == 0`.
     * The bytecode is streamed over regular pipe data packets.
     * The bytecode shall be fully written into flash upon closing the pipe.
     * If `autostart` is true, the program will start after being deployed.
     * The data payloads, including the last one, should have a size that is a multiple of 32 bytes.
     * Thus, the initial bytecode_size also needs to be a multiple of 32.
     */
    deployBytecode(bytecode_size: number): void

    /**
     * Argument: bytecode pipe (bytes). Get the current bytecode deployed on device.
     */
    readBytecode(bytecode: number): void

    /**
     * Read-write bool (uint8_t). Indicates if the program is currently running.
     * To restart the program, stop it (write `0`), read back the register to make sure it's stopped,
     * start it, and read back.
     */
    running: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Indicates wheather the program should be re-started upon `reboot()` or `panic()`.
     * Defaults to `true`.
     */
    autostart: JDRegisterNum

    /**
     * Read-write bool (uint8_t). `log_message` reports are only sent when this is `true`.
     * It defaults to `false`.
     */
    logging: JDRegisterNum

    /**
     * Read-only uint32_t. The size of current program.
     */
    programSize: JDRegisterNum

    /**
     * Read-only uint32_t. Return FNV1A hash of the current bytecode.
     */
    programHash: JDRegisterNum

    /**
     * Read-only bytes. Return 32-byte long SHA-256 hash of the current bytecode.
     */
    programSha256: JDRegisterNum

    /**
     * Emitted when the program calls `panic(panic_code)` or `reboot()` (`panic_code == 0` in that case).
     * The byte offset in byte code of the call is given in `program_counter`.
     * The program will restart immediately when `panic_code == 0` or in a few seconds otherwise.
     */
    programPanic: JDEvent

    /**
     * Emitted after bytecode of the program has changed.
     */
    programChange: JDEvent
}
declare namespace roles {
    /**
     * Declares a new DeviceScript Manager service role.
     **/
    function deviceScriptManager(): DeviceScriptManagerRole
}

// Service: Distance
declare enum DistanceVariant { // uint8_t
    Ultrasonic = 0x1,
    Infrared = 0x2,
    LiDAR = 0x3,
    Laser = 0x4,
}

declare class DistanceRole extends SensorRole {
    /**
     * Read-only m u16.16 (uint32_t). Current distance from the object
     */
    distance: JDRegisterNum

    /**
     * Read-only m u16.16 (uint32_t). Absolute error on the reading value.
     */
    distanceError: JDRegisterNum

    /**
     * Constant m u16.16 (uint32_t). Minimum measurable distance
     */
    minRange: JDRegisterNum

    /**
     * Constant m u16.16 (uint32_t). Maximum measurable distance
     */
    maxRange: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Determines the type of sensor used.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Distance service role.
     **/
    function distance(): DistanceRole
}

// Service: DMX
declare class DmxRole extends Role {
    /**
     * Read-write bool (uint8_t). Determines if the DMX bridge is active.
     */
    enabled: JDRegisterNum

    /**
     * Argument: channels bytes. Send a DMX packet, up to 236bytes long, including the start code.
     */
    send(channels: number): void
}
declare namespace roles {
    /**
     * Declares a new DMX service role.
     **/
    function dmx(): DmxRole
}

// Service: Dot Matrix
declare enum DotMatrixVariant { // uint8_t
    LED = 0x1,
    Braille = 0x2,
}

declare class DotMatrixRole extends Role {
    /**
     * Read-write bytes. The state of the screen where dot on/off state is
     * stored as a bit, column by column. The column should be byte aligned.
     */
    dots: JDRegisterNum

    /**
     * Read-write ratio u0.8 (uint8_t). Reads the general brightness of the display, brightness for LEDs. `0` when the screen is off.
     */
    brightness: JDRegisterNum

    /**
     * Constant # uint16_t. Number of rows on the screen
     */
    rows: JDRegisterNum

    /**
     * Constant # uint16_t. Number of columns on the screen
     */
    columns: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Describes the type of matrix used.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Dot Matrix service role.
     **/
    function dotMatrix(): DotMatrixRole
}

// Service: Dual Motors
declare class DualMotorsRole extends Role {
    /**
     * Relative speed of the motors. Use positive/negative values to run the motor forwards and backwards.
     * A speed of ``0`` while ``enabled`` acts as brake.
     */
    speed: JDRegisterArray & { left: number; right: number }

    /**
     * Read-write bool (uint8_t). Turn the power to the motors on/off.
     */
    enabled: JDRegisterNum

    /**
     * Constant kg/cm u16.16 (uint32_t). Torque required to produce the rated power of an each electrical motor at load speed.
     */
    loadTorque: JDRegisterNum

    /**
     * Constant rpm u16.16 (uint32_t). Revolutions per minute of the motor under full load.
     */
    loadRotationSpeed: JDRegisterNum

    /**
     * Constant bool (uint8_t). Indicates if the motors can run backwards.
     */
    reversible: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Dual Motors service role.
     **/
    function dualMotors(): DualMotorsRole
}

// Service: Equivalent CO₂
declare enum ECO2Variant { // uint8_t
    VOC = 0x1,
    NDIR = 0x2,
}

declare class ECO2Role extends SensorRole {
    /**
     * Read-only ppm u22.10 (uint32_t). Equivalent CO₂ (eCO₂) readings.
     */
    eCO2: JDRegisterNum

    /**
     * Read-only ppm u22.10 (uint32_t). Error on the reading value.
     */
    eCO2Error: JDRegisterNum

    /**
     * Constant ppm u22.10 (uint32_t). Minimum measurable value
     */
    minECO2: JDRegisterNum

    /**
     * Constant ppm u22.10 (uint32_t). Minimum measurable value
     */
    maxECO2: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Type of physical sensor and capabilities.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Equivalent CO₂ service role.
     **/
    function eCO2(): ECO2Role
}

// Service: Flex
declare class FlexRole extends SensorRole {
    /**
     * Read-only ratio i1.15 (int16_t). A measure of the bending.
     */
    bending: JDRegisterNum

    /**
     * Constant mm uint16_t. Length of the flex sensor
     */
    length: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Flex service role.
     **/
    function flex(): FlexRole
}

// Service: Gamepad
declare enum GamepadButtons { // uint32_t
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

declare enum GamepadVariant { // uint8_t
    Thumb = 0x1,
    ArcadeBall = 0x2,
    ArcadeStick = 0x3,
    Gamepad = 0x4,
}

declare class GamepadRole extends SensorRole {
    /**
     * If the gamepad is analog, the directional buttons should be "simulated", based on gamepad position
     * (`Left` is `{ x = -1, y = 0 }`, `Up` is `{ x = 0, y = -1}`).
     * If the gamepad is digital, then each direction will read as either `-1`, `0`, or `1` (in fixed representation).
     * The primary button on the gamepad is `A`.
     */
    direction: JDRegisterArray & {
        buttons: GamepadButtons
        x: number
        y: number
    }

    /**
     * Constant Variant (uint8_t). The type of physical gamepad.
     */
    variant: JDRegisterNum

    /**
     * Constant Buttons (uint32_t). Indicates a bitmask of the buttons that are mounted on the gamepad.
     * If the `Left`/`Up`/`Right`/`Down` buttons are marked as available here, the gamepad is digital.
     * Even when marked as not available, they will still be simulated based on the analog gamepad.
     */
    buttonsAvailable: JDRegisterNum

    /**
     * Argument: buttons Buttons (uint32_t). Emitted whenever the state of buttons changes.
     */
    buttonsChanged: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Gamepad service role.
     **/
    function gamepad(): GamepadRole
}

// Service: Gyroscope
declare class GyroscopeRole extends SensorRole {
    /**
     * Indicates the current rates acting on gyroscope.
     */
    rotationRates: JDRegisterArray & { x: number; y: number; z: number }

    /**
     * Read-only °/s u12.20 (uint32_t). Error on the reading value.
     */
    rotationRatesError: JDRegisterNum

    /**
     * Read-write °/s u12.20 (uint32_t). Configures the range of rotation rates.
     * The value will be "rounded up" to one of `max_rates_supported`.
     */
    maxRate: JDRegisterNum

    /**
     * Constant. Lists values supported for writing `max_rate`.
     */
    maxRatesSupported: JDRegisterArray
}
declare namespace roles {
    /**
     * Declares a new Gyroscope service role.
     **/
    function gyroscope(): GyroscopeRole
}

// Service: Heart Rate
declare enum HeartRateVariant { // uint8_t
    Finger = 0x1,
    Chest = 0x2,
    Wrist = 0x3,
    Pump = 0x4,
    WebCam = 0x5,
}

declare class HeartRateRole extends SensorRole {
    /**
     * Read-only bpm u16.16 (uint32_t). The estimated heart rate.
     */
    heartRate: JDRegisterNum

    /**
     * Read-only bpm u16.16 (uint32_t). The estimated error on the reported sensor data.
     */
    heartRateError: JDRegisterNum

    /**
     * Constant Variant (uint8_t). The type of physical sensor
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Heart Rate service role.
     **/
    function heartRate(): HeartRateRole
}

// Service: HID Joystick
declare class HidJoystickRole extends Role {
    /**
     * Constant uint8_t. Number of button report supported
     */
    buttonCount: JDRegisterNum

    /**
     * Constant uint32_t. A bitset that indicates which button is analog.
     */
    buttonsAnalog: JDRegisterNum

    /**
     * Constant uint8_t. Number of analog input supported
     */
    axisCount: JDRegisterNum

    /**
     * Sets the up/down button state, one byte per button, supports analog buttons. For digital buttons, use `0` for released, `1` for pressed.
     */
    setButtons(...pressure: number[]): void

    /**
     * Sets the state of analog inputs.
     */
    setAxis(...position: number[]): void
}
declare namespace roles {
    /**
     * Declares a new HID Joystick service role.
     **/
    function hidJoystick(): HidJoystickRole
}

// Service: HID Keyboard
declare enum HidKeyboardSelector { // uint16_t
    None = 0x0,
    ErrorRollOver = 0x1,
    PostFail = 0x2,
    ErrorUndefined = 0x3,
    A = 0x4,
    B = 0x5,
    C = 0x6,
    D = 0x7,
    E = 0x8,
    F = 0x9,
    G = 0xa,
    H = 0xb,
    I = 0xc,
    J = 0xd,
    K = 0xe,
    L = 0xf,
    M = 0x10,
    N = 0x11,
    O = 0x12,
    P = 0x13,
    Q = 0x14,
    R = 0x15,
    S = 0x16,
    T = 0x17,
    U = 0x18,
    V = 0x19,
    W = 0x1a,
    X = 0x1b,
    Y = 0x1c,
    Z = 0x1d,
    _1 = 0x1e,
    _2 = 0x1f,
    _3 = 0x20,
    _4 = 0x21,
    _5 = 0x22,
    _6 = 0x23,
    _7 = 0x24,
    _8 = 0x25,
    _9 = 0x26,
    _0 = 0x27,
    Return = 0x28,
    Escape = 0x29,
    Backspace = 0x2a,
    Tab = 0x2b,
    Spacebar = 0x2c,
    Minus = 0x2d,
    Equals = 0x2e,
    LeftSquareBracket = 0x2f,
    RightSquareBracket = 0x30,
    Backslash = 0x31,
    NonUsHash = 0x32,
    Semicolon = 0x33,
    Quote = 0x34,
    GraveAccent = 0x35,
    Comma = 0x36,
    Period = 0x37,
    Slash = 0x38,
    CapsLock = 0x39,
    F1 = 0x3a,
    F2 = 0x3b,
    F3 = 0x3c,
    F4 = 0x3d,
    F5 = 0x3e,
    F6 = 0x3f,
    F7 = 0x40,
    F8 = 0x41,
    F9 = 0x42,
    F10 = 0x43,
    F11 = 0x44,
    F12 = 0x45,
    PrintScreen = 0x46,
    ScrollLock = 0x47,
    Pause = 0x48,
    Insert = 0x49,
    Home = 0x4a,
    PageUp = 0x4b,
    Delete = 0x4c,
    End = 0x4d,
    PageDown = 0x4e,
    RightArrow = 0x4f,
    LeftArrow = 0x50,
    DownArrow = 0x51,
    UpArrow = 0x52,
    KeypadNumLock = 0x53,
    KeypadDivide = 0x54,
    KeypadMultiply = 0x55,
    KeypadAdd = 0x56,
    KeypadSubtrace = 0x57,
    KeypadReturn = 0x58,
    Keypad1 = 0x59,
    Keypad2 = 0x5a,
    Keypad3 = 0x5b,
    Keypad4 = 0x5c,
    Keypad5 = 0x5d,
    Keypad6 = 0x5e,
    Keypad7 = 0x5f,
    Keypad8 = 0x60,
    Keypad9 = 0x61,
    Keypad0 = 0x62,
    KeypadDecimalPoint = 0x63,
    NonUsBackslash = 0x64,
    Application = 0x65,
    Power = 0x66,
    KeypadEquals = 0x67,
    F13 = 0x68,
    F14 = 0x69,
    F15 = 0x6a,
    F16 = 0x6b,
    F17 = 0x6c,
    F18 = 0x6d,
    F19 = 0x6e,
    F20 = 0x6f,
    F21 = 0x70,
    F22 = 0x71,
    F23 = 0x72,
    F24 = 0x73,
    Execute = 0x74,
    Help = 0x75,
    Menu = 0x76,
    Select = 0x77,
    Stop = 0x78,
    Again = 0x79,
    Undo = 0x7a,
    Cut = 0x7b,
    Copy = 0x7c,
    Paste = 0x7d,
    Find = 0x7e,
    Mute = 0x7f,
    VolumeUp = 0x80,
    VolumeDown = 0x81,
}

declare enum HidKeyboardModifiers { // uint8_t
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

declare enum HidKeyboardAction { // uint8_t
    Press = 0x0,
    Up = 0x1,
    Down = 0x2,
}

declare class HidKeyboardRole extends Role {
    /**
     * Presses a key or a sequence of keys down.
     */
    key(
        selector: HidKeyboardSelector,
        modifiers: HidKeyboardModifiers,
        action: HidKeyboardAction
    ): void

    /**
     * No args. Clears all pressed keys.
     */
    clear(): void
}
declare namespace roles {
    /**
     * Declares a new HID Keyboard service role.
     **/
    function hidKeyboard(): HidKeyboardRole
}

// Service: HID Mouse
declare enum HidMouseButton { // uint16_t
    Left = 0x1,
    Right = 0x2,
    Middle = 0x4,
}

declare enum HidMouseButtonEvent { // uint8_t
    Up = 0x1,
    Down = 0x2,
    Click = 0x3,
    DoubleClick = 0x4,
}

declare class HidMouseRole extends Role {
    /**
     * Sets the up/down state of one or more buttons.
     * A `Click` is the same as `Down` followed by `Up` after 100ms.
     * A `DoubleClick` is two clicks with `150ms` gap between them (that is, `100ms` first click, `150ms` gap, `100ms` second click).
     */
    setButton(buttons: HidMouseButton, ev: HidMouseButtonEvent): void

    /**
     * Moves the mouse by the distance specified.
     * If the time is positive, it specifies how long to make the move.
     */
    move(dx: number, dy: number, time: number): void

    /**
     * Turns the wheel up or down. Positive if scrolling up.
     * If the time is positive, it specifies how long to make the move.
     */
    wheel(dy: number, time: number): void
}
declare namespace roles {
    /**
     * Declares a new HID Mouse service role.
     **/
    function hidMouse(): HidMouseRole
}

// Service: Humidity
declare class HumidityRole extends SensorRole {
    /**
     * Read-only %RH u22.10 (uint32_t). The relative humidity in percentage of full water saturation.
     */
    humidity: JDRegisterNum

    /**
     * Read-only %RH u22.10 (uint32_t). The real humidity is between `humidity - humidity_error` and `humidity + humidity_error`.
     */
    humidityError: JDRegisterNum

    /**
     * Constant %RH u22.10 (uint32_t). Lowest humidity that can be reported.
     */
    minHumidity: JDRegisterNum

    /**
     * Constant %RH u22.10 (uint32_t). Highest humidity that can be reported.
     */
    maxHumidity: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Humidity service role.
     **/
    function humidity(): HumidityRole
}

// Service: Illuminance
declare class IlluminanceRole extends SensorRole {
    /**
     * Read-only lux u22.10 (uint32_t). The amount of illuminance, as lumens per square metre.
     */
    illuminance: JDRegisterNum

    /**
     * Read-only lux u22.10 (uint32_t). Error on the reported sensor value.
     */
    illuminanceError: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Illuminance service role.
     **/
    function illuminance(): IlluminanceRole
}

// Service: Indexed screen
declare class IndexedScreenRole extends Role {
    /**
     * Sets the update window for subsequent `set_pixels` commands.
     */
    startUpdate(x: number, y: number, width: number, height: number): void

    /**
     * Argument: pixels bytes. Set pixels in current window, according to current palette.
     * Each "line" of data is aligned to a byte.
     */
    setPixels(pixels: number): void

    /**
     * Read-write ratio u0.8 (uint8_t). Set backlight brightness.
     * If set to `0` the display may go to sleep.
     */
    brightness: JDRegisterNum

    /**
     * The current palette.
     * The color entry repeats `1 << bits_per_pixel` times.
     * This register may be write-only.
     */
    palette: JDRegisterArray & {
        blue: number
        green: number
        red: number
        padding: number
    }

    /**
     * Constant bit uint8_t. Determines the number of palette entries.
     * Typical values are 1, 2, 4, or 8.
     */
    bitsPerPixel: JDRegisterNum

    /**
     * Constant px uint16_t. Screen width in "natural" orientation.
     */
    width: JDRegisterNum

    /**
     * Constant px uint16_t. Screen height in "natural" orientation.
     */
    height: JDRegisterNum

    /**
     * Read-write bool (uint8_t). If true, consecutive pixels in the "width" direction are sent next to each other (this is typical for graphics cards).
     * If false, consecutive pixels in the "height" direction are sent next to each other.
     * For embedded screen controllers, this is typically true iff `width < height`
     * (in other words, it's only true for portrait orientation screens).
     * Some controllers may allow the user to change this (though the refresh order may not be optimal then).
     * This is independent of the `rotation` register.
     */
    widthMajor: JDRegisterNum

    /**
     * Read-write px uint8_t. Every pixel sent over wire is represented by `up_sampling x up_sampling` square of physical pixels.
     * Some displays may allow changing this (which will also result in changes to `width` and `height`).
     * Typical values are 1 and 2.
     */
    upSampling: JDRegisterNum

    /**
     * Read-write ° uint16_t. Possible values are 0, 90, 180 and 270 only.
     * Write to this register do not affect `width` and `height` registers,
     * and may be ignored by some screens.
     */
    rotation: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Indexed screen service role.
     **/
    function indexedScreen(): IndexedScreenRole
}

// Service: Infrastructure
declare class InfrastructureRole extends Role {}
declare namespace roles {
    /**
     * Declares a new Infrastructure service role.
     **/
    function infrastructure(): InfrastructureRole
}

// Service: LED
declare enum LedVariant { // uint8_t
    Strip = 0x1,
    Ring = 0x2,
    Stick = 0x3,
    Jewel = 0x4,
    Matrix = 0x5,
}

declare class LedRole extends Role {
    /**
     * Read-write bytes. A buffer of 24bit RGB color entries for each LED, in R, G, B order.
     * When writing, if the buffer is too short, the remaining pixels are set to `#000000`;
     * if the buffer is too long, the write may be ignored, or the additional pixels may be ignored.
     */
    pixels: JDRegisterNum

    /**
     * Read-write ratio u0.8 (uint8_t). Set the luminosity of the strip.
     * At `0` the power to the strip is completely shut down.
     */
    brightness: JDRegisterNum

    /**
     * Read-only ratio u0.8 (uint8_t). This is the luminosity actually applied to the strip.
     * May be lower than `brightness` if power-limited by the `max_power` register.
     * It will rise slowly (few seconds) back to `brightness` is limits are no longer required.
     */
    actualBrightness: JDRegisterNum

    /**
     * Constant # uint16_t. Specifies the number of pixels in the strip.
     */
    numPixels: JDRegisterNum

    /**
     * Constant # uint16_t. If the LED pixel strip is a matrix, specifies the number of columns.
     */
    numColumns: JDRegisterNum

    /**
     * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
     */
    maxPower: JDRegisterNum

    /**
     * Constant # uint16_t. If known, specifies the number of LEDs in parallel on this device.
     * The actual number of LEDs is `num_pixels * leds_per_pixel`.
     */
    ledsPerPixel: JDRegisterNum

    /**
     * Constant nm uint16_t. If monochrome LED, specifies the wave length of the LED.
     * Register is missing for RGB LEDs.
     */
    waveLength: JDRegisterNum

    /**
     * Constant mcd uint16_t. The luminous intensity of all the LEDs, at full brightness, in micro candella.
     */
    luminousIntensity: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Specifies the shape of the light strip.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new LED service role.
     **/
    function led(): LedRole
}

// Service: LED Single
declare enum LedSingleVariant { // uint8_t
    ThroughHole = 0x1,
    SMD = 0x2,
    Power = 0x3,
    Bead = 0x4,
}

declare class LedSingleRole extends Role {
    /**
     * This has the same semantics as `set_status_light` in the control service.
     */
    animate(
        to_red: number,
        to_green: number,
        to_blue: number,
        speed: number
    ): void

    /**
     * The current color of the LED.
     */
    color: JDRegisterArray & { red: number; green: number; blue: number }

    /**
     * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
     */
    maxPower: JDRegisterNum

    /**
     * Constant uint16_t. If known, specifies the number of LEDs in parallel on this device.
     */
    ledCount: JDRegisterNum

    /**
     * Constant nm uint16_t. If monochrome LED, specifies the wave length of the LED.
     */
    waveLength: JDRegisterNum

    /**
     * Constant mcd uint16_t. The luminous intensity of the LED, at full value, in micro candella.
     */
    luminousIntensity: JDRegisterNum

    /**
     * Constant Variant (uint8_t). The physical type of LED.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new LED Single service role.
     **/
    function ledSingle(): LedSingleRole
}

// Service: LED Strip
declare enum LedStripLightType { // uint8_t
    WS2812B_GRB = 0x0,
    APA102 = 0x10,
    SK9822 = 0x11,
}

declare enum LedStripVariant { // uint8_t
    Strip = 0x1,
    Ring = 0x2,
    Stick = 0x3,
    Jewel = 0x4,
    Matrix = 0x5,
}

declare class LedStripRole extends Role {
    /**
     * Read-write ratio u0.8 (uint8_t). Set the luminosity of the strip.
     * At `0` the power to the strip is completely shut down.
     */
    brightness: JDRegisterNum

    /**
     * Read-only ratio u0.8 (uint8_t). This is the luminosity actually applied to the strip.
     * May be lower than `brightness` if power-limited by the `max_power` register.
     * It will rise slowly (few seconds) back to `brightness` is limits are no longer required.
     */
    actualBrightness: JDRegisterNum

    /**
     * Read-write LightType (uint8_t). Specifies the type of light strip connected to controller.
     * Controllers which are sold with lights should default to the correct type
     * and could not allow change.
     */
    lightType: JDRegisterNum

    /**
     * Read-write # uint16_t. Specifies the number of pixels in the strip.
     * Controllers which are sold with lights should default to the correct length
     * and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.
     */
    numPixels: JDRegisterNum

    /**
     * Read-write # uint16_t. If the LED pixel strip is a matrix, specifies the number of columns. Otherwise, a square shape is assumed. Controllers which are sold with lights should default to the correct length
     * and could not allow change. Increasing length at runtime leads to ineffective use of memory and may lead to controller reboot.
     */
    numColumns: JDRegisterNum

    /**
     * Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller).
     */
    maxPower: JDRegisterNum

    /**
     * Constant # uint16_t. The maximum supported number of pixels.
     * All writes to `num_pixels` are clamped to `max_pixels`.
     */
    maxPixels: JDRegisterNum

    /**
     * Read-write # uint16_t. How many times to repeat the program passed in `run` command.
     * Should be set before the `run` command.
     * Setting to `0` means to repeat forever.
     */
    numRepeats: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Specifies the shape of the light strip.
     */
    variant: JDRegisterNum

    /**
     * Argument: program bytes. Run the given light "program". See service description for details.
     */
    run(program: number): void
}
declare namespace roles {
    /**
     * Declares a new LED Strip service role.
     **/
    function ledStrip(): LedStripRole
}

// Service: Light bulb
declare class LightBulbRole extends Role {
    /**
     * Read-write ratio u0.16 (uint16_t). Indicates the brightness of the light bulb. Zero means completely off and 0xffff means completely on.
     * For non-dimmable lights, the value should be clamp to 0xffff for any non-zero value.
     */
    brightness: JDRegisterNum

    /**
     * Constant bool (uint8_t). Indicates if the light supports dimming.
     */
    dimmable: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Light bulb service role.
     **/
    function lightBulb(): LightBulbRole
}

// Service: Light level
declare enum LightLevelVariant { // uint8_t
    PhotoResistor = 0x1,
    ReverseBiasedLED = 0x2,
}

declare class LightLevelRole extends SensorRole {
    /**
     * Read-only ratio u0.16 (uint16_t). Detect light level
     */
    lightLevel: JDRegisterNum

    /**
     * Read-only ratio u0.16 (uint16_t). Absolute estimated error of the reading value
     */
    lightLevelError: JDRegisterNum

    /**
     * Constant Variant (uint8_t). The type of physical sensor.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Light level service role.
     **/
    function lightLevel(): LightLevelRole
}

// Service: Logger
declare enum LoggerPriority { // uint8_t
    Debug = 0x0,
    Log = 0x1,
    Warning = 0x2,
    Error = 0x3,
    Silent = 0x4,
}

declare class LoggerRole extends Role {
    /**
     * Read-write Priority (uint8_t). Messages with level lower than this won't be emitted. The default setting may vary.
     * Loggers should revert this to their default setting if the register has not been
     * updated in 3000ms, and also keep the lowest setting they have seen in the last 1500ms.
     * Thus, clients should write this register every 1000ms and ignore messages which are
     * too verbose for them.
     */
    minPriority: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Logger service role.
     **/
    function logger(): LoggerRole
}

// Service: Magnetic field level
declare enum MagneticFieldLevelVariant { // uint8_t
    AnalogNS = 0x1,
    AnalogN = 0x2,
    AnalogS = 0x3,
    DigitalNS = 0x4,
    DigitalN = 0x5,
    DigitalS = 0x6,
}

declare class MagneticFieldLevelRole extends SensorRole {
    /**
     * Read-only ratio i1.15 (int16_t). Indicates the strength of magnetic field between -1 and 1.
     * When no magnet is present the value should be around 0.
     * For analog sensors,
     * when the north pole of the magnet is on top of the module
     * and closer than south pole, then the value should be positive.
     * For digital sensors,
     * the value should either `0` or `1`, regardless of polarity.
     */
    strength: JDRegisterNum

    /**
     * Read-only bool (uint8_t). Determines if the magnetic field is present.
     * If the event `active` is observed, `detected` is true; if `inactive` is observed, `detected` is false.
     */
    detected: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Determines which magnetic poles the sensor can detected,
     * and whether or not it can measure their strength or just presence.
     */
    variant: JDRegisterNum

    /**
     * Emitted when strong-enough magnetic field is detected.
     */
    active: JDEvent

    /**
     * Emitted when strong-enough magnetic field is no longer detected.
     */
    inactive: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Magnetic field level service role.
     **/
    function magneticFieldLevel(): MagneticFieldLevelRole
}

// Service: Magnetometer
declare class MagnetometerRole extends SensorRole {
    /**
     * Indicates the current magnetic field on magnetometer.
     * For reference: `1 mgauss` is `100 nT` (and `1 gauss` is `100 000 nT`).
     */
    forces: JDRegisterArray & { x: number; y: number; z: number }

    /**
     * Read-only nT int32_t. Absolute estimated error on the readings.
     */
    forcesError: JDRegisterNum

    /**
     * No args. Forces a calibration sequence where the user/device
     * might have to rotate to be calibrated.
     */
    calibrate(): void
}
declare namespace roles {
    /**
     * Declares a new Magnetometer service role.
     **/
    function magnetometer(): MagnetometerRole
}

// Service: Matrix Keypad
declare enum MatrixKeypadVariant { // uint8_t
    Membrane = 0x1,
    Keyboard = 0x2,
    Elastomer = 0x3,
    ElastomerLEDPixel = 0x4,
}

declare class MatrixKeypadRole extends SensorRole {
    /**
     * Read-only. The coordinate of the button currently pressed. Keys are zero-indexed from left to right, top to bottom:
     * ``row = index / columns``, ``column = index % columns``.
     */
    pressed: JDRegisterArray

    /**
     * Constant # uint8_t. Number of rows in the matrix
     */
    rows: JDRegisterNum

    /**
     * Constant # uint8_t. Number of columns in the matrix
     */
    columns: JDRegisterNum

    /**
     * Constant. The characters printed on the keys if any, in indexing sequence.
     */
    labels: JDRegisterArray

    /**
     * Constant Variant (uint8_t). The type of physical keypad. If the variant is ``ElastomerLEDPixel``
     * and the next service on the device is a ``LEDPixel`` service, it is considered
     * as the service controlling the LED pixel on the keypad.
     */
    variant: JDRegisterNum

    /**
     * Argument: uint8_t. Emitted when a key, at the given index, goes from inactive (`pressed == 0`) to active.
     */
    down: JDEvent

    /**
     * Argument: uint8_t. Emitted when a key, at the given index, goes from active (`pressed == 1`) to inactive.
     */
    up: JDEvent

    /**
     * Argument: uint8_t. Emitted together with `up` when the press time was not longer than 500ms.
     */
    click: JDEvent

    /**
     * Argument: uint8_t. Emitted together with `up` when the press time was more than 500ms.
     */
    longClick: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Matrix Keypad service role.
     **/
    function matrixKeypad(): MatrixKeypadRole
}

// Service: Microphone
declare class MicrophoneRole extends Role {
    /**
     * The samples will be streamed back over the `samples` pipe.
     * If `num_samples` is `0`, streaming will only stop when the pipe is closed.
     * Otherwise the specified number of samples is streamed.
     * Samples are sent as `i16`.
     */
    sample(samples: number, num_samples: number): void

    /**
     * Read-write μs uint32_t. Get or set microphone sampling period.
     * Sampling rate is `1_000_000 / sampling_period Hz`.
     */
    samplingPeriod: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Microphone service role.
     **/
    function microphone(): MicrophoneRole
}

// Service: MIDI output
declare class MidiOutputRole extends Role {
    /**
     * Read-write bool (uint8_t). Opens or closes the port to the MIDI device
     */
    enabled: JDRegisterNum

    /**
     * No args. Clears any pending send data that has not yet been sent from the MIDIOutput's queue.
     */
    clear(): void

    /**
     * Argument: data bytes. Enqueues the message to be sent to the corresponding MIDI port
     */
    send(data: number): void
}
declare namespace roles {
    /**
     * Declares a new MIDI output service role.
     **/
    function midiOutput(): MidiOutputRole
}

// Service: Model Runner
declare enum ModelRunnerModelFormat { // uint32_t
    TFLite = 0x334c4654,
    ML4F = 0x30470f62,
    EdgeImpulseCompiled = 0x30564945,
}

declare class ModelRunnerRole extends Role {
    /**
     * Argument: model_size B uint32_t. Open pipe for streaming in the model. The size of the model has to be declared upfront.
     * The model is streamed over regular pipe data packets.
     * The format supported by this instance of the service is specified in `format` register.
     * When the pipe is closed, the model is written all into flash, and the device running the service may reset.
     */
    setModel(model_size: number): void

    /**
     * Argument: outputs pipe (bytes). Open channel that can be used to manually invoke the model. When enough data is sent over the `inputs` pipe, the model is invoked,
     * and results are send over the `outputs` pipe.
     */
    predict(outputs: number): void

    /**
     * Read-write uint16_t. When register contains `N > 0`, run the model automatically every time new `N` samples are collected.
     * Model may be run less often if it takes longer to run than `N * sampling_interval`.
     * The `outputs` register will stream its value after each run.
     * This register is not stored in flash.
     */
    autoInvokeEvery: JDRegisterNum

    /**
     * Read-only. Results of last model invocation as `float32` array.
     */
    outputs: JDRegisterArray

    /**
     * Read-only. The shape of the input tensor.
     */
    inputShape: JDRegisterArray

    /**
     * Read-only. The shape of the output tensor.
     */
    outputShape: JDRegisterArray

    /**
     * Read-only μs uint32_t. The time consumed in last model execution.
     */
    lastRunTime: JDRegisterNum

    /**
     * Read-only B uint32_t. Number of RAM bytes allocated for model execution.
     */
    allocatedArenaSize: JDRegisterNum

    /**
     * Read-only B uint32_t. The size of the model in bytes.
     */
    modelSize: JDRegisterNum

    /**
     * Read-only string (bytes). Textual description of last error when running or loading model (if any).
     */
    lastError: JDRegisterString

    /**
     * Constant ModelFormat (uint32_t). The type of ML models supported by this service.
     * `TFLite` is flatbuffer `.tflite` file.
     * `ML4F` is compiled machine code model for Cortex-M4F.
     * The format is typically present as first or second little endian word of model file.
     */
    format: JDRegisterNum

    /**
     * Constant uint32_t. A version number for the format.
     */
    formatVersion: JDRegisterNum

    /**
     * Constant bool (uint8_t). If present and true this service can run models independently of other
     * instances of this service on the device.
     */
    parallel: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Model Runner service role.
     **/
    function modelRunner(): ModelRunnerRole
}

// Service: Motion
declare enum MotionVariant { // uint8_t
    PIR = 0x1,
}

declare class MotionRole extends SensorRole {
    /**
     * Read-only bool (uint8_t). Reports is movement is currently detected by the sensor.
     */
    moving: JDRegisterNum

    /**
     * Constant m u16.16 (uint32_t). Maximum distance where objects can be detected.
     */
    maxDistance: JDRegisterNum

    /**
     * Constant ° uint16_t. Opening of the field of view
     */
    angle: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Type of physical sensor
     */
    variant: JDRegisterNum

    /**
     * A movement was detected.
     */
    movement: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Motion service role.
     **/
    function motion(): MotionRole
}

// Service: Motor
declare class MotorRole extends Role {
    /**
     * Read-write ratio i1.15 (int16_t). Relative speed of the motor. Use positive/negative values to run the motor forwards and backwards.
     * Positive is recommended to be clockwise rotation and negative counterclockwise. A speed of ``0``
     * while ``enabled`` acts as brake.
     */
    speed: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Turn the power to the motor on/off.
     */
    enabled: JDRegisterNum

    /**
     * Constant kg/cm u16.16 (uint32_t). Torque required to produce the rated power of an electrical motor at load speed.
     */
    loadTorque: JDRegisterNum

    /**
     * Constant rpm u16.16 (uint32_t). Revolutions per minute of the motor under full load.
     */
    loadRotationSpeed: JDRegisterNum

    /**
     * Constant bool (uint8_t). Indicates if the motor can run backwards.
     */
    reversible: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Motor service role.
     **/
    function motor(): MotorRole
}

// Service: Multitouch
declare class MultitouchRole extends SensorRole {
    /**
     * Read-only. Capacitance of channels. The capacitance is continuously calibrated, and a value of `0` indicates
     * no touch, wheres a value of around `100` or more indicates touch.
     * It's best to ignore this (unless debugging), and use events.
     */
    capacity: JDRegisterArray

    /**
     * Argument: channel uint8_t. Emitted when an input is touched.
     */
    touch: JDEvent

    /**
     * Argument: channel uint8_t. Emitted when an input is no longer touched.
     */
    release: JDEvent

    /**
     * Argument: channel uint8_t. Emitted when an input is briefly touched. TODO Not implemented.
     */
    tap: JDEvent

    /**
     * Argument: channel uint8_t. Emitted when an input is touched for longer than 500ms. TODO Not implemented.
     */
    longPress: JDEvent

    /**
     * Emitted when input channels are successively touched in order of increasing channel numbers.
     */
    swipePos: JDEvent

    /**
     * Emitted when input channels are successively touched in order of decreasing channel numbers.
     */
    swipeNeg: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Multitouch service role.
     **/
    function multitouch(): MultitouchRole
}

// Service: Planar position
declare enum PlanarPositionVariant { // uint8_t
    OpticalMousePosition = 0x1,
}

declare class PlanarPositionRole extends SensorRole {
    /**
     * The current position of the sensor.
     */
    position: JDRegisterArray & { x: number; y: number }

    /**
     * Constant Variant (uint8_t). Specifies the type of physical sensor.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Planar position service role.
     **/
    function planarPosition(): PlanarPositionRole
}

// Service: Potentiometer
declare enum PotentiometerVariant { // uint8_t
    Slider = 0x1,
    Rotary = 0x2,
}

declare class PotentiometerRole extends SensorRole {
    /**
     * Read-only ratio u0.16 (uint16_t). The relative position of the slider.
     */
    position: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Specifies the physical layout of the potentiometer.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Potentiometer service role.
     **/
    function potentiometer(): PotentiometerRole
}

// Service: Power
declare enum PowerPowerStatus { // uint8_t
    Disallowed = 0x0,
    Powering = 0x1,
    Overload = 0x2,
    Overprovision = 0x3,
}

declare class PowerRole extends Role {
    /**
     * Read-write bool (uint8_t). Can be used to completely disable the service.
     * When allowed, the service may still not be providing power, see
     * `power_status` for the actual current state.
     */
    allowed: JDRegisterNum

    /**
     * Read-write mA uint16_t. Limit the power provided by the service. The actual maximum limit will depend on hardware.
     * This field may be read-only in some implementations - you should read it back after setting.
     */
    maxPower: JDRegisterNum

    /**
     * Read-only PowerStatus (uint8_t). Indicates whether the power provider is currently providing power (`Powering` state), and if not, why not.
     * `Overprovision` means there was another power provider, and we stopped not to overprovision the bus.
     */
    powerStatus: JDRegisterNum

    /**
     * Read-only mA uint16_t. Present current draw from the bus.
     */
    currentDraw: JDRegisterNum

    /**
     * Read-only mV uint16_t. Voltage on input.
     */
    batteryVoltage: JDRegisterNum

    /**
     * Read-only ratio u0.16 (uint16_t). Fraction of charge in the battery.
     */
    batteryCharge: JDRegisterNum

    /**
     * Constant mWh uint32_t. Energy that can be delivered to the bus when battery is fully charged.
     * This excludes conversion overheads if any.
     */
    batteryCapacity: JDRegisterNum

    /**
     * Read-write ms uint16_t. Many USB power packs need current to be drawn from time to time to prevent shutdown.
     * This regulates how often and for how long such current is drawn.
     * Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.
     */
    keepOnPulseDuration: JDRegisterNum

    /**
     * Read-write ms uint16_t. Many USB power packs need current to be drawn from time to time to prevent shutdown.
     * This regulates how often and for how long such current is drawn.
     * Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.
     */
    keepOnPulsePeriod: JDRegisterNum

    /**
     * No args. Sent by the power service periodically, as broadcast.
     */
    shutdown(): void

    /**
     * Argument: power_status PowerStatus (uint8_t). Emitted whenever `power_status` changes.
     */
    powerStatusChanged: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Power service role.
     **/
    function power(): PowerRole
}

// Service: Power supply
declare class PowerSupplyRole extends Role {
    /**
     * Read-write bool (uint8_t). Turns the power supply on with `true`, off with `false`.
     */
    enabled: JDRegisterNum

    /**
     * Read-write V f64 (uint64_t). The current output voltage of the power supply. Values provided must be in the range `minimum_voltage` to `maximum_voltage`
     */
    outputVoltage: JDRegisterNum

    /**
     * Constant V f64 (uint64_t). The minimum output voltage of the power supply. For fixed power supplies, `minimum_voltage` should be equal to `maximum_voltage`.
     */
    minimumVoltage: JDRegisterNum

    /**
     * Constant V f64 (uint64_t). The maximum output voltage of the power supply. For fixed power supplies, `minimum_voltage` should be equal to `maximum_voltage`.
     */
    maximumVoltage: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Power supply service role.
     **/
    function powerSupply(): PowerSupplyRole
}

// Service: Pressure Button
declare class PressureButtonRole extends Role {
    /**
     * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``up`` events.
     */
    threshold: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Pressure Button service role.
     **/
    function pressureButton(): PressureButtonRole
}

// Service: Protocol Test
declare class ProtoTestRole extends Role {
    /**
     * Read-write bool (uint8_t). A read write bool register.
     */
    rwBool: JDRegisterNum

    /**
     * Read-only bool (uint8_t). A read only bool register. Mirrors rw_bool.
     */
    roBool: JDRegisterNum

    /**
     * Read-write uint32_t. A read write u32 register.
     */
    rwU32: JDRegisterNum

    /**
     * Read-only uint32_t. A read only u32 register.. Mirrors rw_u32.
     */
    roU32: JDRegisterNum

    /**
     * Read-write int32_t. A read write i32 register.
     */
    rwI32: JDRegisterNum

    /**
     * Read-only int32_t. A read only i32 register.. Mirrors rw_i32.
     */
    roI32: JDRegisterNum

    /**
     * Read-write string (bytes). A read write string register.
     */
    rwString: JDRegisterString

    /**
     * Read-only string (bytes). A read only string register. Mirrors rw_string.
     */
    roString: JDRegisterString

    /**
     * Read-write bytes. A read write string register.
     */
    rwBytes: JDRegisterNum

    /**
     * Read-only bytes. A read only string register. Mirrors ro_bytes.
     */
    roBytes: JDRegisterNum

    /**
     * A read write i8, u8, u16, i32 register.
     */
    rwI8U8U16I32: JDRegisterArray & {
        i8: number
        u8: number
        u16: number
        i32: number
    }

    /**
     * A read only i8, u8, u16, i32 register.. Mirrors rw_i8_u8_u16_i32.
     */
    roI8U8U16I32: JDRegisterArray & {
        i8: number
        u8: number
        u16: number
        i32: number
    }

    /**
     * A read write u8, string register.
     */
    rwU8String: JDRegisterArray & { u8: number; str: string }

    /**
     * A read only u8, string register.. Mirrors rw_u8_string.
     */
    roU8String: JDRegisterArray & { u8: number; str: string }

    /**
     * Argument: bo bool (uint8_t). An event raised when rw_bool is modified
     */
    eBool: JDEvent

    /**
     * Argument: u32 uint32_t. An event raised when rw_u32 is modified
     */
    eU32: JDEvent

    /**
     * Argument: i32 int32_t. An event raised when rw_i32 is modified
     */
    eI32: JDEvent

    /**
     * Argument: str string (bytes). An event raised when rw_string is modified
     */
    eString: JDEvent

    /**
     * Argument: bytes bytes. An event raised when rw_bytes is modified
     */
    eBytes: JDEvent

    /**
     * An event raised when rw_i8_u8_u16_i32 is modified
     */
    eI8U8U16I32: JDEvent

    /**
     * An event raised when rw_u8_string is modified
     */
    eU8String: JDEvent

    /**
     * Argument: bo bool (uint8_t). A command to set rw_bool.
     */
    cBool(bo: number): void

    /**
     * Argument: u32 uint32_t. A command to set rw_u32.
     */
    cU32(u32: number): void

    /**
     * Argument: i32 int32_t. A command to set rw_i32.
     */
    cI32(i32: number): void

    /**
     * Argument: str string (bytes). A command to set rw_string.
     */
    cString(str: string): void

    /**
     * Argument: bytes bytes. A command to set rw_string.
     */
    cBytes(bytes: number): void

    /**
     * A command to set rw_bytes.
     */
    cI8U8U16I32(i8: number, u8: number, u16: number, i32: number): void

    /**
     * A command to set rw_u8_string.
     */
    cU8String(u8: number, str: string): void

    /**
     * Argument: p_bytes pipe (bytes). A command to read the content of rw_bytes, byte per byte, as a pipe.
     */
    cReportPipe(p_bytes: number): void
}
declare namespace roles {
    /**
     * Declares a new Protocol Test service role.
     **/
    function protoTest(): ProtoTestRole
}

// Service: Proxy
declare class ProxyRole extends Role {}
declare namespace roles {
    /**
     * Declares a new Proxy service role.
     **/
    function proxy(): ProxyRole
}

// Service: Pulse Oximeter
declare class PulseOximeterRole extends SensorRole {
    /**
     * Read-only % u8.8 (uint16_t). The estimated oxygen level in blood.
     */
    oxygen: JDRegisterNum

    /**
     * Read-only % u8.8 (uint16_t). The estimated error on the reported sensor data.
     */
    oxygenError: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Pulse Oximeter service role.
     **/
    function pulseOximeter(): PulseOximeterRole
}

// Service: Rain gauge
declare class RainGaugeRole extends SensorRole {
    /**
     * Read-only mm u16.16 (uint32_t). Total precipitation recorded so far.
     */
    precipitation: JDRegisterNum

    /**
     * Constant mm u16.16 (uint32_t). Typically the amount of rain needed for tipping the bucket.
     */
    precipitationPrecision: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Rain gauge service role.
     **/
    function rainGauge(): RainGaugeRole
}

// Service: Real time clock
declare enum RealTimeClockVariant { // uint8_t
    Computer = 0x1,
    Crystal = 0x2,
    Cuckoo = 0x3,
}

declare class RealTimeClockRole extends SensorRole {
    /**
     * Current time in 24h representation.
     */
    localTime: JDRegisterArray & {
        year: number
        month: number
        day_of_month: number
        day_of_week: number
        hour: number
        min: number
        sec: number
    }

    /**
     * Read-only s u16.16 (uint32_t). Time drift since the last call to the `set_time` command.
     */
    drift: JDRegisterNum

    /**
     * Constant ppm u16.16 (uint32_t). Error on the clock, in parts per million of seconds.
     */
    precision: JDRegisterNum

    /**
     * Constant Variant (uint8_t). The type of physical clock used by the sensor.
     */
    variant: JDRegisterNum

    /**
     * Sets the current time and resets the error.
     */
    setTime(
        year: number,
        month: number,
        day_of_month: number,
        day_of_week: number,
        hour: number,
        min: number,
        sec: number
    ): void
}
declare namespace roles {
    /**
     * Declares a new Real time clock service role.
     **/
    function realTimeClock(): RealTimeClockRole
}

// Service: Reflected light
declare enum ReflectedLightVariant { // uint8_t
    InfraredDigital = 0x1,
    InfraredAnalog = 0x2,
}

declare class ReflectedLightRole extends SensorRole {
    /**
     * Read-only ratio u0.16 (uint16_t). Reports the reflected brightness. It may be a digital value or, for some sensor, analog value.
     */
    brightness: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Type of physical sensor used
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Reflected light service role.
     **/
    function reflectedLight(): ReflectedLightRole
}

// Service: Relay
declare enum RelayVariant { // uint8_t
    Electromechanical = 0x1,
    SolidState = 0x2,
    Reed = 0x3,
}

declare class RelayRole extends Role {
    /**
     * Read-write bool (uint8_t). Indicates whether the relay circuit is currently energized or not.
     */
    active: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Describes the type of relay used.
     */
    variant: JDRegisterNum

    /**
     * Constant mA uint32_t. Maximum switching current for a resistive load.
     */
    maxSwitchingCurrent: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Relay service role.
     **/
    function relay(): RelayRole
}

// Service: Random Number Generator
declare enum RngVariant { // uint8_t
    Quantum = 0x1,
    ADCNoise = 0x2,
    WebCrypto = 0x3,
}

declare class RngRole extends Role {
    /**
     * Read-only bytes. A register that returns a 64 bytes random buffer on every request.
     * This never blocks for a long time. If you need additional random bytes, keep querying the register.
     */
    random: JDRegisterNum

    /**
     * Constant Variant (uint8_t). The type of algorithm/technique used to generate the number.
     * `Quantum` refers to dedicated hardware device generating random noise due to quantum effects.
     * `ADCNoise` is the noise from quick readings of analog-digital converter, which reads temperature of the MCU or some floating pin.
     * `WebCrypto` refers is used in simulators, where the source of randomness comes from an advanced operating system.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Random Number Generator service role.
     **/
    function rng(): RngRole
}

// Service: Role Manager
declare class RoleManagerRole extends Role {
    /**
     * Read-write bool (uint8_t). Normally, if some roles are unfilled, and there are idle services that can fulfill them,
     * the brain device will assign roles (bind) automatically.
     * Such automatic assignment happens every second or so, and is trying to be smart about
     * co-locating roles that share "host" (part before first slash),
     * as well as reasonably stable assignments.
     * Once user start assigning roles manually using this service, auto-binding should be disabled to avoid confusion.
     */
    autoBind: JDRegisterNum

    /**
     * Read-only bool (uint8_t). Indicates if all required roles have been allocated to devices.
     */
    allRolesAllocated: JDRegisterNum

    /**
     * Set role. Can set to empty to remove role binding.
     */
    setRole(device_id: number, service_idx: number, role: string): void

    /**
     * No args. Remove all role bindings.
     */
    clearAllRoles(): void

    /**
     * Argument: roles pipe (bytes). List all roles and bindings required by the current program. `device_id` and `service_idx` are `0` if role is unbound.
     */
    listRoles(roles: number): void

    /**
     * Notifies that role bindings have changed.
     */
    change: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Role Manager service role.
     **/
    function roleManager(): RoleManagerRole
}

// Service: Rotary encoder
declare class RotaryEncoderRole extends SensorRole {
    /**
     * Read-only # int32_t. Upon device reset starts at `0` (regardless of the shaft position).
     * Increases by `1` for a clockwise "click", by `-1` for counter-clockwise.
     */
    position: JDRegisterNum

    /**
     * Constant # uint16_t. This specifies by how much `position` changes when the crank does 360 degree turn. Typically 12 or 24.
     */
    clicksPerTurn: JDRegisterNum

    /**
     * Constant bool (uint8_t). The encoder is combined with a clicker. If this is the case, the clicker button service
     * should follow this service in the service list of the device.
     */
    clicker: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Rotary encoder service role.
     **/
    function rotaryEncoder(): RotaryEncoderRole
}

// Service: Rover
declare class RoverRole extends SensorRole {
    /**
     * The current position and orientation of the robot.
     */
    kinematics: JDRegisterArray & {
        x: number
        y: number
        vx: number
        vy: number
        heading: number
    }
}
declare namespace roles {
    /**
     * Declares a new Rover service role.
     **/
    function rover(): RoverRole
}

// Service: Satellite Navigation System
declare class SatNavRole extends SensorRole {
    /**
     * Reported coordinates, geometric altitude and time of position. Altitude accuracy is 0 if not available.
     */
    position: JDRegisterArray & {
        timestamp: number
        latitude: number
        longitude: number
        accuracy: number
        altitude: number
        altitudeAccuracy: number
    }

    /**
     * Read-write bool (uint8_t). Enables or disables the GPS module
     */
    enabled: JDRegisterNum

    /**
     * The module is disabled or lost connection with satellites.
     */
    inactive: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Satellite Navigation System service role.
     **/
    function satNav(): SatNavRole
}

// Service: Sensor Aggregator
declare enum SensorAggregatorSampleType { // uint8_t
    U8 = 0x8,
    I8 = 0x88,
    U16 = 0x10,
    I16 = 0x90,
    U32 = 0x20,
    I32 = 0xa0,
}

declare class SensorAggregatorRole extends Role {
    /**
     * Set automatic input collection.
     * These settings are stored in flash.
     */
    inputs: JDRegisterArray & {
        sampling_interval: number
        samples_in_window: number
        reserved: number
        device_id: number
        service_class: number
        service_num: number
        sample_size: number
        sample_type: SensorAggregatorSampleType
        sample_shift: number
    }

    /**
     * Read-only uint32_t. Number of input samples collected so far.
     */
    numSamples: JDRegisterNum

    /**
     * Read-only B uint8_t. Size of a single sample.
     */
    sampleSize: JDRegisterNum

    /**
     * Read-write # uint32_t. When set to `N`, will stream `N` samples as `current_sample` reading.
     */
    streamingSamples: JDRegisterNum

    /**
     * Read-only bytes. Last collected sample.
     */
    currentSample: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Sensor Aggregator service role.
     **/
    function sensorAggregator(): SensorAggregatorRole
}

// Service: Servo
declare class ServoRole extends Role {
    /**
     * Read-write ° i16.16 (int32_t). Specifies the angle of the arm (request).
     */
    angle: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Turn the power to the servo on/off.
     */
    enabled: JDRegisterNum

    /**
     * Read-write ° i16.16 (int32_t). Correction applied to the angle to account for the servo arm drift.
     */
    offset: JDRegisterNum

    /**
     * Constant ° i16.16 (int32_t). Lowest angle that can be set, typiclly 0 °.
     */
    minAngle: JDRegisterNum

    /**
     * Read-write μs uint16_t. The length of pulse corresponding to lowest angle.
     */
    minPulse: JDRegisterNum

    /**
     * Constant ° i16.16 (int32_t). Highest angle that can be set, typically 180°.
     */
    maxAngle: JDRegisterNum

    /**
     * Read-write μs uint16_t. The length of pulse corresponding to highest angle.
     */
    maxPulse: JDRegisterNum

    /**
     * Constant kg/cm u16.16 (uint32_t). The servo motor will stop rotating when it is trying to move a ``stall_torque`` weight at a radial distance of ``1.0`` cm.
     */
    stallTorque: JDRegisterNum

    /**
     * Constant s/60° u16.16 (uint32_t). Time to move 60°.
     */
    responseSpeed: JDRegisterNum

    /**
     * Read-only ° i16.16 (int32_t). The current physical position of the arm, if the device has a way to sense the position.
     */
    actualAngle: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Servo service role.
     **/
    function servo(): ServoRole
}

// Service: Settings
declare class SettingsRole extends Role {
    /**
     * Argument: key string (bytes). Get the value of given setting. If no such entry exists, the value returned is empty.
     */
    get(key: string): void

    /**
     * Set the value of a given setting.
     */
    set(key: string, value: number): void

    /**
     * Argument: key string (bytes). Delete a given setting.
     */
    delete(key: string): void

    /**
     * Argument: results pipe (bytes). Return keys of all settings.
     */
    listKeys(results: number): void

    /**
     * Argument: results pipe (bytes). Return keys and values of all settings.
     */
    list(results: number): void

    /**
     * No args. Clears all keys.
     */
    clear(): void

    /**
     * Notifies that some setting have been modified.
     */
    change: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Settings service role.
     **/
    function settings(): SettingsRole
}

// Service: 7-segment display
declare class SevenSegmentDisplayRole extends Role {
    /**
     * Read-write bytes. Each byte encodes the display status of a digit using,
     * where lowest bit 0 encodes segment `A`, bit 1 encodes segments `B`, ..., bit 6 encodes segments `G`, and bit 7 encodes the decimal point (if present).
     * If incoming `digits` data is smaller than `digit_count`, the remaining digits will be cleared.
     * Thus, sending an empty `digits` payload clears the screen.
     */
    digits: JDRegisterNum

    /**
     * Read-write ratio u0.16 (uint16_t). Controls the brightness of the LEDs. `0` means off.
     */
    brightness: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Turn on or off the column LEDs (separating minutes from hours, etc.) in of the segment.
     * If the column LEDs is not supported, the value remains false.
     */
    doubleDots: JDRegisterNum

    /**
     * Constant uint8_t. The number of digits available on the display.
     */
    digitCount: JDRegisterNum

    /**
     * Constant bool (uint8_t). True if decimal points are available (on all digits).
     */
    decimalPoint: JDRegisterNum

    /**
     * Argument: value f64 (uint64_t). Shows the number on the screen using the decimal dot if available.
     */
    setNumber(value: number): void
}
declare namespace roles {
    /**
     * Declares a new 7-segment display service role.
     **/
    function sevenSegmentDisplay(): SevenSegmentDisplayRole
}

// Service: Soil moisture
declare enum SoilMoistureVariant { // uint8_t
    Resistive = 0x1,
    Capacitive = 0x2,
}

declare class SoilMoistureRole extends SensorRole {
    /**
     * Read-only ratio u0.16 (uint16_t). Indicates the wetness of the soil, from `dry` to `wet`.
     */
    moisture: JDRegisterNum

    /**
     * Read-only ratio u0.16 (uint16_t). The error on the moisture reading.
     */
    moistureError: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Describe the type of physical sensor.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Soil moisture service role.
     **/
    function soilMoisture(): SoilMoistureRole
}

// Service: Solenoid
declare enum SolenoidVariant { // uint8_t
    PushPull = 0x1,
    Valve = 0x2,
    Latch = 0x3,
}

declare class SolenoidRole extends Role {
    /**
     * Read-write bool (uint8_t). Indicates whether the solenoid is energized and pulled (on) or pushed (off).
     */
    pulled: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Describes the type of solenoid used.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Solenoid service role.
     **/
    function solenoid(): SolenoidRole
}

// Service: Sound level
declare class SoundLevelRole extends SensorRole {
    /**
     * Read-only ratio u0.16 (uint16_t). The sound level detected by the microphone
     */
    soundLevel: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Turn on or off the microphone.
     */
    enabled: JDRegisterNum

    /**
     * Read-write ratio u0.16 (uint16_t). Set level at which the `loud` event is generated.
     */
    loudThreshold: JDRegisterNum

    /**
     * Read-write ratio u0.16 (uint16_t). Set level at which the `quiet` event is generated.
     */
    quietThreshold: JDRegisterNum

    /**
     * Generated when a loud sound is detected.
     */
    loud: JDEvent

    /**
     * Generated low level of sound is detected.
     */
    quiet: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Sound level service role.
     **/
    function soundLevel(): SoundLevelRole
}

// Service: Sound player
declare class SoundPlayerRole extends Role {
    /**
     * Read-write ratio u0.16 (uint16_t). Global volume of the output. ``0`` means completely off. This volume is mixed with each play volumes.
     */
    volume: JDRegisterNum

    /**
     * Argument: name string (bytes). Starts playing a sound.
     */
    play(name: string): void

    /**
     * No args. Cancel any sound playing.
     */
    cancel(): void

    /**
     * Argument: sounds_port pipe (bytes). Returns the list of sounds available to play.
     */
    listSounds(sounds_port: number): void
}
declare namespace roles {
    /**
     * Declares a new Sound player service role.
     **/
    function soundPlayer(): SoundPlayerRole
}

// Service: Sound Recorder with Playback
declare enum SoundRecorderWithPlaybackStatus { // uint8_t
    Idle = 0x0,
    Recording = 0x1,
    Playing = 0x2,
}

declare class SoundRecorderWithPlaybackRole extends Role {
    /**
     * No args. Replay recorded audio.
     */
    play(): void

    /**
     * Argument: duration ms uint16_t. Record audio for N milliseconds.
     */
    record(duration: number): void

    /**
     * No args. Cancel record, the `time` register will be updated by already cached data.
     */
    cancel(): void

    /**
     * Read-only Status (uint8_t). Indicate the current status
     */
    status: JDRegisterNum

    /**
     * Read-only ms uint16_t. Milliseconds of audio recorded.
     */
    time: JDRegisterNum

    /**
     * Read-write ratio u0.8 (uint8_t). Playback volume control
     */
    volume: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Sound Recorder with Playback service role.
     **/
    function soundRecorderWithPlayback(): SoundRecorderWithPlaybackRole
}

// Service: Sound Spectrum
declare class SoundSpectrumRole extends SensorRole {
    /**
     * Read-only bytes. The computed frequency data.
     */
    frequencyBins: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Turns on/off the micropohone.
     */
    enabled: JDRegisterNum

    /**
     * Read-write uint8_t. The power of 2 used as the size of the FFT to be used to determine the frequency domain.
     */
    fftPow2Size: JDRegisterNum

    /**
     * Read-write dB int16_t. The minimum power value in the scaling range for the FFT analysis data
     */
    minDecibels: JDRegisterNum

    /**
     * Read-write dB int16_t. The maximum power value in the scaling range for the FFT analysis data
     */
    maxDecibels: JDRegisterNum

    /**
     * Read-write ratio u0.8 (uint8_t). The averaging constant with the last analysis frame.
     * If `0` is set, there is no averaging done, whereas a value of `1` means "overlap the previous and current buffer quite a lot while computing the value".
     */
    smoothingTimeConstant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Sound Spectrum service role.
     **/
    function soundSpectrum(): SoundSpectrumRole
}

// Service: Speech synthesis
declare class SpeechSynthesisRole extends Role {
    /**
     * Read-write bool (uint8_t). Determines if the speech engine is in a non-paused state.
     */
    enabled: JDRegisterNum

    /**
     * Read-write string (bytes). Language used for utterances as defined in https://www.ietf.org/rfc/bcp/bcp47.txt.
     */
    lang: JDRegisterString

    /**
     * Read-write ratio u0.8 (uint8_t). Volume for utterances.
     */
    volume: JDRegisterNum

    /**
     * Read-write u16.16 (uint32_t). Pitch for utterances
     */
    pitch: JDRegisterNum

    /**
     * Read-write u16.16 (uint32_t). Rate for utterances
     */
    rate: JDRegisterNum

    /**
     * Argument: text string (bytes). Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
     */
    speak(text: string): void

    /**
     * No args. Cancels current utterance and all utterances from the utterance queue.
     */
    cancel(): void
}
declare namespace roles {
    /**
     * Declares a new Speech synthesis service role.
     **/
    function speechSynthesis(): SpeechSynthesisRole
}

// Service: Switch
declare enum SwitchVariant { // uint8_t
    Slide = 0x1,
    Tilt = 0x2,
    PushButton = 0x3,
    Tactile = 0x4,
    Toggle = 0x5,
    Proximity = 0x6,
    Magnetic = 0x7,
    FootButton = 0x8,
}

declare class SwitchRole extends SensorRole {
    /**
     * Read-only bool (uint8_t). Indicates whether the switch is currently active (on).
     */
    active: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Describes the type of switch used.
     */
    variant: JDRegisterNum

    /**
     * Emitted when switch goes from `off` to `on`.
     */
    on: JDEvent

    /**
     * Emitted when switch goes from `on` to `off`.
     */
    off: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Switch service role.
     **/
    function switch_(): SwitchRole
}

// Service: TCP
declare enum TcpTcpError { // int32_t
    InvalidCommand = 0x1,
    InvalidCommandPayload = 0x2,
}

declare class TcpRole extends Role {
    /**
     * Argument: inbound pipe (bytes). Open pair of pipes between network peripheral and a controlling device. In/outbound refers to direction from/to internet.
     */
    open(inbound: number): void
}
declare namespace roles {
    /**
     * Declares a new TCP service role.
     **/
    function tcp(): TcpRole
}

// Service: Temperature
declare enum TemperatureVariant { // uint8_t
    Outdoor = 0x1,
    Indoor = 0x2,
    Body = 0x3,
}

declare class TemperatureRole extends SensorRole {
    /**
     * Read-only °C i22.10 (int32_t). The temperature.
     */
    temperature: JDRegisterNum

    /**
     * Constant °C i22.10 (int32_t). Lowest temperature that can be reported.
     */
    minTemperature: JDRegisterNum

    /**
     * Constant °C i22.10 (int32_t). Highest temperature that can be reported.
     */
    maxTemperature: JDRegisterNum

    /**
     * Read-only °C u22.10 (uint32_t). The real temperature is between `temperature - temperature_error` and `temperature + temperature_error`.
     */
    temperatureError: JDRegisterNum

    /**
     * Constant Variant (uint8_t). Specifies the type of thermometer.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Temperature service role.
     **/
    function temperature(): TemperatureRole
}

// Service: Timeseries Aggregator
declare class TimeseriesAggregatorRole extends Role {
    /**
     * No args. Remove all pending timeseries.
     */
    clear(): void

    /**
     * Add a data point to a timeseries.
     */
    update(value: number, label: string): void

    /**
     * Set aggregation window.
     * Setting to `0` will restore default.
     */
    setWindow(duration: number, label: string): void

    /**
     * Set whether or not the timeseries will be uploaded to the cloud.
     * The `stored` reports are generated regardless.
     */
    setUpload(upload: number, label: string): void

    /**
     * Read-only μs uint32_t. This can queried to establish local time on the device.
     */
    now: JDRegisterNum

    /**
     * Read-write bool (uint8_t). When `true`, the windows will be shorter after service reset and gradually extend to requested length.
     * This is ensure valid data is being streamed in program development.
     */
    fastStart: JDRegisterNum

    /**
     * Read-write ms uint32_t. Window for timeseries for which `set_window` was never called.
     * Note that windows returned initially may be shorter if `fast_start` is enabled.
     */
    defaultWindow: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Whether labelled timeseries for which `set_upload` was never called should be automatically uploaded.
     */
    defaultUpload: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Whether automatically created timeseries not bound in role manager should be uploaded.
     */
    uploadUnlabelled: JDRegisterNum

    /**
     * Read-write ms uint32_t. If no data is received from any sensor within given period, the device is rebooted.
     * Set to `0` to disable (default).
     * Updating user-provided timeseries does not reset the watchdog.
     */
    sensorWatchdogPeriod: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Timeseries Aggregator service role.
     **/
    function timeseriesAggregator(): TimeseriesAggregatorRole
}

// Service: Traffic Light
declare class TrafficLightRole extends Role {
    /**
     * Read-write bool (uint8_t). The on/off state of the red light.
     */
    red: JDRegisterNum

    /**
     * Read-write bool (uint8_t). The on/off state of the yellow light.
     */
    yellow: JDRegisterNum

    /**
     * Read-write bool (uint8_t). The on/off state of the green light.
     */
    green: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Traffic Light service role.
     **/
    function trafficLight(): TrafficLightRole
}

// Service: Total Volatile organic compound
declare class TvocRole extends SensorRole {
    /**
     * Read-only ppb u22.10 (uint32_t). Total volatile organic compound readings in parts per billion.
     */
    tVOC: JDRegisterNum

    /**
     * Read-only ppb u22.10 (uint32_t). Error on the reading data
     */
    tVOCError: JDRegisterNum

    /**
     * Constant ppb u22.10 (uint32_t). Minimum measurable value
     */
    minTVOC: JDRegisterNum

    /**
     * Constant ppb u22.10 (uint32_t). Minimum measurable value.
     */
    maxTVOC: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Total Volatile organic compound service role.
     **/
    function tvoc(): TvocRole
}

// Service: Unique Brain
declare class UniqueBrainRole extends Role {}
declare namespace roles {
    /**
     * Declares a new Unique Brain service role.
     **/
    function uniqueBrain(): UniqueBrainRole
}

// Service: USB Bridge
declare enum UsbBridgeQByte { // uint8_t
    Magic = 0xfe,
    LiteralMagic = 0xf8,
    Reserved = 0xf9,
    SerialGap = 0xfa,
    FrameGap = 0xfb,
    FrameStart = 0xfc,
    FrameEnd = 0xfd,
}

declare class UsbBridgeRole extends Role {
    /**
     * No args. Disables forwarding of Jacdac packets.
     */
    disablePackets(): void

    /**
     * No args. Enables forwarding of Jacdac packets.
     */
    enablePackets(): void

    /**
     * No args. Disables forwarding of serial log messages.
     */
    disableLog(): void

    /**
     * No args. Enables forwarding of serial log messages.
     */
    enableLog(): void
}
declare namespace roles {
    /**
     * Declares a new USB Bridge service role.
     **/
    function usbBridge(): UsbBridgeRole
}

// Service: UV index
declare enum UvIndexVariant { // uint8_t
    UVA_UVB = 0x1,
    Visible_IR = 0x2,
}

declare class UvIndexRole extends SensorRole {
    /**
     * Read-only uv u16.16 (uint32_t). Ultraviolet index, typically refreshed every second.
     */
    uvIndex: JDRegisterNum

    /**
     * Read-only uv u16.16 (uint32_t). Error on the UV measure.
     */
    uvIndexError: JDRegisterNum

    /**
     * Constant Variant (uint8_t). The type of physical sensor and capabilities.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new UV index service role.
     **/
    function uvIndex(): UvIndexRole
}

// Service: Verified Telemetry
declare enum VerifiedTelemetryStatus { // uint8_t
    Unknown = 0x0,
    Working = 0x1,
    Faulty = 0x2,
}

declare enum VerifiedTelemetryFingerprintType { // uint8_t
    FallCurve = 0x1,
    CurrentSense = 0x2,
    Custom = 0x3,
}

declare class VerifiedTelemetryRole extends Role {
    /**
     * Read-only Status (uint8_t). Reads the telemetry working status, where ``true`` is working and ``false`` is faulty.
     */
    telemetryStatus: JDRegisterNum

    /**
     * Read-write ms uint32_t. Specifies the interval between computing the fingerprint information.
     */
    telemetryStatusInterval: JDRegisterNum

    /**
     * Constant FingerprintType (uint8_t). Type of the fingerprint.
     */
    fingerprintType: JDRegisterNum

    /**
     * Template Fingerprint information of a working sensor.
     */
    fingerprintTemplate: JDRegisterArray & {
        confidence: number
        template: number
    }

    /**
     * No args. This command will clear the template fingerprint of a sensor and collect a new template fingerprint of the attached sensor.
     */
    resetFingerprintTemplate(): void

    /**
     * No args. This command will append a new template fingerprint to the `fingerprintTemplate`. Appending more fingerprints will increase the accuracy in detecting the telemetry status.
     */
    retrainFingerprintTemplate(): void

    /**
     * Argument: telemetry_status Status (uint8_t). The telemetry status of the device was updated.
     */
    telemetryStatusChange: JDEvent

    /**
     * The fingerprint template was updated
     */
    fingerprintTemplateChange: JDEvent
}
declare namespace roles {
    /**
     * Declares a new Verified Telemetry service role.
     **/
    function verifiedTelemetry(): VerifiedTelemetryRole
}

// Service: Vibration motor
declare class VibrationMotorRole extends Role {
    /**
     * Starts a sequence of vibration and pauses. To stop any existing vibration, send an empty payload.
     */
    vibrate(duration: number, intensity: number): void

    /**
     * Constant uint8_t. The maximum number of vibration sequences supported in a single packet.
     */
    maxVibrations: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Vibration motor service role.
     **/
    function vibrationMotor(): VibrationMotorRole
}

// Service: Water level
declare enum WaterLevelVariant { // uint8_t
    Resistive = 0x1,
    ContactPhotoElectric = 0x2,
    NonContactPhotoElectric = 0x3,
}

declare class WaterLevelRole extends SensorRole {
    /**
     * Read-only ratio u0.16 (uint16_t). The reported water level.
     */
    level: JDRegisterNum

    /**
     * Read-only ratio u0.16 (uint16_t). The error rage on the current reading
     */
    levelError: JDRegisterNum

    /**
     * Constant Variant (uint8_t). The type of physical sensor.
     */
    variant: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Water level service role.
     **/
    function waterLevel(): WaterLevelRole
}

// Service: Weight Scale
declare enum WeightScaleVariant { // uint8_t
    Body = 0x1,
    Food = 0x2,
    Jewelry = 0x3,
}

declare class WeightScaleRole extends SensorRole {
    /**
     * Read-only kg u16.16 (uint32_t). The reported weight.
     */
    weight: JDRegisterNum

    /**
     * Read-only kg u16.16 (uint32_t). The estimate error on the reported reading.
     */
    weightError: JDRegisterNum

    /**
     * Read-write kg u16.16 (uint32_t). Calibrated zero offset error on the scale, i.e. the measured weight when nothing is on the scale.
     * You do not need to subtract that from the reading, it has already been done.
     */
    zeroOffset: JDRegisterNum

    /**
     * Read-write u16.16 (uint32_t). Calibrated gain on the weight scale error.
     */
    gain: JDRegisterNum

    /**
     * Constant kg u16.16 (uint32_t). Maximum supported weight on the scale.
     */
    maxWeight: JDRegisterNum

    /**
     * Constant kg u16.16 (uint32_t). Minimum recommend weight on the scale.
     */
    minWeight: JDRegisterNum

    /**
     * Constant kg u16.16 (uint32_t). Smallest, yet distinguishable change in reading.
     */
    weightResolution: JDRegisterNum

    /**
     * Constant Variant (uint8_t). The type of physical scale
     */
    variant: JDRegisterNum

    /**
     * No args. Call this command when there is nothing on the scale. If supported, the module should save the calibration data.
     */
    calibrateZeroOffset(): void

    /**
     * Argument: weight g u22.10 (uint32_t). Call this command with the weight of the thing on the scale.
     */
    calibrateGain(weight: number): void
}
declare namespace roles {
    /**
     * Declares a new Weight Scale service role.
     **/
    function weightScale(): WeightScaleRole
}

// Service: WIFI
declare enum WifiAPFlags { // uint32_t
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

declare class WifiRole extends Role {
    /**
     * Argument: results pipe (bytes). Return list of WiFi network from the last scan.
     * Scans are performed periodically while not connected (in particular, on startup and after current connection drops),
     * as well as upon `reconnect` and `scan` commands.
     */
    lastScanResults(results: number): void

    /**
     * Automatically connect to named network if available. Also set password if network is not open.
     */
    addNetwork(ssid: string, password: string): void

    /**
     * No args. Enable the WiFi (if disabled), initiate a scan, wait for results, disconnect from current WiFi network if any,
     * and then reconnect (using regular algorithm, see `set_network_priority`).
     */
    reconnect(): void

    /**
     * Argument: ssid string (bytes). Prevent from automatically connecting to named network in future.
     * Forgetting a network resets its priority to `0`.
     */
    forgetNetwork(ssid: string): void

    /**
     * No args. Clear the list of known networks.
     */
    forgetAllNetworks(): void

    /**
     * Set connection priority for a network.
     * By default, all known networks have priority of `0`.
     */
    setNetworkPriority(priority: number, ssid: string): void

    /**
     * No args. Initiate search for WiFi networks. Generates `scan_complete` event.
     */
    scan(): void

    /**
     * Argument: results pipe (bytes). Return list of known WiFi networks.
     * `flags` is currently always 0.
     */
    listKnownNetworks(results: number): void

    /**
     * Read-only dB int8_t. Current signal strength. Returns -128 when not connected.
     */
    rssi: JDRegisterNum

    /**
     * Read-write bool (uint8_t). Determines whether the WiFi radio is enabled. It starts enabled upon reset.
     */
    enabled: JDRegisterNum

    /**
     * Read-only bytes. 0, 4 or 16 byte buffer with the IPv4 or IPv6 address assigned to device if any.
     */
    ipAddress: JDRegisterNum

    /**
     * Constant bytes. The 6-byte MAC address of the device. If a device does MAC address randomization it will have to "restart".
     */
    eui48: JDRegisterNum

    /**
     * Read-only string (bytes). SSID of the access-point to which device is currently connected.
     * Empty string if not connected.
     */
    ssid: JDRegisterString

    /**
     * Emitted upon successful join and IP address assignment.
     */
    gotIp: JDEvent

    /**
     * Emitted when disconnected from network.
     */
    lostIp: JDEvent

    /**
     * A WiFi network scan has completed. Results can be read with the `last_scan_results` command.
     * The event indicates how many networks where found, and how many are considered
     * as candidates for connection.
     */
    scanComplete: JDEvent

    /**
     * Emitted whenever the list of known networks is updated.
     */
    networksChanged: JDEvent

    /**
     * Argument: ssid string (bytes). Emitted when when a network was detected in scan, the device tried to connect to it
     * and failed.
     * This may be because of wrong password or other random failure.
     */
    connectionFailed: JDEvent
}
declare namespace roles {
    /**
     * Declares a new WIFI service role.
     **/
    function wifi(): WifiRole
}

// Service: Wind direction
declare class WindDirectionRole extends SensorRole {
    /**
     * Read-only ° uint16_t. The direction of the wind.
     */
    windDirection: JDRegisterNum

    /**
     * Read-only ° uint16_t. Error on the wind direction reading
     */
    windDirectionError: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Wind direction service role.
     **/
    function windDirection(): WindDirectionRole
}

// Service: Wind speed
declare class WindSpeedRole extends SensorRole {
    /**
     * Read-only m/s u16.16 (uint32_t). The velocity of the wind.
     */
    windSpeed: JDRegisterNum

    /**
     * Read-only m/s u16.16 (uint32_t). Error on the reading
     */
    windSpeedError: JDRegisterNum

    /**
     * Constant m/s u16.16 (uint32_t). Maximum speed that can be measured by the sensor.
     */
    maxWindSpeed: JDRegisterNum
}
declare namespace roles {
    /**
     * Declares a new Wind speed service role.
     **/
    function windSpeed(): WindSpeedRole
}
