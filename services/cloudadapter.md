# Cloud Adapter

    identifier: 0x14606e9c
    group: iot
    tags: infrastructure, devicescript
    restricted: true

Supports cloud connections to upload and download data.
Note that `f64` values following a label are not necessarily aligned.

## Commands

    command upload_json @ 0x80 {
        json: string
    }

Upload a JSON-encoded message to the cloud.

    command upload_binary @ 0x81 {
        payload: bytes
    }

Upload a binary message to the cloud.

## Registers

    ro connected: bool @ 0x180

Indicate whether we're currently connected to the cloud server.
When offline, `upload` commands are queued.

    ro connection_name: string @ 0x181

User-friendly name of the connection, typically includes name of the server
and/or type of cloud service (`"something.cloud.net (Provider IoT)"`).

## Events

    event on_json @ 0x80 {
        json: string
    }

Emitted when cloud send us a JSON message.

    event on_binary @ 0x81 {
        payload: bytes
    }

Emitted when cloud send us a binary message.

    event change @ change

Emitted when we connect or disconnect from the cloud.
