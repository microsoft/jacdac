// Autogenerated C header file for Servo
#ifndef _JACDAC_SPEC_SERVO_H
#define _JACDAC_SPEC_SERVO_H 1

#define JD_SERVICE_CLASS_SERVO  0x12fc9103

// enum Variant (uint32_t)
#define JD_SERVO_VARIANT_POSITIONAL_ROTATION 0x1
#define JD_SERVO_VARIANT_CONTINUOUS_ROTATION 0x2
#define JD_SERVO_VARIANT_LINEAR 0x3

/**
 * Read-write ° i16.16 (int32_t). Specifies the angle of the arm.
 */
#define JD_SERVO_REG_ANGLE JD_REG_VALUE

/**
 * Read-write bool (uint8_t). Turn the power to the servo on/off.
 */
#define JD_SERVO_REG_ENABLED JD_REG_INTENSITY

/**
 * Read-write ° i16.16 (int32_t). Correction applied to the angle to account for the servo arm drift.
 */
#define JD_SERVO_REG_OFFSET 0x81

/**
 * Constant ° i16.16 (int32_t). Lowest angle that can be set.
 */
#define JD_SERVO_REG_MIN_ANGLE JD_REG_MIN_READING

/**
 * Constant ° i16.16 (int32_t). Highest angle that can be set.
 */
#define JD_SERVO_REG_MAX_ANGLE JD_REG_MAX_READING

/**
 * Constant Variant (uint32_t). Specifies the type of thermometer.
 * * Positional Rotation Servos: Positional servos can rotate the shaft in about half of the circle,
 * with features to avoid over-rotating. Most servo have a range of 180° but some allow 360°.
 * * Continuous Rotation Servos: Continous servos can move in both clockwise and anticlockwise directions without restrictions. The angle is typically interpreted as a throttle.
 * * Linear Servos: linear servos are also like a positional servo, but with additional gears to the adjust the output from circular to back-and-forth.
 */
#define JD_SERVO_REG_VARIANT JD_REG_VARIANT

#endif
