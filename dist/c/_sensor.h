// Autogenerated C header file for Sensor
#ifndef _JACDAC_SPEC_SENSOR_H
#define _JACDAC_SPEC_SENSOR_H 1

#define JD_SERVICE_CLASS_SENSOR  0x1ffffff2

/**
 * Read-write # uint8_t. Asks device to stream a given number of samples
 * (clients will typically write `255` to this register every second or so, while streaming is required).
 */

/**
 * Read-write ms uint32_t. Period between packets of data when streaming in milliseconds.
 */

/**
 * Constant ms uint32_t. Preferred default streaming interval for sensor in milliseconds.
 */

#endif
