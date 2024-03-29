// Autogenerated C header file for Magnetic field level
#ifndef _JACDAC_SPEC_MAGNETIC_FIELD_LEVEL_H
#define _JACDAC_SPEC_MAGNETIC_FIELD_LEVEL_H 1

#define JD_SERVICE_CLASS_MAGNETIC_FIELD_LEVEL  0x12fe180f

// enum Variant (uint8_t)
#define JD_MAGNETIC_FIELD_LEVEL_VARIANT_ANALOG_NS 0x1
#define JD_MAGNETIC_FIELD_LEVEL_VARIANT_ANALOG_N 0x2
#define JD_MAGNETIC_FIELD_LEVEL_VARIANT_ANALOG_S 0x3
#define JD_MAGNETIC_FIELD_LEVEL_VARIANT_DIGITAL_NS 0x4
#define JD_MAGNETIC_FIELD_LEVEL_VARIANT_DIGITAL_N 0x5
#define JD_MAGNETIC_FIELD_LEVEL_VARIANT_DIGITAL_S 0x6

/**
 * Read-only ratio i1.15 (int16_t). Indicates the strength of magnetic field between -1 and 1.
 * When no magnet is present the value should be around 0.
 * For analog sensors,
 * when the north pole of the magnet is on top of the module
 * and closer than south pole, then the value should be positive.
 * For digital sensors,
 * the value should either `0` or `1`, regardless of polarity.
 */
#define JD_MAGNETIC_FIELD_LEVEL_REG_STRENGTH JD_REG_READING

/**
 * Read-only bool (uint8_t). Determines if the magnetic field is present.
 * If the event `active` is observed, `detected` is true; if `inactive` is observed, `detected` is false.
 */
#define JD_MAGNETIC_FIELD_LEVEL_REG_DETECTED 0x181

/**
 * Constant Variant (uint8_t). Determines which magnetic poles the sensor can detected,
 * and whether or not it can measure their strength or just presence.
 */
#define JD_MAGNETIC_FIELD_LEVEL_REG_VARIANT JD_REG_VARIANT

/**
 * Emitted when strong-enough magnetic field is detected.
 */
#define JD_MAGNETIC_FIELD_LEVEL_EV_ACTIVE JD_EV_ACTIVE

/**
 * Emitted when strong-enough magnetic field is no longer detected.
 */
#define JD_MAGNETIC_FIELD_LEVEL_EV_INACTIVE JD_EV_INACTIVE

#endif
