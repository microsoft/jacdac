# WSSK

    identifier: 0x13b739fe
    group: iot
    tags: infrastructure, devicescript
    camel: wssk

Defines a binary protocol for IoT devices to talk to DeviceScript gateway over encrypted websockets.
This is not used as a regular Jacdac service.

## Commands

    report error @ 0xff {
        message: string
    }

Issued when a command fails.

    command set_forwarding @ 0x90 {
        en: bool
    }

Enable/disable forwarding of all Jacdac frames.

    command ping_device @ 0x91 {
        payload: bytes
    }
    report {
        payload: bytes // currently not supported
    }

Send from gateway when it wants to see if the device is alive.
The device currently only support 0-length payload.

    command ping_cloud @ 0x92 {
        payload: bytes
    }
    report {
        payload: bytes
    }

Send from device to gateway to test connection.

    command get_hash @ 0x93 {}
    report {
        sha256: u8[32]
    }

Get SHA256 of the currently deployed program.

    command deploy_start @ 0x94 {
        size: u32 B
    }
    report {}

Start deployment of a new program.

    command deploy_write @ 0x95 {
        payload: bytes
    }
    report {}

Payload length must be multiple of 32 bytes.

    command deploy_finish @ 0x96 {}
    report {}

Finish deployment.

    enum DataType : u8 {
        Binary = 1
        JSON = 2
    }
    command c2d @ 0x97 {
        datatype: DataType
        payload: bytes
    }

Upload a labelled tuple of values to the cloud.
The tuple will be automatically tagged with timestamp and originating device.

    report d2c @ 0x98 {
        datatype: DataType
        payload: bytes
    }

Upload a binary message to the cloud.

    command jacdac_packet @ 0x99 {
        frame: bytes
    }
    report {
        frame: bytes
    }

Sent both ways.