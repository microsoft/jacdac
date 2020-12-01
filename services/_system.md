# Common registers and commands

    camel: system

This file describes common register and command codes.
These are defined in ranges separate from the per-service ones.
No service actually derives from this file, but services can include packets
defined here.
Their code is listed as say `@ intensity` and not `@ 0x01` (the spectool enforces that).

## Commands

Command codes are subdivided as follows:
* Commands `0x000-0x07f` - common to all services
* Commands `0x080-0xeff` - defined per-service
* Commands `0xf00-0xfff` - reserved for implementation

Commands follow.

    command announce @ 0x00 { }
    report { ... }

Enumeration data for control service; service-specific advertisement data otherwise.
Control broadcasts it automatically every 500ms, but other service have to be queried to provide it.

    command get_register @ 0x1000 {}
    report { ... }

Registers number `N` is fetched by issuing command `0x1000 | N`.
The report format is the same as the format of the register.

    command set_register @ 0x2000 { ... }

Registers number `N` is set by issuing command `0x2000 | N`, with the format
the same as the format of the register.

    report event @ 0x01 {
        event_id: u32
        event_argument: u32
    }

Event from sensor or a broadcast service. 

    command calibrate @ 0x02 { }
    report { }

Request to calibrate a sensor. The report indicates the calibration is done.

    command description @ 0x03 { }
    report {
        text: string
    }

Request human-readable description of service.

## Registers

Register codes are subdivided as follows:
* Registers `0x001-0x07f` - r/w common to all services
* Registers `0x080-0x0ff` - r/w defined per-service
* Registers `0x100-0x17f` - r/o common to all services
* Registers `0x180-0x1ff` - r/o defined per-service
* Registers `0x200-0xeff` - custom, defined per-service
* Registers `0xf00-0xfff` - reserved for implementation, should not be seen on the wire

The types listed are typical. Check spec for particular service for exact type,
and a service-specific name for a register (eg. `value` could be `pulse_length`).
All registers default to `0` unless otherwise indicated.

    rw intensity: u32 @ 0x01

This is either binary on/off (0 or non-zero), or can be gradual (eg. brightness of an RGB LED strip).

    rw value: i32 @ 0x02

The primary value of actuator (eg. servo pulse length, or motor duty cycle).

    rw max_power = 500: u16 mA {typical_max = 500} @ 0x07

Limit the power drawn by the service, in mA.

    rw stream_samples: u8 @ 0x03

Asks device to stream a given number of samples
(clients will typically write `255` to this register every second or so, while streaming is required).

    rw streaming_interval = 100: u32 ms @ 0x04

Period between packets of data when streaming in milliseconds.

    ro reading: i32 @ 0x101

Read-only value of the sensor, also reported in streaming.

    rw low_threshold: i32 @ 0x05
    rw high_threshold: i32 @ 0x06

Thresholds for event generation for event generation for analog sensors.

    ro status_code @ 0x7 {
        code: u16
        vendor_code: u16
    }

Reports the current state or error status of the device. ``code`` is a standardized value from 
the JACDAC error codes. ``vendor_code`` is any vendor specific error code describing the device
state. This report is typically not queried, when a device has an error, it will typically
add this report in frame along with the anounce packet.
