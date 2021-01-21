# Gamepad

    identifier: 0x1deaa06e
    extends: _sensor

A gamepad with direction and action buttons for 1 or more players.

## Commands

    enum Button : u16 {
        Left = 1
        Up = 2
        Right = 3
        Down = 4
        A = 5
        B = 6
        Menu = 7
        MenuAlt = 8
        Reset = 9
        Exit = 10
    }
    const available_buttons @ {
    repeats:
        button: Button
    }

Indicates number of players supported and which buttons are present on the controller.

## Registers

    ro buttons @ reading {
    repeats:
        button: Button
        pressure: u8 /
    }

Indicates which buttons are currently active (pressed).
`pressure` should be `0xff` for digital buttons, and proportional for analog ones.

## Events

    event down @ active {
        button: Button
        player_index: u16
    }

Emitted when button goes from inactive to active.

    event up @ inactive {
        button: Button
        player_index: u16
    }

Emitted when button goes from active to inactive.
