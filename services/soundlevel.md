#  Sound level

     identifier: 0x14ad1a5d
     extends: _sensor

A sound level detector sensor, gives a relative indication of the sound level.

## Registers

    ro sound_level: u8 / @ reading

The sound level detected by the microphone

    rw loud_threshold: u8 @ low_threshold

The sound level to trigger a loud event.

    rw quiet_threshold: u8 @ high_threshold

The sound level to trigger a quite event.

## Events

    event loud @ active {}

Raised when a loud sound is detected

    event quiet @ inactive {}

Raised when a period of quietness is detected
