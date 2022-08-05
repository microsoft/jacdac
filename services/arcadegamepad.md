# Arcade Gamepad

    identifier: 0x1deaa06e
    extends: _sensor
    group: button
    status: deprecated

This service is deprecated in favor of `gamepad` (although it is currently used by the micro:bit Arcade smart shield).
A gamepad with direction and action buttons for one player.
If a device has multiple controllers, it should have multiple gamepad services, using consecutive service identifiers.

## Registers

    enum Button : u8 {
        Left = 1
        Up = 2
        Right = 3
        Down = 4
        A = 5
        B = 6
        Menu = 7
        Select = 8
        Reset = 9        
        Exit = 10
    }
    ro buttons @ reading {
    repeats:
        button: Button
        pressure: u0.8 /
    }

Indicates which buttons are currently active (pressed).
`pressure` should be `0xff` for digital buttons, and proportional for analog ones.

    const available_buttons @ 0x180 {
    repeats:
        button: Button
    }

Indicates number of players supported and which buttons are present on the controller.

## Events

    event down @ active {
        button: Button
    }

Emitted when button goes from inactive to active.

    event up @ inactive {
        button: Button
    }

Emitted when button goes from active to inactive.
