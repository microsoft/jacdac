// Autogenerated C header file for Pressure Button
#ifndef _JACDAC_SPEC_PRESSURE_BUTTON_H
#define _JACDAC_SPEC_PRESSURE_BUTTON_H 1

#define JD_SERVICE_CLASS_PRESSURE_BUTTON  0x181740c3

/**
 * Read-write ratio u0.16 (uint16_t). Indicates the lower threshold for ``down`` events.
 */
#define JD_PRESSURE_BUTTON_REG_DOWN_THRESHOLD JD_REG_INACTIVE_THRESHOLD

/**
 * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``up`` events.
 */
#define JD_PRESSURE_BUTTON_REG_UP_THRESHOLD JD_REG_ACTIVE_THRESHOLD

#endif
