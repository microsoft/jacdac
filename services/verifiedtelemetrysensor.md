# Dependable Sensor

    identifier: 0x2194841f

A mixin service that exposes verified telemetry information for a sensor (see https://github.com/Azure/Verified-Telemetry/tree/main/PnPModel).

## Registers

    enum FingerprintTemplateConfidence : u8 {
        High = 100
        Medium = 50
        Low = 0
    }

    ro telemetry @ 0x180 {
        status: bool
        confidence: FingerprintTemplateConfidence
    }
    
Reads the telemetry working status, where ``true`` is working and ``false`` is faulty.

    rw telemetry_status_interval?: u32 ms @ 0x080

Specifies the interval between computing the fingerprint information.

    enum FingerprintType: u8 {
        FallCurve = 1
        CurrentSense = 2
        Custom = 3
    }

    const fingerprint_type: FingerprintType @ 0x181

Type of the fingerprint.

    const fingerprint_template @ 0x182 {
        repeats:
            property: string0
            value: string0
    }

Template Fingerprint information of a working sensor.

## Commands

    command reset_fingerprint_template @ 0x080 {}

This command will clear the template fingerprint of a sensor and collect a new template fingerprint of the attached sensor.

    command retrain_fingerprint_template @ 0x081 {}

This command will append a new template fingerprint to the `fingerprintTemplate`. Appending more fingerprints will increase the accuracy in detecting the telemetry status.
