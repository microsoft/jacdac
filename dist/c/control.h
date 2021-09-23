// Autogenerated C header file for Control
#ifndef _JACDAC_SPEC_CONTROL_H
#define _JACDAC_SPEC_CONTROL_H 1

#define JD_SERVICE_CLASS_CONTROL  0x0

// enum AnnounceFlags (uint16_t)
#define JD_CONTROL_ANNOUNCE_FLAGS_RESTART_COUNTER_STEADY 0xf
#define JD_CONTROL_ANNOUNCE_FLAGS_RESTART_COUNTER1 0x1
#define JD_CONTROL_ANNOUNCE_FLAGS_RESTART_COUNTER2 0x2
#define JD_CONTROL_ANNOUNCE_FLAGS_RESTART_COUNTER4 0x4
#define JD_CONTROL_ANNOUNCE_FLAGS_RESTART_COUNTER8 0x8
#define JD_CONTROL_ANNOUNCE_FLAGS_STATUS_LIGHT_NONE 0x0
#define JD_CONTROL_ANNOUNCE_FLAGS_STATUS_LIGHT_MONO 0x10
#define JD_CONTROL_ANNOUNCE_FLAGS_STATUS_LIGHT_RGB_NO_FADE 0x20
#define JD_CONTROL_ANNOUNCE_FLAGS_STATUS_LIGHT_RGB_FADE 0x30
#define JD_CONTROL_ANNOUNCE_FLAGS_SUPPORTS_ACK 0x100
#define JD_CONTROL_ANNOUNCE_FLAGS_SUPPORTS_BROADCAST 0x200
#define JD_CONTROL_ANNOUNCE_FLAGS_SUPPORTS_FRAMES 0x400
#define JD_CONTROL_ANNOUNCE_FLAGS_IS_CLIENT 0x800

/**
 * No args. The `restart_counter` is computed from the `flags & RestartCounterSteady`, starts at `0x1` and increments by one until it reaches `0xf`, then it stays at `0xf`.
 * If this number ever goes down, it indicates that the device restarted.
 * `service_class` indicates class identifier for each service index (service index `0` is always control, so it's
 * skipped in this enumeration).
 * `packet_count` indicates the number of packets sent by the current device since last announce,
 * including the current announce packet (it is always 0 if this feature is not supported).
 * The command form can be used to induce report, which is otherwise broadcast every 500ms.
 */
#define JD_CONTROL_CMD_SERVICES JD_CMD_ANNOUNCE

/**
 * Report: 
 */
typedef struct jd_control_services_report {
    uint16_t flags;  // AnnounceFlags
    uint8_t packet_count;
    uint8_t reserved;
    uint32_t service_class[0];
} jd_control_services_report_t;


/**
 * No args. Do nothing. Always ignored. Can be used to test ACKs.
 */
#define JD_CONTROL_CMD_NOOP 0x80

/**
 * No args. Blink the status LED (262ms on, 262ms off, four times, with the blue LED) or otherwise draw user's attention to device with no status light. 
 * For devices with status light (this can be discovered in the announce flags), the client should
 * send the sequence of status light command to generate the identify animation.
 */
#define JD_CONTROL_CMD_IDENTIFY 0x81

/**
 * No args. Reset device. ACK may or may not be sent.
 */
#define JD_CONTROL_CMD_RESET 0x82

/**
 * The device will respond `num_responses` times, as fast as it can, setting the `counter` field in the report
 * to `start_counter`, then `start_counter + 1`, ..., and finally `start_counter + num_responses - 1`.
 * The `dummy_payload` is `size` bytes long and contains bytes `0, 1, 2, ...`.
 */
#define JD_CONTROL_CMD_FLOOD_PING 0x83
typedef struct jd_control_flood_ping {
    uint32_t num_responses;
    uint32_t start_counter;
    uint8_t size; // B
} jd_control_flood_ping_t;


/**
 * Report: 
 */
typedef struct jd_control_flood_ping_report {
    uint32_t counter;
    uint8_t dummy_payload[0];
} jd_control_flood_ping_report_t;


/**
 * Initiates a color transition of the status light from its current color to the one specified.
 * The transition will complete in about `512 / speed` frames
 * (each frame is currently 100ms, so speed of `51` is about 1 second and `26` 0.5 second).
 * As a special case, if speed is `0` the transition is immediate.
 * If MCU is not capable of executing transitions, it can consider `speed` to be always `0`.
 * If a monochrome LEDs is fitted, the average value of ``red``, ``green``, ``blue`` is used.
 * If intensity of a monochrome LED cannot be controlled, any value larger than `0` should be considered
 * on, and `0` (for all three channels) should be considered off.
 */
#define JD_CONTROL_CMD_SET_STATUS_LIGHT 0x84
typedef struct jd_control_set_status_light {
    uint8_t to_red;
    uint8_t to_green;
    uint8_t to_blue;
    uint8_t speed;
} jd_control_set_status_light_t;


/**
 * No args. Force device into proxy mode where Jacdac packets are forwarded but user code is not executed.
 */
#define JD_CONTROL_CMD_PROXY 0x85

/**
 * Read-write μs uint32_t. When set to value other than `0`, it asks the device to reset after specified number of microseconds.
 * This is typically used to implement watchdog functionality, where a brain device sets `reset_in` to
 * say 1.6s every 0.5s.
 */
#define JD_CONTROL_REG_RESET_IN 0x80

/**
 * Constant string (bytes). Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)
 */
#define JD_CONTROL_REG_DEVICE_DESCRIPTION 0x180

/**
 * Constant uint32_t. A numeric code for the string above; used to identify firmware images and devices.
 */
#define JD_CONTROL_REG_PRODUCT_IDENTIFIER 0x181

/**
 * Constant uint32_t. Typically the same as `product_identifier` unless device was flashed by hand; the bootloader will respond to that code.
 */
#define JD_CONTROL_REG_BOOTLOADER_PRODUCT_IDENTIFIER 0x184

/**
 * Constant string (bytes). A string describing firmware version; typically semver.
 */
#define JD_CONTROL_REG_FIRMWARE_VERSION 0x185

/**
 * Read-only °C int16_t. MCU temperature in degrees Celsius (approximate).
 */
#define JD_CONTROL_REG_MCU_TEMPERATURE 0x182

/**
 * Read-only μs uint64_t. Number of microseconds since boot.
 */
#define JD_CONTROL_REG_UPTIME 0x186

#endif
