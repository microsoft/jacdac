#  Sound level

     identifier: 0x14ad1a5d
     extends: _sensor
     tags: sound

A sound level detector sensor, gives a relative indication of the sound level.

## Registers

    ro sound_level: u0.16 / @ reading

The sound level detected by the microphone

    rw loud_threshold: u0.16 / @ low_threshold

The sound level to trigger a loud event.

    rw quiet_threshold: u0.16 / @ high_threshold

The sound level to trigger a quite event.

## Events

    event loud @ high {}

Raised when a loud sound is detected

    event quiet @ low {}

Raised when a period of quietness is detected
