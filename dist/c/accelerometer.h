// Autogenerated C header file for Accelerometer
#ifndef _JACDAC_SPEC_ACCELEROMETER_H
#define _JACDAC_SPEC_ACCELEROMETER_H 1

#define JD_SERVICE_CLASS_ACCELEROMETER  0x1f140409

/**
 * Indicates the current forces acting on accelerometer.
 */
#define JD_ACCELEROMETER_REG_FORCES JD_REG_READING
typedef struct jd_accelerometer_forces {
    int32_t x;  // g i12.20
    int32_t y;  // g i12.20
    int32_t z;  // g i12.20
} jd_accelerometer_forces_t;


/**
 * Read-only g u12.20 (uint32_t). Error on the reading value.
 */
#define JD_ACCELEROMETER_REG_FORCES_ERROR JD_REG_READING_ERROR

/**
 * Read-write g u12.20 (uint32_t). Configures the range forces detected.
 * The value will be "rounded up" to one of `max_forces_supported`.
 */
#define JD_ACCELEROMETER_REG_MAX_FORCE JD_REG_READING_RANGE

/**
 * Constant. Lists values supported for writing `max_force`.
 */
#define JD_ACCELEROMETER_REG_MAX_FORCES_SUPPORTED JD_REG_SUPPORTED_RANGES
typedef struct jd_accelerometer_max_forces_supported {
    uint32_t max_force[0];  // g u12.20
} jd_accelerometer_max_forces_supported_t;


/**
 * Emitted when accelerometer is tilted in the given direction.
 */
#define JD_ACCELEROMETER_EV_TILT_UP 0x81

/**
 * Emitted when accelerometer is tilted in the given direction.
 */
#define JD_ACCELEROMETER_EV_TILT_DOWN 0x82

/**
 * Emitted when accelerometer is tilted in the given direction.
 */
#define JD_ACCELEROMETER_EV_TILT_LEFT 0x83

/**
 * Emitted when accelerometer is tilted in the given direction.
 */
#define JD_ACCELEROMETER_EV_TILT_RIGHT 0x84

/**
 * Emitted when accelerometer is laying flat in the given direction.
 */
#define JD_ACCELEROMETER_EV_FACE_UP 0x85

/**
 * Emitted when accelerometer is laying flat in the given direction.
 */
#define JD_ACCELEROMETER_EV_FACE_DOWN 0x86

/**
 * Emitted when total force acting on accelerometer is much less than 1g.
 */
#define JD_ACCELEROMETER_EV_FREEFALL 0x87

/**
 * Emitted when forces change violently a few times.
 */
#define JD_ACCELEROMETER_EV_SHAKE 0x8b

/**
 * Emitted when force in any direction exceeds given threshold.
 */
#define JD_ACCELEROMETER_EV_FORCE_2G 0x8c

/**
 * Emitted when force in any direction exceeds given threshold.
 */
#define JD_ACCELEROMETER_EV_FORCE_3G 0x88

/**
 * Emitted when force in any direction exceeds given threshold.
 */
#define JD_ACCELEROMETER_EV_FORCE_6G 0x89

/**
 * Emitted when force in any direction exceeds given threshold.
 */
#define JD_ACCELEROMETER_EV_FORCE_8G 0x8a

#endif
