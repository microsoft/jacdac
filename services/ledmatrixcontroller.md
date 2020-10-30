# LED Matrix Controller

    identifier: 0x1d35e393
    status: experimental

A service that allows to control a rectangular matrix of monochrome LEDs.
To stream the state of the screen, use [LED Matrix display](/services/led-matrix-display) instead.

## Registers

    rw leds: bytes @ 0x80

Read or writes the state of the screen where pixel on/off state is 
stored as a bit, column by column. The column should be byte aligned.

    rw enabled: bool @ 0x81
 
 Disables or enables the whole screen.
 
    rw brightness: u8 @ 0x82
    
Sets the general brightness of the LEDs.
 
    const rows: u16 # @ 0x83
    
Number of rows on the screen

    const columns: u16 # @ 0x84
    
Number of columns on the screen

## Commands

    command clear @ 0x80 {}

Shorthand command to clear all the LEDs on the screen.