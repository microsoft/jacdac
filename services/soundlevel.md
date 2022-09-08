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

    rw loud_threshold: u0.16 / @ active_threshold

Set level at which the `loud` event is generated.

    rw quiet_threshold: u0.16 / @ inactive_threshold

Set level at which the `quiet` event is generated.

## Events

    event loud @ active

Generated when a loud sound is detected.

    event quiet @ inactive

Generated low level of sound is detected.
