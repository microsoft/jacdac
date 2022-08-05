# Traffic Light

    identifier: 0x15c38d9b
    tags: 8bit
    status: rc

Controls a mini traffic with a red, orange and green LED.

## Registers

    rw red: bool @ 0x80

The on/off state of the red light.

    rw yellow: bool @ 0x81

The on/off state of the yellow light.

    rw green: bool @ 0x82

The on/off state of the green light.
