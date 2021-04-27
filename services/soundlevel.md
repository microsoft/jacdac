#  Sound level

     identifier: 0x14ad1a5d
     extends: _sensor
     group: sound
     tags: 8bit

A sound level detector sensor, gives a relative indication of the sound level.

## Registers

    ro sound_level: u0.16 / @ reading

The sound level detected by the microphone

    rw enabled: bool @ intensity

Turn on or off the microphone.

    rw min_decibels?: i16 dB @ 0x81

The minimum power value considered by the sensor.
If both ``min_decibels`` and ``max_decibels`` are supported,
the volume in deciment can be linearly interpolated between
``[min_decibels, max_decibels]``.

    rw max_decibels?: i16 dB @ 0x82

The maximum power value considered by the sensor.
If both ``min_decibels`` and ``max_decibels`` are supported,
the volume in deciment can be linearly interpolated between
``[min_decibels, max_decibels]``.

    rw loud_threshold: u0.16 / @ active_threshold

The sound level to trigger a loud event.

    rw quiet_threshold: u0.16 / @ inactive_threshold

The sound level to trigger a quiet event.

## Events

    event loud @ high {}

Raised when a loud sound is detected

    event quiet @ low {}

Raised when a period of quietness is detected
