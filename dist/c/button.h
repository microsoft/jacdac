// Autogenerated C header file for Button
#ifndef _JACDAC_SPEC_BUTTON_H
#define _JACDAC_SPEC_BUTTON_H 1

#define JD_SERVICE_CLASS_BUTTON  0x1473a263

/**
 * Read-only bool (uint8_t). Indicates whether the button is currently active (pressed).
 */
#define JD_BUTTON_REG_PRESSED JD_REG_READING

/**
 * Read-write uint32_t. Threshold for `click` and `hold` events (see event descriptions below).
 */
#define JD_BUTTON_REG_CLICK_HOLD_TIME 0x80

/**
 * Emitted when button goes from inactive (`pressed == 0`) to active.
 */
#define JD_BUTTON_EV_DOWN JD_EV_ACTIVE

/**
 * Argument: time ms uint32_t. Emitted when button goes from active (`pressed == 1`) to inactive. The 'time' parameter 
 * records the amount of time between the down and up events.
 */
#define JD_BUTTON_EV_UP JD_EV_INACTIVE

/**
 * Emitted together with `up` when the press time is not longer than `click_hold_time`.
 */
#define JD_BUTTON_EV_CLICK 0x80

/**
 * Emitted after the button is held for more than `click_hold_time`. Hold events are followed by a separate up event.
 */
#define JD_BUTTON_EV_HOLD 0x81

#endif
