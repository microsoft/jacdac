# Azure IoT Hub

    identifier: 0x19ed364c
    camel: azureIotHub
    group: iot

Send messages, receive commands, and work with device twins in Azure IoT Hub.

## Commands

    command send_message @ 0x82 {
        body: string JSON
    }
    report {}

Sends a short message in string format (it's typically JSON-encoded).

    command connect @ 0x80 {}

Try connecting using currently set `connection_string`.
The service normally periodically tries to connect automatically.

    command disconnect @ 0x81 {}

Disconnect from current Hub if any.
This disables auto-connect behavior, until a `connect` command is issued.

## Registers

    ro connection_status: string @ 0x180

Returns `"ok"` when connected, empty `""` when disconnected, and an error description otherwise.

    const hub_name: string @ 0x181

Something like `my-iot-hub.azure-devices.net`; empty string when not properly configured

    const device_id: string @ 0x182

Something like `my-dev-007`; empty string when `connection_string` is not set.

## Events

    event message @ 0x82 {
        body: string JSON
    }

This event is emitted upon reception of a cloud to device message, that is a string
(doesn't contain NUL bytes) and fits in a single event packet.

    event connected @ 0x80

Raised when the device is connected to the hub.

    event disconnected @ 0x81

Raised when the device is disconnected to the hub. ``connection_status`` may contain information about the error.
