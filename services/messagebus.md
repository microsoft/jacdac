# Message Bus

    identifier: 0x17feef9b
    
A lightweight event bus that allows to broadcast
short messages.

## Commands

    command send @ 1 {
        id: u16;
        name: u16;
    }

## Events

    event message @ 2 {
        id: u16;
        name: u16;
    }

A message event was raised on the message bus 
and is broadcasted as an event.