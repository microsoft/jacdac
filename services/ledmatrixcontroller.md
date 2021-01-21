# LED Matrix Controller

    identifier: 0x1d35e393
    camel: ledMatrixController

A service that allows to control a rectangular matrix of monochrome LEDs.
To stream the state of the screen, use [LED Matrix display](/services/led-matrix-display) instead.

## Registers

    rw leds: bytes @ value

Read or writes the state of the screen where pixel on/off state is 
stored as a bit, column by column. The column should be byte aligned.
 
    rw brightness: u8 @ intensity
    
Sets the general brightness of the LEDs. ``0`` turns off the screen.
 
    const rows: u16 # @ 0x181
    
Number of rows on the screen

    const columns: u16 # @ 0x182
    
Number of columns on the screen

## Commands

    command clear @ 0x80 { }

Shorthand command to clear all the LEDs on the screen.