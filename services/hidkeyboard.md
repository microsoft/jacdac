# HID Keyboard

    identifier: 0x18b05b6a
    status: experimental
    camel: hidKeyboard
    tags: 8bit
    
Control a HID keyboard. 

The codes for the key (selectors) is defined in the [HID Keyboard
specification](https://usb.org/sites/default/files/hut1_21.pdf), chapter 10 Keyboard/Keypad Page, page 81.
Modifiers are in page 87.

The device keeps tracks of the key state and is able to clear it all with the clear command.

## Commands

    flags Modifiers : u8 {
        None = 0x0
        LeftControl = 0x01
        LeftShift = 0x02
        LeftAlt = 0x04
        LeftGUI = 0x08
        RightControl = 0x10
        RightShift = 0x20
        RightAlt = 0x40
        RightGUI = 0x80
    }
    enum Action : u8 {
        Press = 0
        Up = 1
        Down = 2
    }
    lowlevel unique command key @ 0x80 {
    repeats:
        selector: u16
        modifiers: Modifiers
        action: Action
    }
    
Presses a key or a sequence of keys down.

    command clear @ 0x81 {}
    
Clears all pressed keys.
