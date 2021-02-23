# Azure IoT Hub

    identifier: 0x19ed364c
    camel: iotHub
    tags: iot

Send messages, receive commands, and work with device twins in Azure IoT Hub.

## Commands

    command connect @ 0x80 {}

Try connecting using currently set `connection_string`.
The service normally preiodically tries to connect automatically.

    command disconnect @ 0x81 {}

Disconnect from current Hub if any.
This disables auto-connect behavior, until a `connect` command is issued.

    command send_string_msg @ 0x82 {
        msg: string0
    repeats:
        property_name: string0
        property_value: string0
    }
    report {}

Sends a short message in string format (it's typically JSON-encoded). Multiple properties can be attached.

    command send_msg_ext @ 0x83 {}
    report {
        message: pipe_port
    }

Sends an arbitrary, possibly binary, message. The size is only limited by RAM on the module.

    pipe command message {
    segmented:
        body: bytes
    }

Part of the body of the message.

    meta pipe command properties @ 0x01 {
    repeats:
        property_name: string0
        property_value: string0
    }

Set properties on the message. Can be repeated multiple times.

    command subscribe @ 0x84 {
        devicebound: pipe
    }

Subscribes for cloud to device messages, which will be sent over the specified pipe.

    meta pipe report devicebound_properties @ 0x01 {
    repeats:
        property_name: string0
        property_value: string0
    }

If there are any properties, this meta-report is send one or more times.
All properties of a given message are always sent before the body.

    pipe report devicebound {
    multi-segmented:
        body: bytes
    }

For every message, the body is sent in one or more reports like this.

    command get_twin @ 0x85 {
        twin_result: pipe
    }

Ask for current device digital twin.

    pipe report twin_json {
    segmented:
        json: bytes
    }

The JSON-encoded twin. This is typically something like:
`{ "desired": { "foo": 1, "$version": 12 }, "reported": { "foo": 1, "bar" 2, "$version": 123 } }`

    meta pipe report twin_error @ 0x01 {
        status_code: u32
    }

This emitted if status is not 200.

    command subscribe_twin @ 0x87 {
        twin_updates: pipe
    }

Subscribe to updates to our twin.

    pipe report twin_update_json {
    multi-segmented:
        json: bytes
    }

First, the current value of the twin is sent (this includes desired and reported properties).
Next updates done by the back-end are streamed as they arrive (they only include the desired properties).

    command patch_twin @ 0x86 {}
    report {
        patch_port: pipe_port
    }

Start twin update.

    pipe command twin_patch_json {
    segmented:
        json: bytes
    }

The JSON-encoded twin update. The pipe should be closed when the last packet is sent.
You just send updates for `reported` field, like this:
`{ "bar": 3, "baz": null }` (skip `"$version"` and no `"reported": { ... }`).

    command subscribe_method @ 0x88 {
        method_call: pipe
    }

Subscribe to direct method calls.

    pipe report method_call_body {
    multi-segmented:
        json: bytes
    }

The method call body is sent using these packets.
If the body is empty, a single empty `method_call_body` is sent.

    meta pipe report method_call @ 0x01 {
        method_name: string0
        request_id: string0
    }

This is sent after the last part of the `method_call_body`.

    command respond_to_method @ 0x89 {
        status: u32
        request_id: string0
    }
    report {
        response_body: pipe_port
    }

Respond to a direct method call (`request_id` comes from `subscribe_method` pipe).

    pipe command method_response {
    segmented:
        json: bytes
    }

The pipe should be closed when the last packet of response body is sent.

## Registers

    ro connection_status: string @ 0x180

Returns `"ok"` when connected, and an error description otherwise.

    rw connection_string: string @ 0x80

Connection string typically looks something like 
`HostName=my-iot-hub.azure-devices.net;DeviceId=my-dev-007;SharedAccessKey=xyz+base64key`.
You can get it in `Shared access policies -> iothubowner -> Connection string-primary key` in the Azure Portal.
This register is write-only.
You can use `hub_name` and `device_id` to check if connection string is set, but you cannot get the shared access key.

    ro hub_name: string @ 0x181

Something like `my-iot-hub.azure-devices.net`; empty string when `connection_string` is not set.

    ro device_id: string @ 0x182

Something like `my-dev-007`; empty string when `connection_string` is not set.


## Events

    event connected @ 0x80

Emitted upon successful connection.

    event connection_error @ 0x81 {
        reason: string
    }

Emitted when connection was lost.

    event devicebound_str @ 0x82 {
        msg: string0
    repeats:
        property_name: string0
        property_value: string0 
    }

This event is emitted upon reception of a cloud to device message, that is a string
(doesn't contain NUL bytes) and fits in a single event packet.
For reliable reception, use the `subscribe` command above.
