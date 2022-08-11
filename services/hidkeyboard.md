# HID Keyboard

    identifier: 0x18b05b6a
    status: experimental
    camel: hidKeyboard
    tags: 8bit
    status: stable

Control a HID keyboard.

The codes for the key (selectors) is defined in the [HID Keyboard
specification](https://usb.org/sites/default/files/hut1_21.pdf), chapter 10 Keyboard/Keypad Page, page 81.
Modifiers are in page 87.

The device keeps tracks of the key state and is able to clear it all with the clear command.

## Commands

    enum Selector : u16 {
        None = 0x00
        ErrorRollOver = 0x01
        PostFail = 0x02
        ErrorUndefined = 0x03
        A = 0x04
        B = 0x05
        C = 0x06
        D = 0x07
        E = 0x08
        F = 0x09
        G = 0x0A
        H = 0x0B
        I = 0x0C
        J = 0x0D
        K = 0x0E
        L = 0x0F
        M = 0x10
        N = 0x11
        O = 0x12
        P = 0x13
        Q = 0x14
        R = 0x15
        S = 0x16
        T = 0x17
        U = 0x18
        V = 0x19
        W = 0x1A
        X = 0x1B
        Y = 0x1C
        Z = 0x1D
        _1 = 0x1E
        _2 = 0x1F
        _3 = 0x20
        _4 = 0x21
        _5 = 0x22
        _6 = 0x23
        _7 = 0x24
        _8 = 0x25
        _9 = 0x26
        _0 = 0x27
        Return = 0x28
        Escape = 0x29
        Backspace = 0x2A
        Tab = 0x2B
        Spacebar = 0x2C
        Minus = 0x2D
        Equals = 0x2E
        LeftSquareBracket = 0x2F
        RightSquareBracket = 0x30
        Backslash = 0x31
        NonUsHash = 0x32
        Semicolon = 0x33
        Quote = 0x34
        GraveAccent = 0x35
        Comma = 0x36
        Period = 0x37
        Slash = 0x38
        CapsLock = 0x39
        F1 = 0x3A
        F2 = 0x3B
        F3 = 0x3C
        F4 = 0x3D
        F5 = 0x3E
        F6 = 0x3F
        F7 = 0x40
        F8 = 0x41
        F9 = 0x42
        F10 = 0x43
        F11 = 0x44
        F12 = 0x45
        PrintScreen = 0x46
        ScrollLock = 0x47
        Pause = 0x48
        Insert = 0x49
        Home = 0x4A
        PageUp = 0x4B
        Delete = 0x4C
        End = 0x4D
        PageDown = 0x4E
        RightArrow = 0x4F
        LeftArrow = 0x50
        DownArrow = 0x51
        UpArrow = 0x52
        KeypadNumLock = 0x53
        KeypadDivide = 0x54
        KeypadMultiply = 0x55
        KeypadAdd = 0x56
        KeypadSubtrace = 0x57
        KeypadReturn = 0x58
        Keypad1 = 0x59
        Keypad2 = 0x5A
        Keypad3 = 0x5B
        Keypad4 = 0x5C
        Keypad5 = 0x5D
        Keypad6 = 0x5E
        Keypad7 = 0x5F
        Keypad8 = 0x60
        Keypad9 = 0x61
        Keypad0 = 0x62
        KeypadDecimalPoint = 0x63
        NonUsBackslash = 0x64
        Application = 0x65
        Power = 0x66
        KeypadEquals = 0x67
        F13 = 0x68
        F14 = 0x69
        F15 = 0x6A
        F16 = 0x6B
        F17 = 0x6C
        F18 = 0x6D
        F19 = 0x6E
        F20 = 0x6F
        F21 = 0x70
        F22 = 0x71
        F23 = 0x72
        F24 = 0x73
        Execute = 0x74
        Help = 0x75
        Menu = 0x76
        Select = 0x77
        Stop = 0x78
        Again = 0x79
        Undo = 0x7A
        Cut = 0x7B
        Copy = 0x7C
        Paste = 0x7D
        Find = 0x7E
        Mute = 0x7F
        VolumeUp = 0x80
        VolumeDown = 0x81
    }

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
        selector: Selector
        modifiers: Modifiers
        action: Action
    }

Presses a key or a sequence of keys down.

    command clear @ 0x81 {}

Clears all pressed keys.
