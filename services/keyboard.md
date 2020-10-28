# Keyboard

    identifier: 0x18b05b6a
    
A keyboard that can send keystrokes.

The codes for the key (selectors) is defined in the [HID Keyboard
specification](https://usb.org/sites/default/files/hut1_21.pdf), chapter 10 Keyboard/Keypad Page, page 81.
    
## Commands

    flags Modifiers : u8 {
        LeftControl = 0xe0
        LeftShift = 0xe1
        LeftAlt = 0xe2
        LeftGUID = 0xe3
        RightControl = 0xe0
        RightShift = 0xe1
        RightAlt = 0xe2
        RightGUID = 0xe3
    }
    command key @ 0x80 {
    repeats:
        selector: u8
        modifiers: Modifiers
        
    }
    
Presses a key or a sequence of keys down.

    command clear @ 0x82
    
Clears all pressed keys.
