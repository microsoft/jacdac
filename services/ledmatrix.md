# LED Matrix

    identifier: 0x1d35e393

A rectangular matrix of monochrome LEDs

## Registers

    rw leds: bytes @ 0x80

Read or writes the state of the screen where pixel information is 
stored as bits, row by row.

    rw enabled: boolean @ 0x81
 
 Disables or enables the whole screen.
 
    rw brightness: u8 @ 0x82
    
Sets the general brightness of the LEDs.
 
    const rows: u8 # @ 0x83
    
Number of rows on the screen

    const columns: u8 # @ 0x84
    
Number of columns on the screen

## Commands

    command clear @ 0x80 {}
