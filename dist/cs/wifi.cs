namespace Jacdac {
    // Service: WIFI
    public static class WifiConstants
    {
        public const uint ServiceClass = 0x18aae1fa;
    }

    public enum WifiAPFlags: uint { // uint32_t
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

    public enum WifiCmd {
        /**
         * Argument: results pipe (bytes). Return list of WiFi network from the last scan.
         * Scans are performed periodically while not connected (in particular, on startup and after current connection drops),
         * as well as upon `reconnect` and `scan` commands.
         *
         * ```
         * const [results] = jdunpack<[Uint8Array]>(buf, "b[12]")
         * ```
         */
        LastScanResults = 0x80,

        /**
         * Automatically connect to named network if available. Also set password if network is not open.
         *
         * ```
         * const [ssid, password] = jdunpack<[string, string]>(buf, "z z")
         * ```
         */
        AddNetwork = 0x81,

        /**
         * No args. Initiate a scan, wait for results, disconnect from current WiFi network if any,
         * and then reconnect (using regular algorithm, see `set_network_priority`).
         */
        Reconnect = 0x82,

        /**
         * Argument: ssid string (bytes). Prevent from automatically connecting to named network in future.
         * Forgetting a network resets its priority to `0`.
         *
         * ```
         * const [ssid] = jdunpack<[string]>(buf, "s")
         * ```
         */
        ForgetNetwork = 0x83,

        /**
         * No args. Clear the list of known networks.
         */
        ForgetAllNetworks = 0x84,

        /**
         * Set connection priority for a network.
         * By default, all known networks have priority of `0`.
         *
         * ```
         * const [priority, ssid] = jdunpack<[number, string]>(buf, "i16 s")
         * ```
         */
        SetNetworkPriority = 0x85,

        /**
         * No args. Initiate search for WiFi networks. Generates `scan_complete` event.
         */
        Scan = 0x86,

        /**
         * Argument: results pipe (bytes). Return list of known WiFi networks.
         * `flags` is currently always 0.
         *
         * ```
         * const [results] = jdunpack<[Uint8Array]>(buf, "b[12]")
         * ```
         */
        ListKnownNetworks = 0x87,
    }


    /**
     * pipe_report Results
     * ```
     * const [flags, rssi, channel, bssid, ssid] = jdunpack<[WifiAPFlags, number, number, Uint8Array, string]>(buf, "u32 x[4] i8 u8 b[6] s[33]")
     * ```
     */

    /**
     * pipe_report NetworkResults
     * ```
     * const [priority, flags, ssid] = jdunpack<[number, number, string]>(buf, "i16 i16 s")
     * ```
     */


    public enum WifiReg {
        /**
         * Read-write bool (uint8_t). Determines whether the WiFi radio is enabled. It starts enabled upon reset.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-only bool (uint8_t). Indicates whether or not we currently have an IP address assigned.
         *
         * ```
         * const [connected] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Connected = 0x180,

        /**
         * Read-only bytes. 0, 4 or 16 byte buffer with the IPv4 or IPv6 address assigned to device if any.
         *
         * ```
         * const [ipAddress] = jdunpack<[Uint8Array]>(buf, "b[16]")
         * ```
         */
        IpAddress = 0x181,

        /**
         * Constant bytes. The 6-byte MAC address of the device. If a device does MAC address randomization it will have to "restart".
         *
         * ```
         * const [eui48] = jdunpack<[Uint8Array]>(buf, "b[6]")
         * ```
         */
        Eui48 = 0x182,

        /**
         * Read-only string (bytes). SSID of the access-point to which device is currently connected.
         * Empty string if not connected.
         *
         * ```
         * const [ssid] = jdunpack<[string]>(buf, "s[32]")
         * ```
         */
        Ssid = 0x183,
    }

    public enum WifiEvent {
        /**
         * Emitted upon successful join and IP address assignment.
         */
        GotIp = 0x1,

        /**
         * Emitted when disconnected from network.
         */
        LostIp = 0x2,

        /**
         * A WiFi network scan has completed. Results can be read with the `last_scan_results` command.
         * The event indicates how many networks where found, and how many are considered
         * as candidates for connection.
         *
         * ```
         * const [numNetworks, numKnownNetworks] = jdunpack<[number, number]>(buf, "u16 u16")
         * ```
         */
        ScanComplete = 0x80,

        /**
         * Emitted whenever the list of known networks is updated.
         */
        NetworksChanged = 0x81,
    }

}
