namespace Jacdac {
    // Service: Azure IoT Hub Health
    public static class AzureIotHubHealthConstants
    {
        public const uint ServiceClass = 0x1462eefc;
    }

    public enum AzureIotHubHealthConnectionStatus: ushort { // uint16_t
        Connected = 0x0,
        Disconnected = 0x1,
        Connecting = 0x2,
        Disconnecting = 0x3,
    }

    public enum AzureIotHubHealthReg {
        /**
         * Read-only string (bytes). Something like `my-iot-hub.azure-devices.net`; empty string when not properly configured
         *
         * ```
         * const [hubName] = jdunpack<[string]>(buf, "s")
         * ```
         */
        HubName = 0x180,

        /**
         * Read-only ConnectionStatus (uint16_t). Indicates the status of connection. A message beyond the [0..3] range represents an HTTP error code.
         *
         * ```
         * const [connectionStatus] = jdunpack<[AzureIotHubHealthConnectionStatus]>(buf, "u16")
         * ```
         */
        ConnectionStatus = 0x181,

        /**
         * Reads internal statistics about messages sent to the hub.
         *
         * ```
         * const [reading, event, twinReported, twinDesired] = jdunpack<[number, number, number, number]>(buf, "u32 u32 u32 u32")
         * ```
         */
        Statistics = 0x182,
    }

    public enum AzureIotHubHealthCmd {
        /**
         * Argument: twin_report pipe (bytes). Returns the twin json payload
         *
         * ```
         * const [twinReport] = jdunpack<[Uint8Array]>(buf, "b[12]")
         * ```
         */
        Twin = 0x80,

        /**
         * No args. Starts a connection to the IoT hub service
         */
        Connect = 0x81,

        /**
         * No args. Starts disconnecting from the IoT hub service
         */
        Disconnect = 0x82,

        /**
         * Argument: payload uint32_t. Commands the device to send a `ping` message to the hub with the given payload.
         *
         * ```
         * const [payload] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        Ping = 0x85,

        /**
         * No args. Restricted command to override the existing connection string to the Azure IoT Hub.
         */
        SetConnectionString = 0x86,

        /**
         * report SetConnectionString
         * ```
         * const [connectionStringPort] = jdunpack<[number]>(buf, "u16")
         * ```
         */
    }


    /**
     * pipe_report TwinReport
     * ```
     * const [content] = jdunpack<[string]>(buf, "s")
     * ```
     */


    public enum AzureIotHubHealthEvent {
        /**
         * Raised when the twin model or reported values are modified.
         */
        TwinChange = 0x3,

        /**
         * Argument: connection_status ConnectionStatus (uint16_t). Raised when the connection status changes
         *
         * ```
         * const [connectionStatus] = jdunpack<[AzureIotHubHealthConnectionStatus]>(buf, "u16")
         * ```
         */
        ConnectionStatusChange = 0x80,
    }

}
