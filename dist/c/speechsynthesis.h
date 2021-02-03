// Autogenerated C header file for Speech synthesis
#ifndef _JACDAC_SPEC_SPEECH_SYNTHESIS_H
#define _JACDAC_SPEC_SPEECH_SYNTHESIS_H 1

#define JD_SERVICE_CLASS_SPEECH_SYNTHESIS  0x1204d995

/**
 * Read-write bool (uint8_t). Determines if the speech engine is in a non-paused state.
 */
#define JD_SPEECH_SYNTHESIS_REG_ENABLED JD_REG_INTENSITY

/**
 * Read-write string (bytes). Language used for utterances as defined in https://www.ietf.org/rfc/bcp/bcp47.txt.
 */
#define JD_SPEECH_SYNTHESIS_REG_LANG 0x80

/**
 * Read-write ratio u0.8 (uint8_t). Volume for utterances.
 */
#define JD_SPEECH_SYNTHESIS_REG_VOLUME 0x81

/**
 * Read-write u16.16 (uint32_t). Pitch for utterances
 */
#define JD_SPEECH_SYNTHESIS_REG_PITCH 0x82

/**
 * Read-write u16.16 (uint32_t). Rate for utterances
 */
#define JD_SPEECH_SYNTHESIS_REG_RATE 0x83

/**
 * Argument: text string (bytes). Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
 */
#define JD_SPEECH_SYNTHESIS_CMD_SPEAK 0x80

/**
 * No args. Cancels current utterance and all utterances from the utterance queue.
 */
#define JD_SPEECH_SYNTHESIS_CMD_CANCEL 0x81

#endif
