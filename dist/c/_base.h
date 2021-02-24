// Autogenerated C header file for Base service
#ifndef _JACDAC_SPEC_BASE_H
#define _JACDAC_SPEC_BASE_H 1

/**
 * Constant string (bytes). A friendly name that describes the role of this service instance in the device.
 * It often corresponds to what's printed on the device:
 * for example, `A` for button A, or `S0` for servo channel 0.
 * Words like `left` should be avoided because of localization issues (unless they are printed on the device).
 */

/**
 * Reports the current state or error status of the device. ``code`` is a standardized value from 
 * the Jacdac status/error codes. ``vendor_code`` is any vendor specific error code describing the device
 * state. This report is typically not queried, when a device has an error, it will typically
 * add this report in frame along with the announce packet. If a service implements this register,
 * it should also support the ``status_code_changed`` event defined below.
 */
typedef struct jd_base_status_code {
    uint16_t code;
    uint16_t vendor_code;
} jd_base_status_code_t;


/**
 * Notifies that the status code of the service changed.
 */
typedef struct jd_base_status_code_changed {
    uint16_t code;
    uint16_t vendor_code;
} jd_base_status_code_changed_t;


#endif
