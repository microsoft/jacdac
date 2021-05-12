# HID Keyboard

    identifier: 0x18b05b6a
    status: experimental
    camel: hidKeyboard
    tags: 8bit
    
Control a HID keyboard. 

This service cannot be simulated.

The codes for the key (selectors) is defined in the [HID Keyboard
specification](https://usb.org/sites/default/files/hut1_21.pdf), chapter 10 Keyboard/Keypad Page, page 81.
Modifiers are in page 87.

The device keeps tracks of the key state and is able to clear it all with the clear command.

## Commands

    flags Modifiers : u8 {
        None = 0x0
        LeftControl = 0xe0
        LeftShift = 0xe1
        LeftAlt = 0xe2
        LeftGUI = 0xe3
        RightControl = 0xe4
        RightShift = 0xe5
        RightAlt = 0xe6
        RightGUI = 0xe7
    }
    enum Action : u8 {
        Press = 0
        Up = 1
        Down = 2
    }
    command key @ 0x80 {
    repeats:
        selector: u16
        modifiers: Modifiers
        action: Action
    }
    
Presses a key or a sequence of keys down.

    command clear @ 0x81 {}
    
Clears all pressed keys.
