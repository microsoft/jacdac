# Accelerometer

    identifier: 0x1f140409
    extends: _sensor
    tags: movement, C

A 3-axis accelerometer.

## Registers

    ro forces @ reading {
        x: i12.20 g
        y: i12.20 g
        z: i12.20 g
    }

Indicates the current forces acting on accelerometer.

    ro forces_error?: i12.20 g @ reading_error

Error on the reading value.

    rw max_force?: i12.20 g @ 0x80

Configures the range forces detected.
Read-back after setting to get current value.

## Events

All events are debounced.

    event tilt_up @ 0x81
    event tilt_down @ 0x82
    event tilt_left @ 0x83
    event tilt_right @ 0x84

Emitted when accelerometer is tilted in the given direction.

    event face_up @ 0x85
    event face_down @ 0x86

Emitted when accelerometer is laying flat in the given direction.

    event freefall @ 0x87

Emitted when total force acting on accelerometer is much less than 1g.

    event shake @ 0x8b

Emitted when forces change violently a few times.

    event force_2g @ 0x8c
    event force_3g @ 0x88
    event force_6g @ 0x89
    event force_8g @ 0x8a

Emitted when force in any direction exceeds given threshold.
