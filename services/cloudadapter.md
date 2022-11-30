# Cloud Adapter

    identifier: 0x14606e9c
    group: iot
    tags: infrastructure, devicescript

Supports cloud connections to upload and download data.
Note that `f64` values following a label are not necessarily aligned.

## Commands

    restricted command upload @ 0x80 {
        label: string0
    repeats:
        value: f64
    }

Upload a labelled tuple of values to the cloud.
The tuple will be automatically tagged with timestamp and originating device.

    restricted command upload_bin @ 0x81 {
        payload: bytes
    }

Upload a binary message to the cloud.

    enum CommandStatus : u32 {
        OK = 200
        NotFound = 404
        Busy = 429
    }
    lowlevel restricted command ack_cloud_command @ 0x83 {
        seq_no: u32
        status: CommandStatus
    repeats:
        result: f64
    }

Should be called when it finishes handling a `cloud_command`.

## Registers

    ro connected: bool @ 0x180

Indicate whether we're currently connected to the cloud server.
When offline, `upload` commands are queued, and `get_twin` respond with cached values.

    ro connection_name: string @ 0x181

User-friendly name of the connection, typically includes name of the server
and/or type of cloud service (`"something.cloud.net (Provider IoT)"`).

## Events

    lowlevel event cloud_command @ 0x81 {
        seq_no: u32
        command: string0
    repeats:
        argument: f64
    }

Emitted when cloud requests to run some action.

    event change @ change

Emitted when we connect or disconnect from the cloud.
