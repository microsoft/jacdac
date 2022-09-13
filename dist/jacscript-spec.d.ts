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
    announce(): void
    getRegister(): void
    setRegister(): void
    calibrate(): void
    intensity: JDRegisterNum
    value: JDRegisterNum
    minValue: JDRegisterNum
    maxValue: JDRegisterNum
    maxPower: JDRegisterNum
    streamingSamples: JDRegisterNum
    streamingInterval: JDRegisterNum
    reading: JDRegisterNum
    readingRange: JDRegisterNum
    supportedRanges: JDRegisterArray
    minReading: JDRegisterNum
    maxReading: JDRegisterNum
    readingError: JDRegisterNum
    readingResolution: JDRegisterNum
    inactiveThreshold: JDRegisterNum
    activeThreshold: JDRegisterNum
    streamingPreferredInterval: JDRegisterNum
    variant: JDRegisterNum
    statusCode: JDRegisterArray & { code: SystemStatusCodes, vendor_code: number }
    instanceName: JDRegisterString
    active: JDEvent
    inactive: JDEvent
    change: JDEvent
    statusCodeChanged: JDEvent
    neutral: JDEvent
}

// Service: Base service
declare class BaseRole extends Role {
    instanceName: JDRegisterString
    statusCode: JDRegisterArray & { code: number, vendor_code: number }
    statusCodeChanged: JDEvent
}

// Service: Sensor
declare class SensorRole extends Role {
    streamingSamples: JDRegisterNum
    streamingInterval: JDRegisterNum
    streamingPreferredInterval: JDRegisterNum
}

// Service: Accelerometer
declare class AccelerometerRole extends SensorRole {
    forces: JDRegisterArray & { x: number, y: number, z: number }
    forcesError: JDRegisterNum
    maxForce: JDRegisterNum
    maxForcesSupported: JDRegisterArray
    tiltUp: JDEvent
    tiltDown: JDEvent
    tiltLeft: JDEvent
    tiltRight: JDEvent
    faceUp: JDEvent
    faceDown: JDEvent
    freefall: JDEvent
    shake: JDEvent
    force2g: JDEvent
    force3g: JDEvent
    force6g: JDEvent
    force8g: JDEvent
}
declare namespace roles {
    function accelerometer(): AccelerometerRole
}

// Service: Acidity
declare class AcidityRole extends SensorRole {
    acidity: JDRegisterNum
    acidityError: JDRegisterNum
    minAcidity: JDRegisterNum
    maxHumidity: JDRegisterNum
}
declare namespace roles {
    function acidity(): AcidityRole
}

// Service: Air Pressure
declare class AirPressureRole extends SensorRole {
    pressure: JDRegisterNum
    pressureError: JDRegisterNum
}
declare namespace roles {
    function airPressure(): AirPressureRole
}

// Service: Air Quality Index
declare class AirQualityIndexRole extends SensorRole {
    aqiIndex: JDRegisterNum
    aqiIndexError: JDRegisterNum
    minAqiIndex: JDRegisterNum
    maxAqiIndex: JDRegisterNum
}
declare namespace roles {
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
    buttons: JDRegisterArray & { button: ArcadeGamepadButton, pressure: number }
    availableButtons: JDRegisterArray
    down: JDEvent
    up: JDEvent
}
declare namespace roles {
    function arcadeGamepad(): ArcadeGamepadRole
}

// Service: Arcade Sound
declare class ArcadeSoundRole extends Role {
    play(samples: number): void
    sampleRate: JDRegisterNum
    bufferSize: JDRegisterNum
    bufferPending: JDRegisterNum
}
declare namespace roles {
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
    hubName: JDRegisterString
    hubDeviceId: JDRegisterString
    connectionStatus: JDRegisterNum
    pushPeriod: JDRegisterNum
    pushWatchdogPeriod: JDRegisterNum
    connect(): void
    disconnect(): void
    setConnectionString(connection_string: string): void
    connectionStatusChange: JDEvent
    messageSent: JDEvent
}
declare namespace roles {
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
    enabled: JDRegisterNum
    formats: JDRegisterArray
    detect: JDEvent
}
declare namespace roles {
    function barcodeReader(): BarcodeReaderRole
}

// Service: bit:radio
declare class BitRadioRole extends Role {
    enabled: JDRegisterNum
    group: JDRegisterNum
    transmissionPower: JDRegisterNum
    frequencyBand: JDRegisterNum
    sendString(message: string): void
    sendNumber(value: number): void
    sendValue(value: number, name: string): void
    sendBuffer(data: number): void
}
declare namespace roles {
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
    info(): void
    setSession(session_id: number): void
    pageData(page_address: number, page_offset: number, chunk_no: number, chunk_max: number, session_id: number, reserved0: number, reserved1: number, reserved2: number, reserved3: number, page_data: number): void
}
declare namespace roles {
    function bootloader(): BootloaderRole
}

// Service: Braille display
declare class BrailleDisplayRole extends Role {
    enabled: JDRegisterNum
    patterns: JDRegisterString
    length: JDRegisterNum
}
declare namespace roles {
    function brailleDisplay(): BrailleDisplayRole
}

// Service: Bridge
declare class BridgeRole extends Role {
    enabled: JDRegisterNum
}
declare namespace roles {
    function bridge(): BridgeRole
}

// Service: Button
declare class ButtonRole extends SensorRole {
    pressure: JDRegisterNum
    analog: JDRegisterNum
    pressed: JDRegisterNum
    down: JDEvent
    up: JDEvent
    hold: JDEvent
}
declare namespace roles {
    function button(): ButtonRole
}

// Service: Buzzer
declare class BuzzerRole extends Role {
    volume: JDRegisterNum
    playTone(period: number, duty: number, duration: number): void
    playNote(frequency: number, volume: number, duration: number): void
}
declare namespace roles {
    function buzzer(): BuzzerRole
}

// Service: Capacitive Button
declare class CapacitiveButtonRole extends Role {
    threshold: JDRegisterNum
    calibrate(): void
}
declare namespace roles {
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
    message: JDRegisterString
    brightness: JDRegisterNum
    variant: JDRegisterNum
    textDirection: JDRegisterNum
    rows: JDRegisterNum
    columns: JDRegisterNum
}
declare namespace roles {
    function characterScreen(): CharacterScreenRole
}

// Service: Cloud Adapter
declare enum CloudAdapterCommandStatus { // uint32_t
    OK = 0xc8,
    NotFound = 0x194,
    Busy = 0x1ad,
}

declare class CloudAdapterRole extends Role {
    upload(label: string, ...value: number[]): void
    uploadBin(payload: number): void
    ackCloudCommand(seq_no: number, status: CloudAdapterCommandStatus, ...result: number[]): void
    connected: JDRegisterNum
    connectionName: JDRegisterString
    cloudCommand: JDEvent
    change: JDEvent
}
declare namespace roles {
    function cloudAdapter(): CloudAdapterRole
}

// Service: CODAL Message Bus
declare class CodalMessageBusRole extends Role {
    send(source: number, value: number): void
    message: JDEvent
}
declare namespace roles {
    function codalMessageBus(): CodalMessageBusRole
}

// Service: Color
declare class ColorRole extends SensorRole {
    color: JDRegisterArray & { red: number, green: number, blue: number }
}
declare namespace roles {
    function color(): ColorRole
}

// Service: Compass
declare class CompassRole extends SensorRole {
    heading: JDRegisterNum
    enabled: JDRegisterNum
    headingError: JDRegisterNum
    calibrate(): void
}
declare namespace roles {
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
    services(): void
    noop(): void
    identify(): void
    reset(): void
    floodPing(num_responses: number, start_counter: number, size: number): void
    setStatusLight(to_red: number, to_green: number, to_blue: number, speed: number): void
    proxy(): void
    reliableCommands(seed: number): void
    resetIn: JDRegisterNum
    deviceDescription: JDRegisterString
    productIdentifier: JDRegisterNum
    bootloaderProductIdentifier: JDRegisterNum
    firmwareVersion: JDRegisterString
    mcuTemperature: JDRegisterNum
    uptime: JDRegisterNum
}
declare namespace roles {
    function control(): ControlRole
}

// Service: Dashboard
declare class DashboardRole extends Role {
}
declare namespace roles {
    function dashboard(): DashboardRole
}

// Service: DC Current Measurement
declare class DcCurrentMeasurementRole extends SensorRole {
    measurementName: JDRegisterString
    measurement: JDRegisterNum
    measurementError: JDRegisterNum
    minMeasurement: JDRegisterNum
    maxMeasurement: JDRegisterNum
}
declare namespace roles {
    function dcCurrentMeasurement(): DcCurrentMeasurementRole
}

// Service: DC Voltage Measurement
declare enum DcVoltageMeasurementVoltageMeasurementType { // uint8_t
    Absolute = 0x0,
    Differential = 0x1,
}

declare class DcVoltageMeasurementRole extends SensorRole {
    measurementType: JDRegisterNum
    measurementName: JDRegisterString
    measurement: JDRegisterNum
    measurementError: JDRegisterNum
    minMeasurement: JDRegisterNum
    maxMeasurement: JDRegisterNum
}
declare namespace roles {
    function dcVoltageMeasurement(): DcVoltageMeasurementRole
}

// Service: Distance
declare enum DistanceVariant { // uint8_t
    Ultrasonic = 0x1,
    Infrared = 0x2,
    LiDAR = 0x3,
    Laser = 0x4,
}

declare class DistanceRole extends SensorRole {
    distance: JDRegisterNum
    distanceError: JDRegisterNum
    minRange: JDRegisterNum
    maxRange: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function distance(): DistanceRole
}

// Service: DMX
declare class DmxRole extends Role {
    enabled: JDRegisterNum
    send(channels: number): void
}
declare namespace roles {
    function dmx(): DmxRole
}

// Service: Dot Matrix
declare enum DotMatrixVariant { // uint8_t
    LED = 0x1,
    Braille = 0x2,
}

declare class DotMatrixRole extends Role {
    dots: JDRegisterNum
    brightness: JDRegisterNum
    rows: JDRegisterNum
    columns: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function dotMatrix(): DotMatrixRole
}

// Service: Dual Motors
declare class DualMotorsRole extends Role {
    speed: JDRegisterArray & { left: number, right: number }
    enabled: JDRegisterNum
    loadTorque: JDRegisterNum
    loadRotationSpeed: JDRegisterNum
    reversible: JDRegisterNum
}
declare namespace roles {
    function dualMotors(): DualMotorsRole
}

// Service: Equivalent CO₂
declare enum ECO2Variant { // uint8_t
    VOC = 0x1,
    NDIR = 0x2,
}

declare class ECO2Role extends SensorRole {
    eCO2: JDRegisterNum
    eCO2Error: JDRegisterNum
    minECO2: JDRegisterNum
    maxECO2: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function eCO2(): ECO2Role
}

// Service: Flex
declare class FlexRole extends SensorRole {
    bending: JDRegisterNum
    length: JDRegisterNum
}
declare namespace roles {
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
    direction: JDRegisterArray & { buttons: GamepadButtons, x: number, y: number }
    variant: JDRegisterNum
    buttonsAvailable: JDRegisterNum
    buttonsChanged: JDEvent
}
declare namespace roles {
    function gamepad(): GamepadRole
}

// Service: Gyroscope
declare class GyroscopeRole extends SensorRole {
    rotationRates: JDRegisterArray & { x: number, y: number, z: number }
    rotationRatesError: JDRegisterNum
    maxRate: JDRegisterNum
    maxRatesSupported: JDRegisterArray
}
declare namespace roles {
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
    heartRate: JDRegisterNum
    heartRateError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function heartRate(): HeartRateRole
}

// Service: HID Joystick
declare class HidJoystickRole extends Role {
    buttonCount: JDRegisterNum
    buttonsAnalog: JDRegisterNum
    axisCount: JDRegisterNum
    setButtons(...pressure: number[]): void
    setAxis(...position: number[]): void
}
declare namespace roles {
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
    key(selector: HidKeyboardSelector, modifiers: HidKeyboardModifiers, action: HidKeyboardAction): void
    clear(): void
}
declare namespace roles {
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
    setButton(buttons: HidMouseButton, ev: HidMouseButtonEvent): void
    move(dx: number, dy: number, time: number): void
    wheel(dy: number, time: number): void
}
declare namespace roles {
    function hidMouse(): HidMouseRole
}

// Service: Humidity
declare class HumidityRole extends SensorRole {
    humidity: JDRegisterNum
    humidityError: JDRegisterNum
    minHumidity: JDRegisterNum
    maxHumidity: JDRegisterNum
}
declare namespace roles {
    function humidity(): HumidityRole
}

// Service: Illuminance
declare class IlluminanceRole extends SensorRole {
    illuminance: JDRegisterNum
    illuminanceError: JDRegisterNum
}
declare namespace roles {
    function illuminance(): IlluminanceRole
}

// Service: Indexed screen
declare class IndexedScreenRole extends Role {
    startUpdate(x: number, y: number, width: number, height: number): void
    setPixels(pixels: number): void
    brightness: JDRegisterNum
    palette: JDRegisterArray & { blue: number, green: number, red: number, padding: number }
    bitsPerPixel: JDRegisterNum
    width: JDRegisterNum
    height: JDRegisterNum
    widthMajor: JDRegisterNum
    upSampling: JDRegisterNum
    rotation: JDRegisterNum
}
declare namespace roles {
    function indexedScreen(): IndexedScreenRole
}

// Service: Infrastructure
declare class InfrastructureRole extends Role {
}
declare namespace roles {
    function infrastructure(): InfrastructureRole
}

// Service: Jacscript Condition
declare class JacscriptConditionRole extends Role {
    signal(): void
    signalled: JDEvent
}
declare namespace roles {
    function jacscriptCondition(): JacscriptConditionRole
}

// Service: Jacscript Manager
declare enum JacscriptManagerMessageFlags { // uint8_t
    ToBeContinued = 0x1,
}

declare class JacscriptManagerRole extends Role {
    deployBytecode(bytecode_size: number): void
    readBytecode(bytecode: number): void
    running: JDRegisterNum
    autostart: JDRegisterNum
    logging: JDRegisterNum
    programSize: JDRegisterNum
    programHash: JDRegisterNum
    programPanic: JDEvent
    programChange: JDEvent
}
declare namespace roles {
    function jacscriptManager(): JacscriptManagerRole
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
    pixels: JDRegisterNum
    brightness: JDRegisterNum
    actualBrightness: JDRegisterNum
    numPixels: JDRegisterNum
    numColumns: JDRegisterNum
    maxPower: JDRegisterNum
    ledsPerPixel: JDRegisterNum
    waveLength: JDRegisterNum
    luminousIntensity: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
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
    animate(to_red: number, to_green: number, to_blue: number, speed: number): void
    color: JDRegisterArray & { red: number, green: number, blue: number }
    maxPower: JDRegisterNum
    ledCount: JDRegisterNum
    waveLength: JDRegisterNum
    luminousIntensity: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
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
    brightness: JDRegisterNum
    actualBrightness: JDRegisterNum
    lightType: JDRegisterNum
    numPixels: JDRegisterNum
    numColumns: JDRegisterNum
    maxPower: JDRegisterNum
    maxPixels: JDRegisterNum
    numRepeats: JDRegisterNum
    variant: JDRegisterNum
    run(program: number): void
}
declare namespace roles {
    function ledStrip(): LedStripRole
}

// Service: Light bulb
declare class LightBulbRole extends Role {
    brightness: JDRegisterNum
    dimmable: JDRegisterNum
}
declare namespace roles {
    function lightBulb(): LightBulbRole
}

// Service: Light level
declare enum LightLevelVariant { // uint8_t
    PhotoResistor = 0x1,
    ReverseBiasedLED = 0x2,
}

declare class LightLevelRole extends SensorRole {
    lightLevel: JDRegisterNum
    lightLevelError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
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
    minPriority: JDRegisterNum
}
declare namespace roles {
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
    strength: JDRegisterNum
    detected: JDRegisterNum
    variant: JDRegisterNum
    active: JDEvent
    inactive: JDEvent
}
declare namespace roles {
    function magneticFieldLevel(): MagneticFieldLevelRole
}

// Service: Magnetometer
declare class MagnetometerRole extends SensorRole {
    forces: JDRegisterArray & { x: number, y: number, z: number }
    forcesError: JDRegisterNum
    calibrate(): void
}
declare namespace roles {
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
    pressed: JDRegisterArray
    rows: JDRegisterNum
    columns: JDRegisterNum
    labels: JDRegisterArray
    variant: JDRegisterNum
    down: JDEvent
    up: JDEvent
    click: JDEvent
    longClick: JDEvent
}
declare namespace roles {
    function matrixKeypad(): MatrixKeypadRole
}

// Service: Microphone
declare class MicrophoneRole extends Role {
    sample(samples: number, num_samples: number): void
    samplingPeriod: JDRegisterNum
}
declare namespace roles {
    function microphone(): MicrophoneRole
}

// Service: MIDI output
declare class MidiOutputRole extends Role {
    enabled: JDRegisterNum
    clear(): void
    send(data: number): void
}
declare namespace roles {
    function midiOutput(): MidiOutputRole
}

// Service: Model Runner
declare enum ModelRunnerModelFormat { // uint32_t
    TFLite = 0x334c4654,
    ML4F = 0x30470f62,
    EdgeImpulseCompiled = 0x30564945,
}

declare class ModelRunnerRole extends Role {
    setModel(model_size: number): void
    predict(outputs: number): void
    autoInvokeEvery: JDRegisterNum
    outputs: JDRegisterArray
    inputShape: JDRegisterArray
    outputShape: JDRegisterArray
    lastRunTime: JDRegisterNum
    allocatedArenaSize: JDRegisterNum
    modelSize: JDRegisterNum
    lastError: JDRegisterString
    format: JDRegisterNum
    formatVersion: JDRegisterNum
    parallel: JDRegisterNum
}
declare namespace roles {
    function modelRunner(): ModelRunnerRole
}

// Service: Motion
declare enum MotionVariant { // uint8_t
    PIR = 0x1,
}

declare class MotionRole extends SensorRole {
    moving: JDRegisterNum
    maxDistance: JDRegisterNum
    angle: JDRegisterNum
    variant: JDRegisterNum
    movement: JDEvent
}
declare namespace roles {
    function motion(): MotionRole
}

// Service: Motor
declare class MotorRole extends Role {
    speed: JDRegisterNum
    enabled: JDRegisterNum
    loadTorque: JDRegisterNum
    loadRotationSpeed: JDRegisterNum
    reversible: JDRegisterNum
}
declare namespace roles {
    function motor(): MotorRole
}

// Service: Multitouch
declare class MultitouchRole extends SensorRole {
    capacity: JDRegisterArray
    touch: JDEvent
    release: JDEvent
    tap: JDEvent
    longPress: JDEvent
    swipePos: JDEvent
    swipeNeg: JDEvent
}
declare namespace roles {
    function multitouch(): MultitouchRole
}

// Service: Planar position
declare enum PlanarPositionVariant { // uint8_t
    OpticalMousePosition = 0x1,
}

declare class PlanarPositionRole extends SensorRole {
    position: JDRegisterArray & { x: number, y: number }
    variant: JDRegisterNum
}
declare namespace roles {
    function planarPosition(): PlanarPositionRole
}

// Service: Potentiometer
declare enum PotentiometerVariant { // uint8_t
    Slider = 0x1,
    Rotary = 0x2,
}

declare class PotentiometerRole extends SensorRole {
    position: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
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
    allowed: JDRegisterNum
    maxPower: JDRegisterNum
    powerStatus: JDRegisterNum
    currentDraw: JDRegisterNum
    batteryVoltage: JDRegisterNum
    batteryCharge: JDRegisterNum
    batteryCapacity: JDRegisterNum
    keepOnPulseDuration: JDRegisterNum
    keepOnPulsePeriod: JDRegisterNum
    shutdown(): void
    powerStatusChanged: JDEvent
}
declare namespace roles {
    function power(): PowerRole
}

// Service: Power supply
declare class PowerSupplyRole extends Role {
    enabled: JDRegisterNum
    outputVoltage: JDRegisterNum
    minimumVoltage: JDRegisterNum
    maximumVoltage: JDRegisterNum
}
declare namespace roles {
    function powerSupply(): PowerSupplyRole
}

// Service: Pressure Button
declare class PressureButtonRole extends Role {
    threshold: JDRegisterNum
}
declare namespace roles {
    function pressureButton(): PressureButtonRole
}

// Service: Protocol Test
declare class ProtoTestRole extends Role {
    rwBool: JDRegisterNum
    roBool: JDRegisterNum
    rwU32: JDRegisterNum
    roU32: JDRegisterNum
    rwI32: JDRegisterNum
    roI32: JDRegisterNum
    rwString: JDRegisterString
    roString: JDRegisterString
    rwBytes: JDRegisterNum
    roBytes: JDRegisterNum
    rwI8U8U16I32: JDRegisterArray & { i8: number, u8: number, u16: number, i32: number }
    roI8U8U16I32: JDRegisterArray & { i8: number, u8: number, u16: number, i32: number }
    rwU8String: JDRegisterArray & { u8: number, str: string }
    roU8String: JDRegisterArray & { u8: number, str: string }
    eBool: JDEvent
    eU32: JDEvent
    eI32: JDEvent
    eString: JDEvent
    eBytes: JDEvent
    eI8U8U16I32: JDEvent
    eU8String: JDEvent
    cBool(bo: number): void
    cU32(u32: number): void
    cI32(i32: number): void
    cString(str: string): void
    cBytes(bytes: number): void
    cI8U8U16I32(i8: number, u8: number, u16: number, i32: number): void
    cU8String(u8: number, str: string): void
    cReportPipe(p_bytes: number): void
}
declare namespace roles {
    function protoTest(): ProtoTestRole
}

// Service: Proxy
declare class ProxyRole extends Role {
}
declare namespace roles {
    function proxy(): ProxyRole
}

// Service: Pulse Oximeter
declare class PulseOximeterRole extends SensorRole {
    oxygen: JDRegisterNum
    oxygenError: JDRegisterNum
}
declare namespace roles {
    function pulseOximeter(): PulseOximeterRole
}

// Service: Rain gauge
declare class RainGaugeRole extends SensorRole {
    precipitation: JDRegisterNum
    precipitationPrecision: JDRegisterNum
}
declare namespace roles {
    function rainGauge(): RainGaugeRole
}

// Service: Real time clock
declare enum RealTimeClockVariant { // uint8_t
    Computer = 0x1,
    Crystal = 0x2,
    Cuckoo = 0x3,
}

declare class RealTimeClockRole extends SensorRole {
    localTime: JDRegisterArray & { year: number, month: number, day_of_month: number, day_of_week: number, hour: number, min: number, sec: number }
    drift: JDRegisterNum
    precision: JDRegisterNum
    variant: JDRegisterNum
    setTime(year: number, month: number, day_of_month: number, day_of_week: number, hour: number, min: number, sec: number): void
}
declare namespace roles {
    function realTimeClock(): RealTimeClockRole
}

// Service: Reflected light
declare enum ReflectedLightVariant { // uint8_t
    InfraredDigital = 0x1,
    InfraredAnalog = 0x2,
}

declare class ReflectedLightRole extends SensorRole {
    brightness: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function reflectedLight(): ReflectedLightRole
}

// Service: Relay
declare enum RelayVariant { // uint8_t
    Electromechanical = 0x1,
    SolidState = 0x2,
    Reed = 0x3,
}

declare class RelayRole extends Role {
    active: JDRegisterNum
    variant: JDRegisterNum
    maxSwitchingCurrent: JDRegisterNum
}
declare namespace roles {
    function relay(): RelayRole
}

// Service: Random Number Generator
declare enum RngVariant { // uint8_t
    Quantum = 0x1,
    ADCNoise = 0x2,
    WebCrypto = 0x3,
}

declare class RngRole extends Role {
    random: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function rng(): RngRole
}

// Service: Role Manager
declare class RoleManagerRole extends Role {
    autoBind: JDRegisterNum
    allRolesAllocated: JDRegisterNum
    setRole(device_id: number, service_idx: number, role: string): void
    clearAllRoles(): void
    listRoles(roles: number): void
    change: JDEvent
}
declare namespace roles {
    function roleManager(): RoleManagerRole
}

// Service: Rotary encoder
declare class RotaryEncoderRole extends SensorRole {
    position: JDRegisterNum
    clicksPerTurn: JDRegisterNum
    clicker: JDRegisterNum
}
declare namespace roles {
    function rotaryEncoder(): RotaryEncoderRole
}

// Service: Rover
declare class RoverRole extends SensorRole {
    kinematics: JDRegisterArray & { x: number, y: number, vx: number, vy: number, heading: number }
}
declare namespace roles {
    function rover(): RoverRole
}

// Service: Satellite Navigation System
declare class SatNavRole extends SensorRole {
    position: JDRegisterArray & { timestamp: number, latitude: number, longitude: number, accuracy: number, altitude: number, altitudeAccuracy: number }
    enabled: JDRegisterNum
    inactive: JDEvent
}
declare namespace roles {
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
    inputs: JDRegisterArray & { sampling_interval: number, samples_in_window: number, reserved: number, device_id: number, service_class: number, service_num: number, sample_size: number, sample_type: SensorAggregatorSampleType, sample_shift: number }
    numSamples: JDRegisterNum
    sampleSize: JDRegisterNum
    streamingSamples: JDRegisterNum
    currentSample: JDRegisterNum
}
declare namespace roles {
    function sensorAggregator(): SensorAggregatorRole
}

// Service: Servo
declare class ServoRole extends Role {
    angle: JDRegisterNum
    enabled: JDRegisterNum
    offset: JDRegisterNum
    minAngle: JDRegisterNum
    minPulse: JDRegisterNum
    maxAngle: JDRegisterNum
    maxPulse: JDRegisterNum
    stallTorque: JDRegisterNum
    responseSpeed: JDRegisterNum
    actualAngle: JDRegisterNum
}
declare namespace roles {
    function servo(): ServoRole
}

// Service: Settings
declare class SettingsRole extends Role {
    get(key: string): void
    set(key: string, value: number): void
    delete(key: string): void
    listKeys(results: number): void
    list(results: number): void
    clear(): void
    change: JDEvent
}
declare namespace roles {
    function settings(): SettingsRole
}

// Service: 7-segment display
declare class SevenSegmentDisplayRole extends Role {
    digits: JDRegisterNum
    brightness: JDRegisterNum
    doubleDots: JDRegisterNum
    digitCount: JDRegisterNum
    decimalPoint: JDRegisterNum
    setNumber(value: number): void
}
declare namespace roles {
    function sevenSegmentDisplay(): SevenSegmentDisplayRole
}

// Service: Soil moisture
declare enum SoilMoistureVariant { // uint8_t
    Resistive = 0x1,
    Capacitive = 0x2,
}

declare class SoilMoistureRole extends SensorRole {
    moisture: JDRegisterNum
    moistureError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function soilMoisture(): SoilMoistureRole
}

// Service: Solenoid
declare enum SolenoidVariant { // uint8_t
    PushPull = 0x1,
    Valve = 0x2,
    Latch = 0x3,
}

declare class SolenoidRole extends Role {
    pulled: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function solenoid(): SolenoidRole
}

// Service: Sound level
declare class SoundLevelRole extends SensorRole {
    soundLevel: JDRegisterNum
    enabled: JDRegisterNum
    loudThreshold: JDRegisterNum
    quietThreshold: JDRegisterNum
    loud: JDEvent
    quiet: JDEvent
}
declare namespace roles {
    function soundLevel(): SoundLevelRole
}

// Service: Sound player
declare class SoundPlayerRole extends Role {
    volume: JDRegisterNum
    play(name: string): void
    cancel(): void
    listSounds(sounds_port: number): void
}
declare namespace roles {
    function soundPlayer(): SoundPlayerRole
}

// Service: Sound Recorder with Playback
declare enum SoundRecorderWithPlaybackStatus { // uint8_t
    Idle = 0x0,
    Recording = 0x1,
    Playing = 0x2,
}

declare class SoundRecorderWithPlaybackRole extends Role {
    play(): void
    record(duration: number): void
    cancel(): void
    status: JDRegisterNum
    time: JDRegisterNum
    volume: JDRegisterNum
}
declare namespace roles {
    function soundRecorderWithPlayback(): SoundRecorderWithPlaybackRole
}

// Service: Sound Spectrum
declare class SoundSpectrumRole extends SensorRole {
    frequencyBins: JDRegisterNum
    enabled: JDRegisterNum
    fftPow2Size: JDRegisterNum
    minDecibels: JDRegisterNum
    maxDecibels: JDRegisterNum
    smoothingTimeConstant: JDRegisterNum
}
declare namespace roles {
    function soundSpectrum(): SoundSpectrumRole
}

// Service: Speech synthesis
declare class SpeechSynthesisRole extends Role {
    enabled: JDRegisterNum
    lang: JDRegisterString
    volume: JDRegisterNum
    pitch: JDRegisterNum
    rate: JDRegisterNum
    speak(text: string): void
    cancel(): void
}
declare namespace roles {
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
    active: JDRegisterNum
    variant: JDRegisterNum
    on: JDEvent
    off: JDEvent
}
declare namespace roles {
    function switch_(): SwitchRole
}

// Service: TCP
declare enum TcpTcpError { // int32_t
    InvalidCommand = 0x1,
    InvalidCommandPayload = 0x2,
}

declare class TcpRole extends Role {
    open(inbound: number): void
}
declare namespace roles {
    function tcp(): TcpRole
}

// Service: Temperature
declare enum TemperatureVariant { // uint8_t
    Outdoor = 0x1,
    Indoor = 0x2,
    Body = 0x3,
}

declare class TemperatureRole extends SensorRole {
    temperature: JDRegisterNum
    minTemperature: JDRegisterNum
    maxTemperature: JDRegisterNum
    temperatureError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function temperature(): TemperatureRole
}

// Service: Timeseries Aggregator
declare class TimeseriesAggregatorRole extends Role {
    clear(): void
    update(value: number, label: string): void
    setWindow(duration: number, label: string): void
    setUpload(upload: number, label: string): void
    now: JDRegisterNum
    fastStart: JDRegisterNum
    defaultWindow: JDRegisterNum
    defaultUpload: JDRegisterNum
    uploadUnlabelled: JDRegisterNum
    sensorWatchdogPeriod: JDRegisterNum
}
declare namespace roles {
    function timeseriesAggregator(): TimeseriesAggregatorRole
}

// Service: Traffic Light
declare class TrafficLightRole extends Role {
    red: JDRegisterNum
    yellow: JDRegisterNum
    green: JDRegisterNum
}
declare namespace roles {
    function trafficLight(): TrafficLightRole
}

// Service: Total Volatile organic compound
declare class TvocRole extends SensorRole {
    tVOC: JDRegisterNum
    tVOCError: JDRegisterNum
    minTVOC: JDRegisterNum
    maxTVOC: JDRegisterNum
}
declare namespace roles {
    function tvoc(): TvocRole
}

// Service: Unique Brain
declare class UniqueBrainRole extends Role {
}
declare namespace roles {
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
    disablePackets(): void
    enablePackets(): void
    disableLog(): void
    enableLog(): void
}
declare namespace roles {
    function usbBridge(): UsbBridgeRole
}

// Service: UV index
declare enum UvIndexVariant { // uint8_t
    UVA_UVB = 0x1,
    Visible_IR = 0x2,
}

declare class UvIndexRole extends SensorRole {
    uvIndex: JDRegisterNum
    uvIndexError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
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
    telemetryStatus: JDRegisterNum
    telemetryStatusInterval: JDRegisterNum
    fingerprintType: JDRegisterNum
    fingerprintTemplate: JDRegisterArray & { confidence: number, template: number }
    resetFingerprintTemplate(): void
    retrainFingerprintTemplate(): void
    telemetryStatusChange: JDEvent
    fingerprintTemplateChange: JDEvent
}
declare namespace roles {
    function verifiedTelemetry(): VerifiedTelemetryRole
}

// Service: Vibration motor
declare class VibrationMotorRole extends Role {
    vibrate(duration: number, intensity: number): void
}
declare namespace roles {
    function vibrationMotor(): VibrationMotorRole
}

// Service: Water level
declare enum WaterLevelVariant { // uint8_t
    Resistive = 0x1,
    ContactPhotoElectric = 0x2,
    NonContactPhotoElectric = 0x3,
}

declare class WaterLevelRole extends SensorRole {
    level: JDRegisterNum
    levelError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function waterLevel(): WaterLevelRole
}

// Service: Weight Scale
declare enum WeightScaleVariant { // uint8_t
    Body = 0x1,
    Food = 0x2,
    Jewelry = 0x3,
}

declare class WeightScaleRole extends SensorRole {
    weight: JDRegisterNum
    weightError: JDRegisterNum
    zeroOffset: JDRegisterNum
    gain: JDRegisterNum
    maxWeight: JDRegisterNum
    minWeight: JDRegisterNum
    weightResolution: JDRegisterNum
    variant: JDRegisterNum
    calibrateZeroOffset(): void
    calibrateGain(weight: number): void
}
declare namespace roles {
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
    lastScanResults(results: number): void
    addNetwork(ssid: string, password: string): void
    reconnect(): void
    forgetNetwork(ssid: string): void
    forgetAllNetworks(): void
    setNetworkPriority(priority: number, ssid: string): void
    scan(): void
    listKnownNetworks(results: number): void
    rssi: JDRegisterNum
    enabled: JDRegisterNum
    ipAddress: JDRegisterNum
    eui48: JDRegisterNum
    ssid: JDRegisterString
    gotIp: JDEvent
    lostIp: JDEvent
    scanComplete: JDEvent
    networksChanged: JDEvent
    connectionFailed: JDEvent
}
declare namespace roles {
    function wifi(): WifiRole
}

// Service: Wind direction
declare class WindDirectionRole extends SensorRole {
    windDirection: JDRegisterNum
    windDirectionError: JDRegisterNum
}
declare namespace roles {
    function windDirection(): WindDirectionRole
}

// Service: Wind speed
declare class WindSpeedRole extends SensorRole {
    windSpeed: JDRegisterNum
    windSpeedError: JDRegisterNum
    maxWindSpeed: JDRegisterNum
}
declare namespace roles {
    function windSpeed(): WindSpeedRole
}

