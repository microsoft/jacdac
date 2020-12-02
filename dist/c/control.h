// Autogenerated C header file for Control
#ifndef _JACDAC_SPEC_CTRL_H
#define _JACDAC_SPEC_CTRL_H 1

#define JD_SERVICE_CLASS_CTRL  0x0

// enum AnnounceFlags (uint8_t)
#define JD_CTRL_ANNOUNCE_FLAGS_SUPPORTS_ACK 0x1

/**
 * No args. The `restart_counter` starts at `0x1` and increments by one until it reaches `0xf`, then it stays at `0xf`.
 * If this number ever goes down, it indicates that the device restarted.
 * The upper 4 bits of `restart_counter` are reserved.
 * `service_class` indicates class identifier for each service index (service index `0` is always control, so it's
 * skipped in this enumeration).
 * The command form can be used to induce report, which is otherwise broadcast every 500ms.
 */
#define JD_CTRL_CMD_SERVICES JD_CMD_ANNOUNCE

/**
 * Report: 
 */
typedef struct jd_ctrl_services_report {
    uint8_t restart_counter;
    uint8_t flags;  // AnnounceFlags
    uint16_t reserved;
    uint32_t service_class[0];
} jd_ctrl_services_report_t;


/**
 * No args. Do nothing. Always ignored. Can be used to test ACKs.
 */
#define JD_CTRL_CMD_NOOP 0x80

/**
 * No args. Blink an LED or otherwise draw user's attention.
 */
#define JD_CTRL_CMD_IDENTIFY 0x81

/**
 * No args. Reset device. ACK may or may not be sent.
 */
#define JD_CTRL_CMD_RESET 0x82

/**
 * Constant string (bytes). Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)
 */
#define JD_CTRL_REG_DEVICE_DESCRIPTION 0x180

/**
 * Constant uint32_t. A numeric code for the string above; used to identify firmware images and devices.
 */
#define JD_CTRL_REG_FIRMWARE_IDENTIFIER 0x181

/**
 * Constant uint32_t. Typically the same as `firmware_identifier` unless device was flashed by hand; the bootloader will respond to that code.
 */
#define JD_CTRL_REG_BOOTLOADER_FIRMWARE_IDENTIFIER 0x184

/**
 * Constant string (bytes). A string describing firmware version; typically semver.
 */
#define JD_CTRL_REG_FIRMWARE_VERSION 0x185

/**
 * Read-only °C int16_t. MCU temperature in degrees Celsius (approximate).
 */
#define JD_CTRL_REG_MCU_TEMPERATURE 0x182

/**
 * Read-only μs uint64_t. Number of microseconds since boot.
 */
#define JD_CTRL_REG_UPTIME 0x186

/**
 * Constant string (bytes). Request the information web site for this device
 */
#define JD_CTRL_REG_DEVICE_URL 0x187

/**
 * Constant string (bytes). URL with machine-readable metadata information about updating device firmware
 */
#define JD_CTRL_REG_FIRMWARE_URL 0x188

#endif
