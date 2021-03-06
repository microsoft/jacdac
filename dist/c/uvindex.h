// Autogenerated C header file for UV index
#ifndef _JACDAC_SPEC_UV_INDEX_H
#define _JACDAC_SPEC_UV_INDEX_H 1

#define JD_SERVICE_CLASS_UV_INDEX  0x1f6e0d90

// enum Variant (uint8_t)
#define JD_UV_INDEX_VARIANT_UVA_UVB 0x1
#define JD_UV_INDEX_VARIANT_VISIBLE_IR 0x2

/**
 * Read-only uv u16.16 (uint32_t). Ultraviolet index, typically refreshed every second.
 */
#define JD_UV_INDEX_REG_UV_INDEX JD_REG_READING

/**
 * Read-only uv u16.16 (uint32_t). Error on the UV measure.
 */
#define JD_UV_INDEX_REG_UV_INDEX_ERROR JD_REG_READING_ERROR

/**
 * Constant Variant (uint8_t). The type of physical sensor and capabilities.
 */
#define JD_UV_INDEX_REG_VARIANT JD_REG_VARIANT

#endif
