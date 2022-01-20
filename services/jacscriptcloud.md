# Jacscript Cloud

    identifier: 0x14606e9c
    group: iot
    tags: infrastructure

Supports cloud connections for Jacscript programs.
Note that `f64` values following a label are not necessarily aligned.

## Commands

    command upload @ 0x80 {
        label: string0
    repeats:
        value: f64
    }

Upload a labelled tuple of values to the cloud.
The tuple will be automatically tagged with timestamp and originating device.

    command get_twin @ 0x81 {
        path: string
    }
    report {
        path: string0
        value: f64
    }

Get a numeric field from the current device twin.
Path is dot-separated.

    command subscribe_twin @ 0x82 {
        path: string
    }

Subscribe to updates to twin at specific path.
Generates `twin_changed` events.

    enum CommandStatus : u32 {
        OK = 200
        NotFound = 404
        Busy = 429
    }
    command ack_cloud_command @ 0x83 {
        seq_no: u32
        status: CommandStatus
    repeats:
        result: f64
    }

Should be called by jacscript when it finishes handling a `cloud_command`.

## Registers

    ro connected: bool @ 0x180

Indicate whether we're currently connected to the cloud server.
When offline, `upload` commands are queued, and `get_twin` respond with cached values.

## Events

    event twin_changed @ 0x80 {
        path: string0
        value: f64
    }

Emitted when a twin is updated at given path.
It will be also emitted once immediately after `subscribe_twin`.

    event cloud_command @ 0x81 {
        seq_no: u32
        command: string0
    repeats:
        argument: f64
    }

Emitted when cloud requests jacscript to run some action.