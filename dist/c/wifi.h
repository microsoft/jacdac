// Autogenerated C header file for WIFI
#ifndef _JACDAC_SPEC_WIFI_H
#define _JACDAC_SPEC_WIFI_H 1

#define JD_SERVICE_CLASS_WIFI  0x18aae1fa

// enum APFlags (uint32_t)
#define JD_WIFI_APFLAGS_HAS_PASSWORD 0x1
#define JD_WIFI_APFLAGS_WPS 0x2
#define JD_WIFI_APFLAGS_HAS_SECONDARY_CHANNEL_ABOVE 0x4
#define JD_WIFI_APFLAGS_HAS_SECONDARY_CHANNEL_BELOW 0x8
#define JD_WIFI_APFLAGS_IEEE_802_11B 0x100
#define JD_WIFI_APFLAGS_IEEE_802_11A 0x200
#define JD_WIFI_APFLAGS_IEEE_802_11G 0x400
#define JD_WIFI_APFLAGS_IEEE_802_11N 0x800
#define JD_WIFI_APFLAGS_IEEE_802_11AC 0x1000
#define JD_WIFI_APFLAGS_IEEE_802_11AX 0x2000
#define JD_WIFI_APFLAGS_IEEE_802_LONG_RANGE 0x8000

/**
 * Argument: results pipe (bytes). Initiate search for WiFi networks. Results are returned via pipe, one entry per packet.
 */
#define JD_WIFI_CMD_SCAN 0x80

/**
 * Initiate search for WiFi networks. Results are returned via pipe, one entry per packet.
 */
typedef struct jd_wifi_results {
    uint32_t flags;  // APFlags
    uint32_t reserved;
    int8_t rssi; // dB
    uint8_t channel;
    uint8_t bssid[6];  // u8[6]
    char ssid[33];  // string
} jd_wifi_results_t;


/**
 * Connect to named network.
 */
#define JD_WIFI_CMD_CONNECT 0x81
typedef struct jd_wifi_connect {
    char ssid[0];  // string0
    // char password[0];  // string0
} jd_wifi_connect_t;


/**
 * No args. Disconnect from current WiFi network if any.
 */
#define JD_WIFI_CMD_DISCONNECT 0x82

/**
 * Read-only bool (uint8_t). Indicates whether or not we currently have an IP address assigned.
 */
#define JD_WIFI_REG_CONNECTED 0x180

/**
 * Emitted upon successful join and IP address assignment.
 */
#define JD_WIFI_EV_GOT_IP JD_EV_ACTIVE

/**
 * Emitted when disconnected from network.
 */
#define JD_WIFI_EV_LOST_IP JD_EV_INACTIVE

#endif
