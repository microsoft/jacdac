namespace Jacdac {
    // Service: Verified Telemetry
    public static class VerifiedTelemetryConstants
    {
        public const uint ServiceClass = 0x2194841f;
    }

    public enum VerifiedTelemetryStatus { // uint8_t
        Unknown = 0x0,
        Working = 0x1,
        Faulty = 0x2,
    }


    public enum VerifiedTelemetryFingerprintType { // uint8_t
        FallCurve = 0x1,
        CurrentSense = 0x2,
        Custom = 0x3,
    }

    public enum VerifiedTelemetryReg {
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

    public enum VerifiedTelemetryCmd {
        /**
         * No args. This command will clear the template fingerprint of a sensor and collect a new template fingerprint of the attached sensor.
         */
        ResetFingerprintTemplate = 0x80,

        /**
         * No args. This command will append a new template fingerprint to the `fingerprintTemplate`. Appending more fingerprints will increase the accuracy in detecting the telemetry status.
         */
        RetrainFingerprintTemplate = 0x81,
    }

    public enum VerifiedTelemetryEvent {
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

}
