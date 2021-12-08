# Dimmer

    identifier: 0x1fb02645
    status: stable

A light or fan controller that dims the current on a line.

## Registers

    rw intensity : u0.16 / @ intensity

The intensity of the current. Set to `0` to turn off completely the current.

    enum Variant : u8 {
        Light = 1
        Fan = 2
        Pump = 3
    }
    const variant?: Variant @ variant

The type of physical device
