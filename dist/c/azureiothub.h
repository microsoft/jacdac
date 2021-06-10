// Autogenerated C header file for Azure IoT Hub
#ifndef _JACDAC_SPEC_AZURE_IOT_HUB_H
#define _JACDAC_SPEC_AZURE_IOT_HUB_H 1

#define JD_SERVICE_CLASS_AZURE_IOT_HUB  0x19ed364c

/**
 * Argument: body string (bytes). Sends a short message in string format (it's typically JSON-encoded).
 */
#define JD_AZURE_IOT_HUB_CMD_SEND_MESSAGE 0x82

/**
 * Report: No args
 */

/**
 * No args. Try connecting using currently set `connection_string`.
 * The service normally periodically tries to connect automatically.
 */
#define JD_AZURE_IOT_HUB_CMD_CONNECT 0x80

/**
 * No args. Disconnect from current Hub if any.
 * This disables auto-connect behavior, until a `connect` command is issued.
 */
#define JD_AZURE_IOT_HUB_CMD_DISCONNECT 0x81

/**
 * Read-only string (bytes). Returns `"ok"` when connected, empty `""` when disconnected, and an error description otherwise.
 */
#define JD_AZURE_IOT_HUB_REG_CONNECTION_STATUS 0x180

/**
 * Constant string (bytes). Something like `my-iot-hub.azure-devices.net`; empty string when not properly configured
 */
#define JD_AZURE_IOT_HUB_REG_HUB_NAME 0x181

/**
 * Constant string (bytes). Something like `my-dev-007`; empty string when `connection_string` is not set.
 */
#define JD_AZURE_IOT_HUB_REG_DEVICE_ID 0x182

/**
 * Argument: body string (bytes). This event is emitted upon reception of a cloud to device message, that is a string
 * (doesn't contain NUL bytes) and fits in a single event packet.
 */
#define JD_AZURE_IOT_HUB_EV_MESSAGE 0x82

/**
 * Raised when the device is connected to the hub.
 */
#define JD_AZURE_IOT_HUB_EV_CONNECTED 0x80

/**
 * Raised when the device is disconnected to the hub. ``connection_status`` may contain information about the error.
 */
#define JD_AZURE_IOT_HUB_EV_DISCONNECTED 0x81

#endif
