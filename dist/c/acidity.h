// Autogenerated C header file for Acidity
#ifndef _JACDAC_SPEC_ACIDITY_H
#define _JACDAC_SPEC_ACIDITY_H 1

#define JD_SERVICE_CLASS_ACIDITY  0x1e9778c5

/**
 * Read-only pH u4.12 (uint16_t). The acidity, pH, of water.
 */
#define JD_ACIDITY_REG_ACIDITY JD_REG_READING

/**
 * Read-only pH u4.12 (uint16_t). Error on the acidity reading.
 */
#define JD_ACIDITY_REG_ACIDITY_ERROR JD_REG_READING_ERROR

/**
 * Constant pH u4.12 (uint16_t). Lowest acidity that can be reported.
 */
#define JD_ACIDITY_REG_MIN_ACIDITY JD_REG_MIN_READING

/**
 * Constant pH u4.12 (uint16_t). Highest acidity that can be reported.
 */
#define JD_ACIDITY_REG_MAX_HUMIDITY JD_REG_MAX_READING

#endif
