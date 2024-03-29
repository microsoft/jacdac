// Autogenerated C header file for Sound Recorder with Playback
#ifndef _JACDAC_SPEC_SOUND_RECORDER_WITH_PLAYBACK_H
#define _JACDAC_SPEC_SOUND_RECORDER_WITH_PLAYBACK_H 1

#define JD_SERVICE_CLASS_SOUND_RECORDER_WITH_PLAYBACK  0x1b72bf50

// enum Status (uint8_t)
#define JD_SOUND_RECORDER_WITH_PLAYBACK_STATUS_IDLE 0x0
#define JD_SOUND_RECORDER_WITH_PLAYBACK_STATUS_RECORDING 0x1
#define JD_SOUND_RECORDER_WITH_PLAYBACK_STATUS_PLAYING 0x2

/**
 * No args. Replay recorded audio.
 */
#define JD_SOUND_RECORDER_WITH_PLAYBACK_CMD_PLAY 0x80

/**
 * Argument: duration ms uint16_t. Record audio for N milliseconds.
 */
#define JD_SOUND_RECORDER_WITH_PLAYBACK_CMD_RECORD 0x81

/**
 * No args. Cancel record, the `time` register will be updated by already cached data.
 */
#define JD_SOUND_RECORDER_WITH_PLAYBACK_CMD_CANCEL 0x82

/**
 * Read-only Status (uint8_t). Indicate the current status
 */
#define JD_SOUND_RECORDER_WITH_PLAYBACK_REG_STATUS 0x180

/**
 * Read-only ms uint16_t. Milliseconds of audio recorded.
 */
#define JD_SOUND_RECORDER_WITH_PLAYBACK_REG_TIME 0x181

/**
 * Read-write ratio u0.8 (uint8_t). Playback volume control
 */
#define JD_SOUND_RECORDER_WITH_PLAYBACK_REG_VOLUME JD_REG_INTENSITY

#endif
