# Logger

    identifier: 0x12dc1fca
    tags: infrastructure, C
    status: stable

A service which can report messages to the bus.

## Registers

    enum Priority : u8 {
        Debug = 0,
        Log = 1,
        Warning = 2,
        Error = 3,
        Silent = 4
    }
    rw min_priority = 1: Priority @ 0x80

Messages with level lower than this won't be emitted. The default setting may vary.
Loggers should revert this to their default setting if the register has not been
updated in 3000ms, and also keep the lowest setting they have seen in the last 1500ms.
Thus, clients should write this register every 1000ms and ignore messages which are
too verbose for them.

## Commands

    report debug @ 0x80 {
        message: string
    }
    report log @ 0x81 {
        message: string
    }
    report warn @ 0x82 {
        message: string
    }
    report error @ 0x83 {
        message: string
    }

Report a message.
