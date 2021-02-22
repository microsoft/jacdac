// Autogenerated C header file for Analog Button
#ifndef _JACDAC_SPEC_ANALOG_BUTTON_H
#define _JACDAC_SPEC_ANALOG_BUTTON_H 1

#define JD_SERVICE_CLASS_ANALOG_BUTTON  0x1865adc9

// enum Variant (uint8_t)
#define JD_ANALOG_BUTTON_VARIANT_PRESSURE 0x1
#define JD_ANALOG_BUTTON_VARIANT_CAPACITIVE 0x2

/**
 * Read-only ratio u0.16 (uint16_t). Indicates the current pressure (``force``) on the button.
 */
#define JD_ANALOG_BUTTON_REG_PRESSURE JD_REG_READING

/**
 * Read-write ratio u0.16 (uint16_t). Indicates the lower threshold for ``inactive`` events.
 */
#define JD_ANALOG_BUTTON_REG_INACTIVE_THRESHOLD JD_REG_LOW_THRESHOLD

/**
 * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``active`` events.
 */
#define JD_ANALOG_BUTTON_REG_ACTIVE_THRESHOLD JD_REG_HIGH_THRESHOLD

/**
 * Constant Variant (uint8_t). The type of physical button.
 */
#define JD_ANALOG_BUTTON_REG_VARIANT JD_REG_VARIANT

/**
 * Emitted when button goes from inactive (pressure less than threshold) to active.
 */
#define JD_ANALOG_BUTTON_EV_ACTIVE JD_EV_ACTIVE

/**
 * Emitted when button goes from active (pressure higher than threshold) to inactive.
 */
#define JD_ANALOG_BUTTON_EV_INACTIVE JD_EV_INACTIVE

#endif
