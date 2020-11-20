# Settings Storage

    identifier: 0x1107dc4a
    camel: settings

Non-volatile key-value storage interface for storing settings.

## Secrets

Entries with keys starting with `$` are considered secret.
They can be written normally, but they always read as a single `0` byte.
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

    command set @ 0x81 {
        key: string0
        value: bytes
    }

Set the value of a given setting. Empty value indicates that the setting should be deleted.

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
