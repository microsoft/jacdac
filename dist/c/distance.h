// Autogenerated C header file for Distance
#ifndef _JACDAC_SPEC_DISTANCE_H
#define _JACDAC_SPEC_DISTANCE_H 1

#define JD_SERVICE_CLASS_DISTANCE  0x141a6b8a

// enum Variant (uint8_t)
#define JD_DISTANCE_VARIANT_ULTRASONIC 0x1
#define JD_DISTANCE_VARIANT_INFRARED 0x2
#define JD_DISTANCE_VARIANT_LI_DAR 0x3
#define JD_DISTANCE_VARIANT_LASER 0x4

/**
 * Read-only m u16.16 (uint32_t). Current distance from the object
 */
#define JD_DISTANCE_REG_DISTANCE JD_REG_READING

/**
 * Read-only m u16.16 (uint32_t). Absolute error on the reading value.
 */
#define JD_DISTANCE_REG_DISTANCE_ERROR JD_REG_READING_ERROR

/**
 * Constant m u16.16 (uint32_t). Minimum measurable distance
 */
#define JD_DISTANCE_REG_MIN_RANGE JD_REG_MIN_READING

/**
 * Constant m u16.16 (uint32_t). Maximum measurable distance
 */
#define JD_DISTANCE_REG_MAX_RANGE JD_REG_MAX_READING

/**
 * Constant Variant (uint8_t). Determines the type of sensor used.
 */
#define JD_DISTANCE_REG_VARIANT JD_REG_VARIANT

#endif
