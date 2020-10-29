# CODAL Message Bus

    identifier: 0x1161590c
    
A service that allows passing events through the [CODAL Message Bus](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/)
* ``id`` is a unique identifier that identifies a component in the device. Use ``0`` to address all sources. The value of other identifiers is typically hardware dependent.
* ``event`` is an identifier that determines the event type. Use ``0`` as a wildcard.

## Commands

    command send @ 0x80 {
        id: u16
        event: u16
    }
    
Sends a new event on the message bus.
