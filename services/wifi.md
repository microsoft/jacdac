# WIFI

    identifier: 0x18aae1fa
    camel: wifi
    tags: iot

Discovery and connection to WiFi networks. Separate TCP service is used for data transfer.

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
    command scan @ 0x80 {
        results: pipe
    }
    pipe report results {
        flags: APFlags
        reserved: u32
        rssi: i8 dB {typical_min = -100, typical_max = -20}
        channel: u8 {typical_min = 1, typical_max = 13}
        bssid: u8[6]
        ssid: string { max_bytes = 33}
    }

Initiate search for WiFi networks. Results are returned via pipe, one entry per packet.

    command connect @ 0x81 {
        ssid: string0
        password?: string0
    }

Connect to named network.

    command disconnect @ 0x82 {}

Disconnect from current WiFi network if any.

## Registers

    ro connected: bool @ 0x180

Indicates whether or not we currently have an IP address assigned.

## Events

    event got_ip @ active

Emitted upon successful join and IP address assignment.

    event lost_ip @ inactive

Emitted when disconnected from network.
