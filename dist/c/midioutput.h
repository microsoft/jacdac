// Autogenerated C header file for MIDI output
#ifndef _JACDAC_SPEC_MIDI_OUTPUT_H
#define _JACDAC_SPEC_MIDI_OUTPUT_H 1

#define JD_SERVICE_CLASS_MIDI_OUTPUT  0x1a848cd7

/**
 * Read-write bool (uint8_t). Opens or closes the port to the MIDI device
 */
#define JD_MIDI_OUTPUT_REG_ENABLED JD_REG_INTENSITY

/**
 * No args. Clears any pending send data that has not yet been sent from the MIDIOutput's queue.
 */
#define JD_MIDI_OUTPUT_CMD_CLEAR 0x80

/**
 * Argument: data bytes. Enqueues the message to be sent to the corresponding MIDI port
 */
#define JD_MIDI_OUTPUT_CMD_SEND 0x81

#endif
