// Service: Common registers and commands
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
    statusCode: JDRegisterArray & { code: number, vendor_code: number }
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

// Service: Air Pressure
declare class AirPressureRole extends SensorRole {
    pressure: JDRegisterNum
    pressureError: JDRegisterNum
}
declare namespace roles {
    function airPressure(): AirPressureRole
}

// Service: Arcade Gamepad
declare class ArcadeGamepadRole extends SensorRole {
    buttons: JDRegisterArray & { button: number, pressure: number }
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
declare class AzureIotHubHealthRole extends Role {
    hubName: JDRegisterString
    hubDeviceId: JDRegisterString
    connectionStatus: JDRegisterNum
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
declare class DCCurrentMeasurementRole extends SensorRole {
    measurementName: JDRegisterString
    measurement: JDRegisterNum
}
declare namespace roles {
    function dCCurrentMeasurement(): DCCurrentMeasurementRole
}

// Service: DC Voltage Measurement
declare class DCVoltageMeasurementRole extends SensorRole {
    measurementType: JDRegisterNum
    measurementName: JDRegisterString
    measurement: JDRegisterNum
}
declare namespace roles {
    function dCVoltageMeasurement(): DCVoltageMeasurementRole
}

// Service: Distance
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

// Service: Equivalent CO₂
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
declare class GamepadRole extends SensorRole {
    direction: JDRegisterArray & { buttons: number, x: number, y: number }
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
declare class HeartRateRole extends SensorRole {
    heartRate: JDRegisterNum
    heartRateError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function heartRate(): HeartRateRole
}

// Service: HID Keyboard
declare class HidKeyboardRole extends Role {
    key(selector: number, modifiers: number, action: number): void
    clear(): void
}
declare namespace roles {
    function hidKeyboard(): HidKeyboardRole
}

// Service: HID Mouse
declare class HidMouseRole extends Role {
    setButton(buttons: number, ev: number): void
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

// Service: Jacscript Cloud
declare class JacscriptCloudRole extends Role {
    upload(label: string, ...value: number[]): void
    getTwin(path: string): void
    ackCloudCommand(seq_no: number, status: number, ...result: number[]): void
    connected: JDRegisterNum
    cloudCommand: JDEvent
    twinChange: JDEvent
}
declare namespace roles {
    function jacscriptCloud(): JacscriptCloudRole
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
declare class LedRole extends Role {
    animate(to_red: number, to_green: number, to_blue: number, speed: number): void
    color: JDRegisterArray & { red: number, green: number, blue: number }
    maxPower: JDRegisterNum
    ledCount: JDRegisterNum
    waveLength: JDRegisterNum
    luminousIntensity: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function led(): LedRole
}

// Service: LED Display
declare class LedDisplayRole extends Role {
    pixels: JDRegisterNum
    brightness: JDRegisterNum
    actualBrightness: JDRegisterNum
    lightType: JDRegisterNum
    numPixels: JDRegisterNum
    numColumns: JDRegisterNum
    maxPower: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function ledDisplay(): LedDisplayRole
}

// Service: LED Strip
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
declare class LightLevelRole extends SensorRole {
    lightLevel: JDRegisterNum
    lightLevelError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function lightLevel(): LightLevelRole
}

// Service: Logger
declare class LoggerRole extends Role {
    minPriority: JDRegisterNum
}
declare namespace roles {
    function logger(): LoggerRole
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
    duty: JDRegisterNum
    enabled: JDRegisterNum
    loadTorque: JDRegisterNum
    loadSpeed: JDRegisterNum
    reversible: JDRegisterNum
}
declare namespace roles {
    function motor(): MotorRole
}

// Service: Potentiometer
declare class PotentiometerRole extends SensorRole {
    position: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function potentiometer(): PotentiometerRole
}

// Service: Power
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
declare class ReflectedLightRole extends SensorRole {
    brightness: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function reflectedLight(): ReflectedLightRole
}

// Service: Relay
declare class RelayRole extends Role {
    active: JDRegisterNum
    variant: JDRegisterNum
    maxSwitchingCurrent: JDRegisterNum
}
declare namespace roles {
    function relay(): RelayRole
}

// Service: Random Number Generator
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

// Service: Sensor Aggregator
declare class SensorAggregatorRole extends Role {
    inputs: JDRegisterArray & { sampling_interval: number, samples_in_window: number, reserved: number, device_id: number, service_class: number, service_num: number, sample_size: number, sample_type: number, sample_shift: number }
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
    currentAngle: JDRegisterNum
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
    setText(text: string): void
}
declare namespace roles {
    function sevenSegmentDisplay(): SevenSegmentDisplayRole
}

// Service: Soil moisture
declare class SoilMoistureRole extends SensorRole {
    moisture: JDRegisterNum
    moistureError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function soilMoisture(): SoilMoistureRole
}

// Service: Solenoid
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
declare class TcpRole extends Role {
    open(inbound: number): void
}
declare namespace roles {
    function tcp(): TcpRole
}

// Service: Temperature
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

// Service: Traffic Light
declare class TrafficLightRole extends Role {
    red: JDRegisterNum
    orange: JDRegisterNum
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

// Service: UV index
declare class UvIndexRole extends SensorRole {
    uvIndex: JDRegisterNum
    uvIndexError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function uvIndex(): UvIndexRole
}

// Service: Verified Telemetry
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
declare class WaterLevelRole extends SensorRole {
    level: JDRegisterNum
    levelError: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function waterLevel(): WaterLevelRole
}

// Service: Weight Scale
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

