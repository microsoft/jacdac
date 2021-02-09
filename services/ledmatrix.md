# LED Matrix

    identifier: 0x110d154b
    camel: LEDMatrix

A rectangular monochrome LED matrix controller.

## Registers

    rw leds : bytes @ value
    
The state of the screen where pixel on/off state is 
stored as a bit, column by column. The column should be byte aligned.

    rw brightness: u0.8 / @ intensity
    
Reads the general brightness of the LEDs. ``0`` when the screen is off.

    const rows: u16 # @ 0x181
    
Number of rows on the screen

    const columns: u16 # @ 0x182
    
Number of columns on the screen
