// Autogenerated C header file for Reflected light
#ifndef _JACDAC_SPEC_REFLECTED_LIGHT_H
#define _JACDAC_SPEC_REFLECTED_LIGHT_H 1

#define JD_SERVICE_CLASS_REFLECTED_LIGHT  0x126c4cb2

// enum Variant (uint8_t)
#define JD_REFLECTED_LIGHT_VARIANT_INFRARED_DIGITAL 0x1
#define JD_REFLECTED_LIGHT_VARIANT_INFRARED_ANALOG 0x2

/**
 * Read-only ratio uint16_t. Reports the reflected brightness. It may be a digital value or, for some sensor, analog value.
 */
#define JD_REFLECTED_LIGHT_REG_BRIGHTNESS JD_REG_READING

/**
 * Constant Variant (uint8_t). Type of physical sensor used
 */
#define JD_REFLECTED_LIGHT_REG_VARIANT JD_REG_VARIANT

/**
 * The sensor detected a transition from light to dark
 */
#define JD_REFLECTED_LIGHT_EV_DARK JD_EV_INACTIVE

/**
 * The sensor detected a transition from dark to light
 */
#define JD_REFLECTED_LIGHT_EV_LIGHT JD_EV_ACTIVE

#endif
