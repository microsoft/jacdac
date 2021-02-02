// Autogenerated C header file for HID Keyboard
#ifndef _JACDAC_SPEC_HID_KEYBOARD_H
#define _JACDAC_SPEC_HID_KEYBOARD_H 1

#define JD_SERVICE_CLASS_HID_KEYBOARD  0x18b05b6a

// enum Modifiers (uint8_t)
#define JD_HID_KEYBOARD_MODIFIERS_LEFT_CONTROL 0xe0
#define JD_HID_KEYBOARD_MODIFIERS_LEFT_SHIFT 0xe1
#define JD_HID_KEYBOARD_MODIFIERS_LEFT_ALT 0xe2
#define JD_HID_KEYBOARD_MODIFIERS_LEFT_GUID 0xe3
#define JD_HID_KEYBOARD_MODIFIERS_RIGHT_CONTROL 0xe4
#define JD_HID_KEYBOARD_MODIFIERS_RIGHT_SHIFT 0xe5
#define JD_HID_KEYBOARD_MODIFIERS_RIGHT_ALT 0xe6
#define JD_HID_KEYBOARD_MODIFIERS_RIGHT_GUID 0xe7

// enum Action (uint8_t)
#define JD_HID_KEYBOARD_ACTION_PRESS 0x0
#define JD_HID_KEYBOARD_ACTION_UP 0x1
#define JD_HID_KEYBOARD_ACTION_DOWN 0x2

/**
 * Presses a key or a sequence of keys down.
 */
#define JD_HID_KEYBOARD_CMD_KEY 0x80
typedef struct jd_hid_keyboard_key {
    uint16_t selector;
    uint8_t modifiers;  // Modifiers
    uint8_t action;  // Action
} jd_hid_keyboard_key_t;


/**
 * No args. Clears all pressed keys.
 */
#define JD_HID_KEYBOARD_CMD_CLEAR 0x81

#endif
