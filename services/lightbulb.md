# Light bulb

    identifier: 0x1cab054c
    group: light

A light bulb controller.

## Registers

    rw brightness: u0.16 / @ intensity

Indicates the brightness of the light bulb. Zero means completely off and 0xffff means completely on.
For non-dimmeable lights, the value should be clamp to 0xffff for any non-zero value.

    const dimmeable?: bool @ 0x180

Indicates if the light supports dimming.

## Events

    event on @ active

Emitted when the light brightness is greater than 0.

    event off @ inactive

Emitted when the light is completely off with brightness to 0.
