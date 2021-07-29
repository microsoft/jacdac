namespace Jacdac {
    // Service: Azure IoT Hub
    public static class AzureIotHubConstants
    {
        public const uint ServiceClass = 0x19ed364c;
    }
    public enum AzureIotHubCmd {
        /**
         * Argument: body string (bytes). Sends a short message in string format (it's typically JSON-encoded).
         *
         * ```
         * const [body] = jdunpack<[string]>(buf, "s")
         * ```
         */
        SendMessage = 0x82,

        /**
         * No args. Try connecting using currently set `connection_string`.
         * The service normally periodically tries to connect automatically.
         */
        Connect = 0x80,

        /**
         * No args. Disconnect from current Hub if any.
         * This disables auto-connect behavior, until a `connect` command is issued.
         */
        Disconnect = 0x81,
    }

    public enum AzureIotHubReg {
        /**
         * Read-only string (bytes). Returns `"ok"` when connected, empty `""` when disconnected, and an error description otherwise.
         *
         * ```
         * const [connectionStatus] = jdunpack<[string]>(buf, "s")
         * ```
         */
        ConnectionStatus = 0x180,

        /**
         * Constant string (bytes). Something like `my-iot-hub.azure-devices.net`; empty string when not properly configured
         *
         * ```
         * const [hubName] = jdunpack<[string]>(buf, "s")
         * ```
         */
        HubName = 0x181,

        /**
         * Constant string (bytes). Something like `my-dev-007`; empty string when `connection_string` is not set.
         *
         * ```
         * const [deviceId] = jdunpack<[string]>(buf, "s")
         * ```
         */
        DeviceId = 0x182,
    }

    public enum AzureIotHubEvent {
        /**
         * Argument: body string (bytes). This event is emitted upon reception of a cloud to device message, that is a string
         * (doesn't contain NUL bytes) and fits in a single event packet.
         *
         * ```
         * const [body] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Message = 0x82,

        /**
         * Raised when the device is connected to the hub.
         */
        Connected = 0x80,

        /**
         * Raised when the device is disconnected to the hub. ``connection_status`` may contain information about the error.
         */
        Disconnected = 0x81,
    }

}
