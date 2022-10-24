# Azure IoT Hub Health

    identifier: 0x1462eefc
    camel: azureIotHubHealth
    group: iot
    status: rc
    tags: management

Health and diagnostics information about the Azure Iot Hub connection.

## Registers

    ro hub_name?: string @ 0x180

Something like `my-iot-hub.azure-devices.net` if available.

    ro hub_device_id?: string @ 0x181

Device identifier in Azure Iot Hub if available.

    enum ConnectionStatus: u16 {
        Connected = 1
        Disconnected = 2
        Connecting = 3
        Disconnecting = 4
    }
    ro connection_status: ConnectionStatus @ 0x182

Indicates the status of connection. A message beyond the [0..3] range represents an HTTP error code.

    rw push_period = 5000: u32 ms @ 0x80

How often to push data to the cloud.

    rw push_watchdog_period: u32 ms @ 0x81

If no message is published within given period, the device resets.
This can be due to connectivity problems or due to the device having nothing to publish.
Forced to be at least `2 * flush_period`.
Set to `0` to disable (default).

## Commands

    restricted command connect @ 0x81 { }

Starts a connection to the IoT hub service

    restricted command disconnect @ 0x82 { }

Starts disconnecting from the IoT hub service

    restricted command set_connection_string @ 0x86 {
        connection_string: string
    }

Restricted command to override the existing connection string to the Azure IoT Hub.

## Events

    event connection_status_change @ change {
        connection_status: ConnectionStatus
    }

Raised when the connection status changes

    event message_sent @ 0x80

Raised when a message has been sent to the hub.
