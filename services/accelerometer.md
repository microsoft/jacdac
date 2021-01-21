# Accelerometer

    identifier: 0x1f140409
    extends: _sensor

A 3-axis accelerometer.

## Registers

    ro forces @ reading {
        x: i6.10 g
        y: i6.10 g
        z: i6.10 g
    }

Indicates the current forces acting on accelerometer.

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
