# Settings

    identifier: 0x1107dc4a
    camel: settings
    status: experimental

Non-volatile key-value storage interface for storing settings.

## Secrets

Entries with keys starting with `$` are considered secret.
They can be written normally, but they read as a single `0` byte,
unless they are empty, in which case the value returned is also empty.
These are typically used by other services on the same device.

## Commands

    command get @ 0x80 {
        key: string
    }
    report {
        key: string0
        value: bytes
    }

Get the value of given setting. If no such entry exists, the value returned is empty.

    restricted command set @ 0x81 {
        key: string0
        value: bytes
    }

Set the value of a given setting.

    restricted command delete @ 0x84 {
        key: string
    }

Delete a given setting.

    command list_keys @ 0x82 {
        results: pipe
    }
    pipe report listed_key {
        key: string
    }

Return keys of all settings.

    command list @ 0x83 {
        results: pipe
    }
    pipe report listed_entry {
        key: string0
        value: bytes
    }

Return keys and values of all settings.

    restricted command clear @ 0x85 { }

Clears all keys.

## Events

    event change @ change

Notifies that some setting have been modified.
