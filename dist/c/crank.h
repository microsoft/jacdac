// Autogenerated C header file for Rotary encoder
#ifndef _JACDAC_SPEC_ROTARY_ENCODER_H
#define _JACDAC_SPEC_ROTARY_ENCODER_H 1

#define JD_SERVICE_CLASS_CRANK  0x10fa29c9

/**
 * Read-only # int32_t. Upon device reset starts at `0` (regardless of the shaft position).
 * Increases by `1` for a clockwise "click", by `-1` for counter-clockwise.
 */
#define JD_CRANK_REG_POSITION JD_REG_READING

/**
 * Constant # uint16_t. This specifies by how much `position` changes when the crank does 360 degree turn. Typically 12 or 24.
 */
#define JD_CRANK_REG_CLICKS_PER_TURN 0x180

#endif
