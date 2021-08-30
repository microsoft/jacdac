# Azure IoT Hub Health

    identifier: 0x1462eefc
    camel: azureIotHubHealth
    group: iot

Health and diagnostics information about the Azure Iot Hub connection.

## Registers

    ro hub_name: string @ 0x180

Something like `my-iot-hub.azure-devices.net`; empty string when not properly configured

    enum ConnectionStatus: u16 {
        Connected = 0
        Disconnected = 1

        Connecting = 2
        Disconnecting = 3
    }
    ro connection_status: ConnectionStatus @ 0x181

Indicates the status of connection. A message beyond the [0..3] range represents an HTTP error code.

    ro volatile statistics @ 0x182 {
        reading: u32
        event: u32
        twin_reported: u32
        twin_desired: u32
    }

Reads internal statistics about messages sent to the hub.

## Commands

    command twin @ 0x80 {
        twin_report : pipe
    }
    pipe report twin_report {
        content: string
    }

Returns the twin json payload.

    command connect @ 0x81 { }

Starts a connection to the IoT hub service

    command disconnect @ 0x82 { }

Starts disconnecting from the IoT hub service

    command ping @ 0x85 {
        payload: u32
    }

Commands the device to send a `ping` message to the hub with the given payload.

    restricted command set_connection_string @ 0x86 {
        connection_string: string
    }

Restricted command to override the existing connection string to the Azure IoT Hub.

## Events

    event connection_status_change @ change {
        connection_status: ConnectionStatus
    }

Raised when the connection status changes

    event twin_change @ 0x80 { }

Raised when the twin model is modified.
