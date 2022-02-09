# Verified Telemetry

    identifier: 0x2194841f
    status: experimental

A mixin service that exposes verified telemetry information for a sensor (see https://github.com/Azure/Verified-Telemetry/tree/main/PnPModel).

## Registers

    enum Status : u8 {
        Unknown = 0
        Working = 1
        Faulty = 2        
    }
    ro telemetry_status: Status @ 0x180
    
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

    ro fingerprint_template @ 0x182 {
        confidence: u16 %
        template: bytes
    }

Template Fingerprint information of a working sensor.

## Commands

    command reset_fingerprint_template @ 0x080 {}

This command will clear the template fingerprint of a sensor and collect a new template fingerprint of the attached sensor.

    unique command retrain_fingerprint_template @ 0x081 {}

This command will append a new template fingerprint to the `fingerprintTemplate`. Appending more fingerprints will increase the accuracy in detecting the telemetry status.

## Events

    event telemetry_status_change @ change { 
        telemetry_status: Status
    }
    
The telemetry status of the device was updated.

    event fingerprint_template_change @ 0x80 { }
    
The fingerprint template was updated
