# LED Matrix Display

    identifier: 0x1161590c
    extends: _sensor
    status: experimental

A sensor that streams the state of a rectangular LED matrix.
To control the state of the screen, use [LED Matrix Controller](/services/led-matrix-controller) instead.


## Registers

    ro leds : bytes @ reading
    
Streams the state of the screen where pixel on/off state is 
stored as a bit, column by column. The column should be byte aligned.
