// Autogenerated C header file for DMX
#ifndef _JACDAC_SPEC_DMX_H
#define _JACDAC_SPEC_DMX_H 1

#define JD_SERVICE_CLASS_DMX  0x11cf8c05

/**
 * Read-write bool (uint8_t). Determines if the DMX bridge is active.
 */
#define JD_DMX_REG_ENABLED JD_REG_INTENSITY

/**
 * Argument: channels bytes. Send a DMX packet, up to 236bytes long, including the start code.
 */
#define JD_DMX_CMD_SEND 0x80

#endif
