# Braille display

    identifier: 0x13bfb7cc
    group: display

A Braille pattern display module. This module display [unicode braille patterns](https://www.unicode.org/charts/PDF/U2800.pdf), country specific encoding have to be implemented by the clients.

## Registers

    rw enabled: bool @ intensity
    
Determines if the braille display is active.

    lowlevel rw patterns: string @ value

Braille patterns to show. Must be unicode characters between `0x2800` and `0x28ff`.

    const length: u8 # @ 0x181

Gets the number of patterns that can be displayed.
