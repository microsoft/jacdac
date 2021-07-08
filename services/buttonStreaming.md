# Button Gesture

    identifier: 0x1cf8a306
    extends: _sensor
    group: button
    tags: C, 8bit, padauk

A button with a state register and no events. As close to the metal as it gets!

## Registers

    lowlevel ro pressed: bool / @ reading

Indicates if the button is pressed, with ``true`` being pressed and ``false`` being not pressed.
