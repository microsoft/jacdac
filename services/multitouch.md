# Multitouch

    identifier: 0x1d112ab5
    extends: _sensor
    group: button
    status: experimental

A capacitive touch sensor with multiple inputs.

## Registers

    ro capacity @ reading {
    repeats:
        capacitance: i16
    }

Capacitance of channels. The capacitance is continuously calibrated, and a value of `0` indicates
no touch, wheres a value of around `100` or more indicates touch.
It's best to ignore this (unless debugging), and use events.

Digital sensors will use `0` or `0xffff` on each channel.

## Events

Most events include the channel number of the input.

    event touch @ active {
        channel: u8
    }

Emitted when an input is touched.

    event release @ inactive {
        channel: u8
    }

Emitted when an input is no longer touched.

    event tap @ 0x80 {
        channel: u8
    }

Emitted when an input is briefly touched. TODO Not implemented.

    event long_press @ 0x81 {
        channel: u8
    }

Emitted when an input is touched for longer than 500ms. TODO Not implemented.

    event swipe_pos @ 0x90 {
        duration: u16 ms
        start_channel: u8
        end_channel: u8
    }

Emitted when input channels are successively touched in order of increasing channel numbers.

    event swipe_neg @ 0x91 {
        duration: u16 ms
        start_channel: u8
        end_channel: u8
    }

Emitted when input channels are successively touched in order of decreasing channel numbers.