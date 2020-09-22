// Service: Common registers and commands
export enum BaseCmd {
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
    
    /** Event from sensor or a broadcast service. */
    Event = 0x1,
    
    /** No args. Request to calibrate a sensor. The report indicates the calibration is done. */
    Calibrate = 0x2,
    
    /** No args. Request human-readable description of service. */
    Description = 0x3,
}

export enum BaseReg {
    /** Read-write uint32_t. This is either binary on/off (0 or non-zero), or can be gradual (eg. brightness of an RGB LED strip). */
    Intensity = 0x1,
    
    /** Read-write int32_t. The primary value of actuator (eg. servo pulse length, or motor duty cycle). */
    Value = 0x2,
    
    /** Read-write mA uint16_t. Limit the power drawn by the service, in mA. */
    MaxPower = 0x7,
    
    /**
     * Read-write uint8_t. Asks device to stream a given number of samples
     * (clients will typically write `255` to this register every second or so, while streaming is required).
     */
    StreamSamples = 0x3,
    
    /** Read-write ms uint32_t. Period between packets of data when streaming in milliseconds. */
    StreamingInterval = 0x4,
    
    /** Read-only int32_t. Read-only value of the sensor, also reported in streaming. */
    Reading = 0x101,
    
    /** Read-write int32_t. Thresholds for event generation for event generation for analog sensors. */
    LowThreshold = 0x5,
    
    /** Read-write int32_t. Thresholds for event generation for event generation for analog sensors. */
    HighThreshold = 0x6,
}

// Service: Sensor
export enum SensorReg {
    /**
     * Read-write uint8_t. Asks device to stream a given number of samples
     * (clients will typically write `255` to this register every second or so, while streaming is required).
     */
    StreamSamples = 0x3,
    
    /** Read-write ms uint32_t. Period between packets of data when streaming in milliseconds. */
    StreamingInterval = 0x4,
}

// Service: Accelerometer
export const SRV_ACCELEROMETER = 0x1f140409
export enum AccelReg {
    /** Indicates the current forces acting on accelerometer. */
    Forces = 0x101,
}

export enum AccelEvent {
    /** Emitted when accelerometer is tilted in the given direction. */
    TiltUp = 0x1,
    
    /** Emitted when accelerometer is tilted in the given direction. */
    TiltDown = 0x2,
    
    /** Emitted when accelerometer is tilted in the given direction. */
    TiltLeft = 0x3,
    
    /** Emitted when accelerometer is tilted in the given direction. */
    TiltRight = 0x4,
    
    /** Emitted when accelerometer is laying flat in the given direction. */
    FaceUp = 0x5,
    
    /** Emitted when accelerometer is laying flat in the given direction. */
    FaceDown = 0x6,
    
    /** Emitted when total force acting on accelerometer is much less than 1g. */
    Freefall = 0x7,
    
    /** Emitted when forces change violently a few times. */
    Shake = 0xb,
    
    /** Emitted when force in any direction exceeds given threshold. */
    Force_2g = 0xc,
    
    /** Emitted when force in any direction exceeds given threshold. */
    Force_3g = 0x8,
    
    /** Emitted when force in any direction exceeds given threshold. */
    Force_6g = 0x9,
    
    /** Emitted when force in any direction exceeds given threshold. */
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

export enum SensorAggregatorReg {
    /**
     * Set automatic input collection.
     * These settings are stored in flash.
     */
    Inputs = 0x80,
    
    /** Read-only uint32_t. Number of input samples collected so far. */
    NumSamples = 0x180,
    
    /** Read-only bytes uint8_t. Size of a single sample. */
    SampleSize = 0x181,
    
    /** Read-write uint32_t. When set to `N`, will stream `N` samples as `current_sample` reading. */
    StreamSamples = 0x81,
    
    /** Read-only bytes. Last collected sample. */
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

export enum BootloaderCmd {
    /**
     * No args. The `service_class` is always `0x1ffa9948`. The `device_class` identifies the kind of firmware
     * that "fits" this device.
     */
    Info = 0x0,
    
    /** Argument: session_id uint32_t. The flashing host should generate a random id, and use this command to set it. */
    SetSession = 0x81,
    
    /**
     * Use to send flashing data. A physical page is split into `chunk_max + 1` chunks, where `chunk_no = 0 ... chunk_max`.
     * Each chunk is stored at `page_address + page_offset`. `page_address` has to be equal in all chunks,
     * and is included in response.
     * Only the last chunk causes writing to flash and elicits response.
     */
    PageData = 0x80,
}

// Service: Button
export const SRV_BUTTON = 0x1473a263
export enum ButtonReg {
    /** Read-only bool (uint8_t). Indicates whether the button is currently active (pressed). */
    Pressed = 0x101,
}

export enum ButtonEvent {
    /** Emitted when button goes from inactive (`pressed == 0`) to active. */
    Down = 0x1,
    
    /** Emitted when button goes from active (`pressed == 1`) to inactive. */
    Up = 0x2,
    
    /** Emitted together with `up` when the press time was not longer than 500ms. */
    Click = 0x3,
    
    /** Emitted together with `up` when the press time was more than 500ms. */
    LongClick = 0x4,
}

// Service: Control
export const SRV_CONTROL = 0x0
export enum CtrlCmd {
    /** No args. Do nothing. Always ignored. Can be used to test ACKs. */
    Noop = 0x80,
    
    /** No args. Blink an LED or otherwise draw user's attention. */
    Identify = 0x81,
    
    /** No args. Reset device. ACK may or may not be sent. */
    Reset = 0x82,
}

export enum CtrlReg {
    /** Constant string (bytes). Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C) */
    DeviceDescription = 0x180,
    
    /** Constant uint32_t. A numeric code for the string above; used to identify firmware images. */
    DeviceClass = 0x181,
    
    /** Constant uint32_t. Typically the same as `device_class` unless device was flashed by hand; the bootloader will respond to that code. */
    BootloaderDeviceClass = 0x184,
    
    /** Constant string (bytes). A string describing firmware version; typically semver. */
    FirmwareVersion = 0x185,
    
    /** Read-only °C int16_t. MCU temperature in degrees Celsius (approximate). */
    Temperature = 0x182,
    
    /** Read-only μs uint64_t. Number of microseconds since boot. */
    Uptime = 0x186,
}

// Service: Rotary encoder
export const SRV_ROTARY_ENCODER = 0x10fa29c9
export enum RotaryEncoderReg {
    /**
     * Read-only int32_t. Upon device reset starts at `0` (regardless of the shaft position).
     * Increases by `1` for a clockwise "click", by `-1` for counter-clockwise.
     */
    Position = 0x101,
    
    /** Constant uint16_t. This specifies by how much `position` changes when the crank does 360 degree turn. Typically 12 or 24. */
    ClicksPerTurn = 0x180,
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
    /** No args. Indicates number of players supported and which buttons are present on the controller. */
    Announce = 0x0,
}

export enum GamepadReg {
    /**
     * Indicates which buttons are currently active (pressed).
     * `pressure` should be `0xff` for digital buttons, and proportional for analog ones.
     */
    Buttons = 0x101,
}

export enum GamepadEvent {
    /** Emitted when button goes from inactive to active. */
    Down = 0x1,
    
    /** Emitted when button goes from active to inactive. */
    Up = 0x2,
}

// Service: Humidity
export const SRV_HUMIDITY = 0x16c810b8
export enum HumidityReg {
    /** Read-only %RH u22.10 (uint32_t). The relative humidity in percentage of full water saturation. */
    Humidity = 0x101,
}

// Service: Light
export const SRV_LIGHT = 0x126f00e0

export enum LightLightType { // uint8_t
    WS2812B_GRB = 0x0,
    APA102 = 0x10,
    SK9822 = 0x11,
}

export enum LightReg {
    /**
     * Read-write fraction uint8_t. Set the luminosity of the strip.
     * At `0` the power to the strip is completely shut down.
     */
    Brightness = 0x1,
    
    /**
     * Read-only fraction uint8_t. This is the luminosity actually applied to the strip.
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
    
    /** Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller). */
    MaxPower = 0x7,
}

export enum LightCmd {
    /** Argument: program bytes. Run the given light "program". See service description for details. */
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
    /** Argument: message string (bytes). Report a message. */
    Debug = 0x80,
    
    /** Argument: message string (bytes). Report a message. */
    Log = 0x81,
    
    /** Argument: message string (bytes). Report a message. */
    Warn = 0x82,
    
    /** Argument: message string (bytes). Report a message. */
    Error = 0x83,
}

// Service: Model Runner
export const SRV_MODEL_RUNNER = 0x140f9a78

export enum ModelRunnerModelFormat { // uint32_t
    TFLite = 0x334c4654,
    ML4F = 0x30470f62,
}

export enum ModelRunnerCmd {
    /**
     * Argument: model_size bytes uint32_t. Open pipe for streaming in the model. The size of the model has to be declared upfront.
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
    
    /** Read-only bytes. Results of last model invocation as `float32` array. */
    Outputs = 0x101,
    
    /** Read-only dimension uint16_t. The shape of the input tensor. */
    InputShape = 0x180,
    
    /** Read-only dimension uint16_t. The shape of the output tensor. */
    OutputShape = 0x181,
    
    /** Read-only μs uint32_t. The time consumed in last model execution. */
    LastRunTime = 0x182,
    
    /** Read-only bytes uint32_t. Number of RAM bytes allocated for model execution. */
    AllocatedArenaSize = 0x183,
    
    /** Read-only bytes uint32_t. The size of the model in bytes. */
    ModelSize = 0x184,
    
    /** Read-only string (bytes). Textual description of last error when running or loading model (if any). */
    LastError = 0x185,
    
    /**
     * Constant ModelFormat (uint32_t). The type of ML models supported by this service.
     * `TFLite` is flatbuffer `.tflite` file.
     * `ML4F` is compiled machine code model for Cortex-M4F.
     * The format is typically present as first or second little endian word of model file.
     */
    Format = 0x186,
    
    /** Constant uint32_t. A version number for the format. */
    FormatVersion = 0x187,
    
    /**
     * Constant bool (uint8_t). If present and true this service can run models independently of other
     * instances of this service on the device.
     */
    Parallel = 0x188,
}

// Service: Motor
export const SRV_MOTOR = 0x17004cd8
export enum MotorReg {
    /**
     * Read-write fraction int16_t. PWM duty cycle of the motor. Use negative/positive values to run the motor forwards and backwards.
     * Positive is recommended to be clockwise rotation and negative counterclockwise.
     */
    Duty = 0x2,
    
    /** Read-write bool (uint8_t). Turn the power to the motor on/off. */
    Enabled = 0x1,
}

// Service: Multitouch
export const SRV_MULTITOUCH = 0x18d55e2b
export enum MultitouchReg {
    /**
     * Read-only i32[] (bytes). Capacitance of channels. The capacitance is continuously calibrated, and a value of `0` indicates
     * no touch, wheres a value of around `100` or more indicates touch.
     * It's best to ignore this (unless debugging), and use events.
     */
    Capacity = 0x101,
}

export enum MultitouchEvent {
    /** Argument: channel uint32_t. Emitted when an input is touched. */
    Touch = 0x1,
    
    /** Argument: channel uint32_t. Emitted when an input is no longer touched. */
    Release = 0x2,
    
    /** Argument: channel uint32_t. Emitted when an input is briefly touched. TODO Not implemented. */
    Tap = 0x3,
    
    /** Argument: channel uint32_t. Emitted when an input is touched for longer than 500ms. TODO Not implemented. */
    LongPress = 0x4,
    
    /** Emitted when input channels are successively touched in order of increasing channel numbers. */
    SwipePos = 0x10,
    
    /** Emitted when input channels are successively touched in order of decreasing channel numbers. */
    SwipeNeg = 0x11,
}

// Service: Music
export const SRV_MUSIC = 0x1b57b1d7
export enum MusicReg {
    /** Read-write fraction uint8_t. The volume (duty cycle) of the buzzer. */
    Volume = 0x1,
}

export enum MusicCmd {
    /**
     * Play a PWM tone with given period and duty for given duration.
     * The duty is scaled down with `volume` register.
     * To play tone at frequency `F` Hz and volume `V` (in `0..1`) you will want
     * to send `P = 1000000 / F` and `D = P * V / 2`.
     */
    PlayTone = 0x80,
}

// Service: Device Namer
export const SRV_DEVICE_NAMER = 0x119c3ad1
export enum DeviceNamerCmd {
    /** Argument: device_id uint64_t. Get the name corresponding to given device identifer. Returns empty string if unset. */
    GetName = 0x80,
    
    /** Set name. Can set to empty to remove name binding. */
    SetName = 0x81,
    
    /** No args. Remove all name bindings. */
    ClearAllNames = 0x84,
    
    /** Argument: stored_names pipe (bytes). Return all names stored internally. */
    ListStoredNames = 0x82,
    
    /** Argument: required_names pipe (bytes). List all names required by the current program. `device_id` is `0` if name is unbound. */
    ListRequiredNames = 0x83,
}

// Service: Power
export const SRV_POWER = 0x1fa4c95a
export enum PowerReg {
    /** Read-write bool (uint8_t). Turn the power to the bus on/off. */
    Enabled = 0x1,
    
    /**
     * Read-write mA uint16_t. Limit the power provided by the service. The actual maximum limit will depend on hardware.
     * This field may be read-only in some implementations - you should read it back after setting.
     */
    MaxPower = 0x7,
    
    /** Read-only bool (uint8_t). Indicates whether the power has been shut down due to overdraw. */
    Overload = 0x181,
    
    /** Read-only mA uint16_t. Present current draw from the bus. */
    CurrentDraw = 0x101,
    
    /** Read-only mV uint16_t. Voltage on input. */
    BatteryVoltage = 0x180,
    
    /** Read-only fraction uint16_t. Fraction of charge in the battery. */
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

// Service: PWM Light
export const SRV_PWM_LIGHT = 0x1fb57453
export enum PwmLightReg {
    /**
     * Read-write fraction uint16_t. Set the luminosity of the strip. The value is used to scale `start_intensity` in `steps` register.
     * At `0` the power to the strip is completely shut down.
     */
    Brightness = 0x1,
    
    /** Read-write mA uint16_t. Limit the power drawn by the light-strip (and controller). */
    MaxPower = 0x7,
    
    /** Constant uint8_t. Maximum number of steps allowed in animation definition. This determines the size of the `steps` register. */
    MaxSteps = 0x180,
    
    /**
     * The steps of current animation. Setting this also sets `current_iteration` to `0`.
     * Step with `duration == 0` is treated as an end marker.
     */
    Steps = 0x82,
    
    /**
     * Read-write uint16_t. Currently excecuting iteration of animation. Can be set to `0` to restart current animation.
     * If `current_iteration > max_iterations`, then no animation is currently running.
     */
    CurrentIteration = 0x80,
    
    /** Read-write uint16_t. The animation will be repeated `max_iterations + 1` times. */
    MaxIterations = 0x81,
}

// Service: Servo
export const SRV_SERVO = 0x12fc9103
export enum ServoReg {
    /** Read-write μs uint32_t. Specifies length of the pulse in microseconds. The period is always 20ms. */
    Pulse = 0x2,
    
    /** Read-write bool (uint8_t). Turn the power to the servo on/off. */
    Enabled = 0x1,
}

// Service: Slider
export const SRV_SLIDER = 0x1f274746
export enum SliderReg {
    /** Read-only fraction uint16_t. The relative position of the slider between `0x0000` and `0xffff`. */
    Position = 0x101,
}

// Service: TCP
export const SRV_TCP = 0x1b43b70b

export enum TCPTcpError { // int32_t
    InvalidCommand = 0x1,
    InvalidCommandPayload = 0x2,
}

export enum TCPCmd {
    /** Argument: inbound pipe (bytes). Open pair of pipes between network peripheral and a controlling device. In/outbound refers to direction from/to internet. */
    Open = 0x80,
}

export enum TCPPipeCmd {
    /**
     * Open an SSL connection to a given host:port pair. Can be issued only once on given pipe.
     * After the connection is established, an empty data report is sent.
     * Connection is closed by closing the pipe.
     */
    OpenSsl = 0x1,
    
    /** Argument: error TcpError (int32_t). Reported when an error is encountered. Negative error codes come directly from the SSL implementation. */
    Error = 0x0,
}

// Service: Temperature
export const SRV_TEMPERATURE = 0x1421bac7
export enum TemperatureReg {
    /** Read-only °C u22.10 (uint32_t). The temperature. */
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

export enum WifiCmd {
    /** Argument: results pipe (bytes). Initiate search for WiFi networks. Results are returned via pipe, one entry per packet. */
    Scan = 0x80,
    
    /** Argument: ssid string (bytes). Connect to named network. Password can be appended after ssid. Both strings have to be NUL-terminated. */
    Connect = 0x81,
    
    /** No args. Disconnect from current WiFi network if any. */
    Disconnect = 0x82,
}

export enum WifiEvent {
    /** Emitted upon successful join and IP address assignment. */
    GotIp = 0x1,
    
    /** Emitted when disconnected from network. */
    LostIp = 0x2,
}

