# Message Bus

    identifier: 0x17feef9b
    
A lightweight event bus that allows to broadcast
short messages, similar to the Scratch message APIs.

## Commands

    command send @ 0x80 {
        msg: u32
    }

## Events

    event message @ 1 {
        msg: u32
    }

A message event was raised on the message bus 
and is broadcasted as an event.