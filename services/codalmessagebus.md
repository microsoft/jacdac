# CODAL Message Bus

    identifier: 0x1161590c
    
A service that allows passing events through the [CODAL Message Bus](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/)

## Commands

    command send @ 0x80 {
        source: u16
        value: u16
    }
    
Sends a new event on the message bus.
