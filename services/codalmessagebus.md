# CODAL Message Bus

    identifier: 0x121ff81d
    camel: codalMessageBus
    
A service that uses the [CODAL message bus](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/) to send and receive small messages.

You can find known values for `source` in [CODAL repository](https://github.com/lancaster-university/codal-core/blob/master/inc/core/CodalComponent.h)
In MakeCode, you can listen for custom `source`, `value` values using [control.onEvent](https://makecode.microbit.org/reference/control/on-event].

## Commands

    unique command send @ 0x80 {
       source: u16
       value: u16
    }

Send a message on the CODAL bus. If `source` is `0`, it is treated as wildcard.

## Events

    event message @ 0x80 {
       source: u16
       value: u16
    }

Raised by the server is triggered by the server. The filtering logic of which event to send over Jacdac is up to the server implementation.
