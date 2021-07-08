# Button Edge

    identifier: 0x1e4f7ffd
    extends: _sensor
    group: button
    tags: C, 8bit, padauk

Edge detection for a button. Consumes less bandwidth than the streaming button, but still pretty low level.

## Events

    event down @ 0x80

Emitted when button goes from not-pressed to pressed.

    event up @ 0x81

Emitted when button goes from pressed to not-pressed.
