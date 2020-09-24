# Multitouch

    identifier: 0x18d55e2b
    extends: _sensor

A capacitive touch sensor with multiple inputs.

## Registers

    ro capacity @ reading {
    repeats:
        capacitance: i32
    }

Capacitance of channels. The capacitance is continuously calibrated, and a value of `0` indicates
no touch, wheres a value of around `100` or more indicates touch.
It's best to ignore this (unless debugging), and use events.

## Events

Most events include the channel number of the input.

    event touch @ 0x01 {
        channel: u32
    }

Emitted when an input is touched.

    event release @ 0x02 {
        channel: u32
    }

Emitted when an input is no longer touched.

    event tap @ 0x03 {
        channel: u32
    }

Emitted when an input is briefly touched. TODO Not implemented.

    event long_press @ 0x04 {
        channel: u32
    }

Emitted when an input is touched for longer than 500ms. TODO Not implemented.

    event swipe_pos @ 0x10

Emitted when input channels are successively touched in order of increasing channel numbers.

    event swipe_neg @ 0x11

Emitted when input channels are successively touched in order of decreasing channel numbers.
