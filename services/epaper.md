# ePaper

A e-Ink/e-Paper display.

    identifier: 0x17a19937

## Registers

    rw enabled: bool @ intensity

Turns on/off the display.

    const rows: u16 @ 0x80

Number of rows on the screen.

   const columns: u16 @ 0x81

Number of columns on the screen.

    enum Variant: u8 {
         Monochrome = 1
         Grayscale4 = 2
         TriColor = 3
    }
    const variant: Variant @ variant

The type of screen and number of bits per pixels. Monochrome = 1bit, Grayscale4 = 2bits, Tricolor = 2bits.

## Commands

    command paint @ 0x80 {
        colors: pipe
    }
    pipe report colors {
        colors: bytes
    }
    
Refreshes the display, in a column first layout, columns must be aligned. Sending an empty buffer clears the screen.