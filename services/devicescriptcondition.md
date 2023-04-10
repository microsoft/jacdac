# DeviceScript Condition

    identifier: 0x1196796d
    tags: infrastructure, devicescript
    restricted: true
    status: deprecated

Conditions are synthetic services used to synchronize threads of executions of a DeviceScript VM.
**This is no longer used**.

## Commands

    command signal @ 0x80 {}

Triggers a `signalled` event.

## Events

    event signalled @ change {}

Triggered by `signal` command.
