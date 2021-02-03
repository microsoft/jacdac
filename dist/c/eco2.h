// Autogenerated C header file for Equivalent CO²
#ifndef _JACDAC_SPEC_E_CO2_H
#define _JACDAC_SPEC_E_CO2_H 1

#define JD_SERVICE_CLASS_E_CO2  0x169c9dc6

// enum Variant (uint8_t)
#define JD_E_CO2_VARIANT_VOC 0x1
#define JD_E_CO2_VARIANT_NDIR 0x2

/**
 * Read-only ppm u22.10 (uint32_t). Equivalent CO² (eCO²) readings.
 */
#define JD_E_CO2_REG_E_CO2 JD_REG_READING

/**
 * Read-only ppm u22.10 (uint32_t). Error on the reading value.
 */
#define JD_E_CO2_REG_E_CO2_ERROR JD_REG_READING_ERROR

/**
 * Constant ppm u22.10 (uint32_t). Minimum measurable value
 */
#define JD_E_CO2_REG_MIN_E_CO2 JD_REG_MIN_READING

/**
 * Constant ppm u22.10 (uint32_t). Minimum measurable value
 */
#define JD_E_CO2_REG_MAX_E_CO2 JD_REG_MAX_READING

/**
 * Constant s uint32_t. Time required to achieve good sensor stability before measuring after long idle period.
 */
#define JD_E_CO2_REG_CONDITIONING_PERIOD 0x180

/**
 * Constant Variant (uint8_t). Type of physical sensor and capabilities.
 */
#define JD_E_CO2_REG_VARIANT JD_REG_VARIANT

#endif
