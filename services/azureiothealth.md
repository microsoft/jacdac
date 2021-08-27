# Azure IoT Health

    identifier: 0x1462eefc
    
Health and diagnostics information about the Azure Iot Hub connection.

## Registers

    ro hub: string @ 0x180
    
Name of the connected hub, if any.    

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
    
Returns the twin json payload

    command connect @ 0x81 { }
    
Starts a connection to the IoT hub service

    command disconnect @ 0x82 { }

Starts disconnecting from the IoT hub service

    command identify @ 0x83 {
        device_id: u64
    }

Route an ``identify`` commands to the selected device

    command reset @ 0x84 {
        device_id: u64
    }

Route a ``reset`` commands to the selected device

    command ping @ 0x85 {
        payload: u32
    }

Commands the device to send a ``ping`` message to the hub with the given payload.

    restricted command set_connection_string @ 0x86 { }
    report {
        connection_string_port: pipe_port
    }

Restricted command to override the existing connection string to the Azure IoT Hub.

## Events

    event twin_change @ change { }
    
Raised when the twin model or reported values are modified.

    event connection_status_change @ 0x80 {
        connection_status: ConnectionStatus
    }

Raised when the connection status changes
