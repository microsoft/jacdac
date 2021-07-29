namespace Jacdac {
    // Service: Base service
    public enum BaseReg {
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

    public enum BaseEvent {
        /**
         * Notifies that the status code of the service changed.
         *
         * ```
         * const [code, vendorCode] = jdunpack<[number, number]>(buf, "u16 u16")
         * ```
         */
        StatusCodeChanged = 0x4,
    }

}
