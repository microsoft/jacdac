# Accelerometer

    identifier: 0x1f140409
    extends: _sensor
    camel: accel

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

    event tilt_up @ 1
    event tilt_down @ 2
    event tilt_left @ 3
    event tilt_right @ 4

Emitted when accelerometer is tilted in the given direction.

    event face_up @ 5
    event face_down @ 6

Emitted when accelerometer is laying flat in the given direction.

    event freefall @ 7

Emitted when total force acting on accelerometer is much less than 1g.

    event shake @ 11

Emitted when forces change violently a few times.

    event force_2g @ 12
    event force_3g @ 8
    event force_6g @ 9
    event force_8g @ 10

Emitted when force in any direction exceeds given threshold.
