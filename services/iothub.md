# Azure IoT Hub

    identifier: 0x19ed364c
    camel: iotHub

Send messages, receive commands, and work with device twins in Azure IoT Hub.

## Commands

    command connect @ 0x80 {
        connection_string: string
    }
    report {}

Connection string typically looks something like 
`HostName=my-iot-hub.azure-devices.net;DeviceId=my-dev-007;SharedAccessKey=xyz+base64key`.
You can get it in `Shared access policies -> iothubowner -> Connection string-primary key` in the Azure Portal.

    command disconnect @ 0x81 {}

Disconnect from current Hub if any.

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

    meta pipe report sub_properties @ 0x01 {
    repeats:
        property_name: string0
        property_value: string0
    }

If there are any properties, this meta-report is send one or more times.
All properties of a given message are always sent before the body.

    pipe report devicebound {
        body: bytes
    }

For every message, the body is sent once, using this report.

    command get_twin @ 0x85 {
        twin_result: pipe
    }

Ask for current device digital twin.

    pipe report twin_json {
        json: bytes
    }

The JSON-encoded twin; note that there can be several packets that need to be concatenated.
The pipe is closed when the last packet is sent.
This is typically something like:
`{ "desired": { "foo": 1, "$version": 12 }, "reported": { "foo": 1, "bar" 2, "$version": 123 } }`

    meta pipe report twin_error @ 0x01 {
        status_code: u32
    }

This emitted if status is not 200.

    command patch_twin @ 0x86 {}
    report {
        patch_port: pipe_port
    }

Start twin update.

    pipe command twin_patch_json {
        json: bytes
    }

The JSON-encoded twin update. The pipe should be closed when the last packet is sent.
You just send updates for `reported` field, like this:
`{ "bar": 3, "baz": null }` (skip `"$version"` and no `"reported": { ... }`).

    command subscribe_twin @ 0x87 {
        twin_updates: pipe
    }

Subscribe to updates to our twin.

    pipe report twin_update_json {
        json: bytes
    }

Every back-end change is sent as one or more reports like this.

    meta pipe report twin_update_end @ 0x01 {}

This is send after last `twin_update_json` packet for a given update.

    command subscribe_method @ 0x88 {
        method_call: pipe
    }

Subscribe to direct method calls.

    pipe report method_call_body {
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
        json: bytes
    }

The pipe should be closed when the last packet of response body is sent.

## Registers

    ro is_connected: bool @ 0x180

Indicates whether or not we are currently connected to an IoT hub.

## Events

    event connected @ 0x01

Emitted upon successful connection.

    event connection_error @ 0x02 {
        reason: string
    }

Emitted when connection was lost.

    event devicebound_str @ 0x03 {
        msg: string0
    repeats:
        property_name: string0
        property_value: string0 
    }

This event is emitted upon reception of a cloud to device message, that is a string
and fits in a single event packet.
For reliable reception, use the `subscribe` command above.
