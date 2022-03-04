# WIFI

    identifier: 0x18aae1fa
    camel: wifi
    group: iot
    status: rc

Discovery and connection to WiFi networks. Separate TCP service can be used for data transfer.

## Connection

The device controlled by this service is meant to connect automatically, once configured.
To that end, it keeps a list of known WiFi networks, with priorities and passwords.
It will connect to the available network with numerically highest priority,
breaking ties in priority by signal strength (typically all known networks have priority of `0`).
If the connection fails (due to wrong password, radio failure, or other problem)
an `connection_failed` event is emitted, and the device will try to connect to the next eligible network.
When networks are exhausted, the scan is performed again and the connection process restarts.

Updating networks (setting password, priorties, forgetting) does not trigger an automatic reconnect.

## Captive portals

If the Wifi is not able to join an AP because it needs to receive a password, it may decide to enter a mode 
where it waits for user input. Typical example of this mode would be a captive portal or waiting for a BLE interaction.
In that situation, the `status_code` should set to `WaitingForInput`.

## Commands

    flags APFlags : u32 {
        HasPassword = 0x0001
        WPS = 0x0002
        HasSecondaryChannelAbove = 0x0004
        HasSecondaryChannelBelow = 0x0008
        IEEE_802_11B = 0x0100
        IEEE_802_11A = 0x0200
        IEEE_802_11G = 0x0400
        IEEE_802_11N = 0x0800
        IEEE_802_11AC = 0x1000
        IEEE_802_11AX = 0x2000
        IEEE_802_LongRange = 0x8000
    }
    command last_scan_results @ 0x80 {
        results: pipe
    }
    pipe report results {
        flags: APFlags
        reserved: u32
        rssi: i8 dB {typical_min = -100, typical_max = -20}
        channel: u8 {typical_min = 1, typical_max = 13}
        bssid: u8[6]
        ssid: string {max_bytes = 33}
    }

Return list of WiFi network from the last scan.
Scans are performed periodically while not connected (in particular, on startup and after current connection drops),
as well as upon `reconnect` and `scan` commands.

    command add_network @ 0x81 {
        ssid: string0
        password?: string0
    }

Automatically connect to named network if available. Also set password if network is not open.

    command reconnect @ 0x82 {}

Enable the WiFi (if disabled), initiate a scan, wait for results, disconnect from current WiFi network if any,
and then reconnect (using regular algorithm, see `set_network_priority`).

    command forget_network @ 0x83 {
        ssid: string
    }

Prevent from automatically connecting to named network in future.
Forgetting a network resets its priority to `0`.

    command forget_all_networks @ 0x84 {}

Clear the list of known networks.

    command set_network_priority @ 0x85 {
        priority: i16
        ssid: string
    }

Set connection priority for a network.
By default, all known networks have priority of `0`.

    command scan @ 0x86 {}

Initiate search for WiFi networks. Generates `scan_complete` event.

    command list_known_networks @ 0x87 {
        results: pipe
    }
    pipe report network_results {
        priority: i16
        flags: i16
        ssid: string
    }

Return list of known WiFi networks.
`flags` is currently always 0.

## Registers

    ro rssi: i8 dB {typical_min = -128, typical_max = -20} @ reading

Current signal strength. Returns -128 when not connected.

    rw enabled: bool @ intensity

Determines whether the WiFi radio is enabled. It starts enabled upon reset.

    ro ip_address: bytes {max_bytes = 16} @ 0x181

0, 4 or 16 byte buffer with the IPv4 or IPv6 address assigned to device if any.

    const eui_48: bytes {max_bytes = 6} @ 0x182

The 6-byte MAC address of the device. If a device does MAC address randomization it will have to "restart".

    ro ssid: string {max_bytes = 32} @ 0x183

SSID of the access-point to which device is currently connected.
Empty string if not connected.

## Events

    event got_ip @ active

Emitted upon successful join and IP address assignment.

    event lost_ip @ inactive

Emitted when disconnected from network.

    event scan_complete @ 0x80 {
        num_networks: u16
        num_known_networks: u16
    }

A WiFi network scan has completed. Results can be read with the `last_scan_results` command.
The event indicates how many networks where found, and how many are considered
as candidates for connection.

    event networks_changed @ 0x81

Emitted whenever the list of known networks is updated.

    event connection_failed @ 0x82 {
        ssid: string
    }

Emitted when when a network was detected in scan, the device tried to connect to it
and failed.
This may be because of wrong password or other random failure.
