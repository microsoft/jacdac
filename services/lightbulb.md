# Light bulb

    identifier: 0x1cab054c
    group: light
    status: rc

A light bulb controller.

## Registers

    rw brightness: u0.16 / @ intensity

Indicates the brightness of the light bulb. Zero means completely off and 0xffff means completely on.
For non-dimmable lights, the value should be clamp to 0xffff for any non-zero value.

    const dimmable?: bool @ 0x180

Indicates if the light supports dimming.
