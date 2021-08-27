namespace Jacdac {
    // Service: Azure IoT Health
    public static class AzureIoTHealthConstants
    {
        public const uint ServiceClass = 0x1462eefc;
    }

    public enum AzureIoTHealthConnectionStatus: ushort { // uint16_t
        Connected = 0x0,
        Disconnected = 0x1,
        Connecting = 0x2,
        Disconnecting = 0x3,
    }

    public enum AzureIoTHealthReg {
        /**
         * Read-only string (bytes). Name of the connected hub, if any.
         *
         * ```
         * const [hub] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Hub = 0x180,

        /**
         * Read-only ConnectionStatus (uint16_t). Indicates the status of connection. A message beyond the [0..3] range represents an HTTP error code.
         *
         * ```
         * const [connectionStatus] = jdunpack<[AzureIoTHealthConnectionStatus]>(buf, "u16")
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

    public enum AzureIoTHealthCmd {
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
         * Argument: device_id uint64_t. Route an ``identify`` commands to the selected device
         *
         * ```
         * const [deviceId] = jdunpack<[number]>(buf, "u64")
         * ```
         */
        Identify = 0x83,

        /**
         * Argument: device_id uint64_t. Route a ``reset`` commands to the selected device
         *
         * ```
         * const [deviceId] = jdunpack<[number]>(buf, "u64")
         * ```
         */
        Reset = 0x84,

        /**
         * Argument: payload uint32_t. Commands the device to send a ``ping`` message to the hub with the given payload.
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


    public enum AzureIoTHealthEvent {
        /**
         * Raised when the twin model or reported values are modified.
         */
        TwinChange = 0x3,

        /**
         * Argument: connection_status ConnectionStatus (uint16_t). Raised when the connection status changes
         *
         * ```
         * const [connectionStatus] = jdunpack<[AzureIoTHealthConnectionStatus]>(buf, "u16")
         * ```
         */
        ConnectionStatusChange = 0x80,
    }

}
