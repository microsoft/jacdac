// Service: Common registers and commands
declare class SystemRole extends Role {
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
    statusCode: JDRegisterArray
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
    statusCode: JDRegisterArray
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
    forces: JDRegisterArray
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

// Service: Arcade Gamepad
declare class ArcadeGamepadRole extends SensorRole {
    buttons: JDRegisterArray
    availableButtons: JDRegisterArray
    down: JDEvent
    up: JDEvent
}
declare namespace roles {
    function arcadeGamepad(): ArcadeGamepadRole
}

// Service: Arcade Sound
declare class ArcadeSoundRole extends Role {
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

// Service: Barometer
declare class BarometerRole extends SensorRole {
    pressure: JDRegisterNum
    pressureError: JDRegisterNum
}
declare namespace roles {
    function barometer(): BarometerRole
}

// Service: bit:radio
declare class BitRadioRole extends Role {
    enabled: JDRegisterNum
    group: JDRegisterNum
    transmissionPower: JDRegisterNum
    frequencyBand: JDRegisterNum
}
declare namespace roles {
    function bitRadio(): BitRadioRole
}

// Service: Bootloader
declare class BootloaderRole extends Role {
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
}
declare namespace roles {
    function buzzer(): BuzzerRole
}

// Service: Capacitive Button
declare class CapacitiveButtonRole extends Role {
    threshold: JDRegisterNum
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
    message: JDEvent
}
declare namespace roles {
    function codalMessageBus(): CodalMessageBusRole
}

// Service: Color
declare class ColorRole extends SensorRole {
    color: JDRegisterArray
}
declare namespace roles {
    function color(): ColorRole
}

// Service: Compass
declare class CompassRole extends SensorRole {
    heading: JDRegisterNum
    enabled: JDRegisterNum
    headingError: JDRegisterNum
}
declare namespace roles {
    function compass(): CompassRole
}

// Service: Control
declare class ControlRole extends Role {
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
    direction: JDRegisterArray
    variant: JDRegisterNum
    buttonsAvailable: JDRegisterNum
    buttonsChanged: JDEvent
}
declare namespace roles {
    function gamepad(): GamepadRole
}

// Service: Gyroscope
declare class GyroscopeRole extends SensorRole {
    rotationRates: JDRegisterArray
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
}
declare namespace roles {
    function hidKeyboard(): HidKeyboardRole
}

// Service: HID Mouse
declare class HidMouseRole extends Role {
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
    brightness: JDRegisterNum
    palette: JDRegisterArray
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

// Service: LED
declare class LedRole extends Role {
    color: JDRegisterArray
    maxPower: JDRegisterNum
    ledCount: JDRegisterNum
    waveLength: JDRegisterNum
    luminousIntensity: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function led(): LedRole
}

// Service: LED Pixel
declare class LedPixelRole extends Role {
    brightness: JDRegisterNum
    actualBrightness: JDRegisterNum
    lightType: JDRegisterNum
    numPixels: JDRegisterNum
    numColumns: JDRegisterNum
    maxPower: JDRegisterNum
    maxPixels: JDRegisterNum
    numRepeats: JDRegisterNum
    variant: JDRegisterNum
}
declare namespace roles {
    function ledPixel(): LedPixelRole
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
    forces: JDRegisterArray
    forcesError: JDRegisterNum
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
    samplingPeriod: JDRegisterNum
}
declare namespace roles {
    function microphone(): MicrophoneRole
}

// Service: MIDI output
declare class MidiOutputRole extends Role {
    enabled: JDRegisterNum
}
declare namespace roles {
    function midiOutput(): MidiOutputRole
}

// Service: Model Runner
declare class ModelRunnerRole extends Role {
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
    powerStatusChanged: JDEvent
}
declare namespace roles {
    function power(): PowerRole
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
    rwI8U8U16I32: JDRegisterArray
    roI8U8U16I32: JDRegisterArray
    rwU8String: JDRegisterArray
    roU8String: JDRegisterArray
    eBool: JDEvent
    eU32: JDEvent
    eI32: JDEvent
    eString: JDEvent
    eBytes: JDEvent
    eI8U8U16I32: JDEvent
    eU8String: JDEvent
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
    localTime: JDRegisterArray
    drift: JDRegisterNum
    precision: JDRegisterNum
    variant: JDRegisterNum
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
    closed: JDRegisterNum
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
    kinematics: JDRegisterArray
}
declare namespace roles {
    function rover(): RoverRole
}

// Service: Sensor Aggregator
declare class SensorAggregatorRole extends Role {
    inputs: JDRegisterArray
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
}
declare namespace roles {
    function soundPlayer(): SoundPlayerRole
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
}
declare namespace roles {
    function speechSynthesis(): SpeechSynthesisRole
}

// Service: Switch
declare class SwitchRole extends SensorRole {
    active: JDRegisterNum
    variant: JDRegisterNum
    autoOffDelay: JDRegisterNum
    on: JDEvent
    off: JDEvent
}
declare namespace roles {
    function switch_(): SwitchRole
}

// Service: TCP
declare class TcpRole extends Role {
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
    fingerprintTemplate: JDRegisterArray
    telemetryStatusChange: JDEvent
    fingerprintTemplateChange: JDEvent
}
declare namespace roles {
    function verifiedTelemetry(): VerifiedTelemetryRole
}

// Service: Vibration motor
declare class VibrationMotorRole extends Role {
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
}
declare namespace roles {
    function weightScale(): WeightScaleRole
}

// Service: WIFI
declare class WifiRole extends Role {
    enabled: JDRegisterNum
    ipAddress: JDRegisterNum
    eui48: JDRegisterNum
    ssid: JDRegisterString
    rssi: JDRegisterNum
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

