# CODAL Message Bus

    identifier: 0x121ff81d
    status: experimental
    camel: codalMessageBus
    
A service that uses the [CODAL message bus](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/) to send and receive small messages.

## Commands

    command send @ 0x80 {
       source: u16
       value: u16
    }

Send a message on the CODAL bus. If `source` is `0`, it is treated as wildcard.

## Events

    event message @ 0x80 {
       source: u16
       value: u16
    }

Raised by the server is triggered by the server. The filtering logic of which event to send over JACDAC is up to the server implementation.
