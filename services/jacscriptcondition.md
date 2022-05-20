# Jacscript Condition

    identifier: 0x1196796d
    tags: infrastructure, jacscript
    restricted: true

Conditions are synthetic services used to synchronize threads of executions of a Jacscript VM.

## Commands

    command signal @ 0x80 {}

Triggers a `signalled` event.

## Events

    event signalled @ change {}

Triggered by `signal` command.
