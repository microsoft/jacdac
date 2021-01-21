# Matrix Keypad

    identifier: 0x13062dc8
    extends: _sensor

A matrix of buttons connected as a keypad

## Registers

    ro pressed @ reading {
        repeats:
          index: u8
    }

The coordinate of the button currently pressed. Keys are zero-indexed from left to right, top to bottom:
``row = index / columns``, ``column = index % columns``.

    const rows: u8 @ 0x180

Number of rows in the matrix

    const columns: u8 @ 0x181

Number of columns in the matrix

    const labels? @ 0x182 {
        repeats:
            label: string
    }

The characters printed on the keys if any, in indexing sequence.

## Events

    event down: u8 @ active

Emitted when a key, at the given index, goes from inactive (`pressed == 0`) to active.

    event up: u8 @ inactive

Emitted when a key, at the given index, goes from active (`pressed == 1`) to inactive.

    event click: u8 @ 0x80

Emitted together with `up` when the press time was not longer than 500ms.

    event long_click: u8 @ 0x81

Emitted together with `up` when the press time was more than 500ms.
