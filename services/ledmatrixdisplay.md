# LED Matrix Display

    identifier: 0x110d154b
    extends: _sensor
    camel: ledMatrixDisplay

A sensor that streams the state of a rectangular LED matrix.
To control the state of the screen, use [LED Matrix Controller](/services/led-matrix-controller) instead.


## Registers

    ro leds : bytes @ reading
    
Streams the state of the screen where pixel on/off state is 
stored as a bit, column by column. The column should be byte aligned.

    ro brightness: u8 @ 0x180
    
Reads the general brightness of the LEDs. ``0`` when the screen is off.

    const rows: u16 # @ 0x181
    
Number of rows on the screen

    const columns: u16 # @ 0x182
    
Number of columns on the screen
