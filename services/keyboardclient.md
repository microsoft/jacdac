# Keyboard client

    identifier: 0x113d023e
    extends: _sensor

Measures KeyboardClient.

## Events

    event down @ active {
        key: u16
    }

Emitted when a key is pressed.

    event hold @ 0x81 {
        key: u16
    }

Emitted when a key is held.
