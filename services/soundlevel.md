# Sound level

     identifier: 0x14ad1a5d
     extends: _sensor
     group: sound
     tags: 8bit
     status: rc

A sound level detector sensor, gives a relative indication of the sound level.

## Registers

    ro sound_level: u0.16 / @ reading

The sound level detected by the microphone

    rw enabled: bool @ intensity

Turn on or off the microphone.

    rw loud_threshold?: u0.16 / @ active_threshold

The sound level to trigger a loud event.

## Events

    event loud @ active {}

Raised when a loud sound is detected
