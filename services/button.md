# Button

    identifier: 0x1473a263
    extends: _sensor

A simple push-button.

Note: this service will stream readings while the button is pressed and shortly after it's released, even
when `is_streaming == 0`. TODO remove this?

## Registers

    ro pressed: bool @ reading

Indicates whether the button is currently active (pressed).

## Events

    event down @ 0x01

Emitted when button goes from inactive (`pressed == 0`) to active.

    event up @ 0x02

Emitted when button goes from active (`pressed == 1`) to inactive.

    event click @ 0x03

Emitted together with `up` when the press time was not longer than 500ms.

    event long_click @ 0x04

Emitted together with `up` when the press time was more than 500ms.
