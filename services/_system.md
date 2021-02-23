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

    rw streaming_samples: u8 @ 0x03

Asks device to stream a given number of samples
(clients will typically write `255` to this register every second or so, while streaming is required).

    rw streaming_interval = 100: u32 ms @ 0x04

Period between packets of data when streaming in milliseconds.

    ro reading: i32 @ 0x101

Read-only value of the sensor, also reported in streaming.

    const min_reading: i32 @ 0x104

The lowest value that can be reported by the sensor.

    const max_reading: i32 @ 0x105

The highest value that can be reported by the sensor.

    ro reading_error: u32 @ 0x106

The real value of whatever is measured is between `reading - reading_error` and `reading + reading_error`. It should be computed from the internal state of the sensor. This register is often, but not always `const`. If the register value is modified,
send a report in the same frame of the ``reading`` report.

    const reading_resolution: u32 @ 0x108

Smallest, yet distinguishable change in reading.

    enum ReadingThreshold: u8 {
        Neutral = 1
        Low = 2
        High = 3
    }
    rw low_threshold: i32 @ 0x05

Threshold when reading data gets low and triggers a ``low``.

    rw high_threshold: i32 @ 0x06

Thresholds when reading data gets high and triggers a ``high`` event.

    const streaming_preferred_interval: u32 ms @ 0x102

Preferred default streaming interval for sensor in milliseconds.

    const variant: u32 @ 0x107

The hardware variant of the service.
For services which support this, there's an enum defining the meaning.

    enum StatusCodes: u16 {
        Ready = 0

        Initializing = 1
        Calibrating = 2

        Sleeping = 3
        WaitingForInput = 4

        CalibrationNeeded = 100
    }
    ro status_code? @ 0x103 {
        code: StatusCodes
        vendor_code: u16
    }

Reports the current state or error status of the device. ``code`` is a standardized value from 
the Jacdac status/error codes. ``vendor_code`` is any vendor specific error code describing the device
state. This report is typically not queried, when a device has an error, it will typically
add this report in frame along with the announce packet.

    const instance_name?: string @ 0x109

A friendly name that describes the role of this service instance in the device.

## Events

Events codes are 8-bit and are subdivided as follows:
* Events `0x00-0x7f` - common to all services
* Events `0x80-0xff` - defined per-service

    event active @ 0x01 { }

Notifies that the service has been activated (eg. button pressed, network connected, etc.)

    event inactive @ 0x02 { }

Notifies that the service has been dis-activated.

    event change @ 0x03 { }

Notifies that the some state of the service changed.

    event status_code_changed @ 0x04 {
        code: StatusCodes
        vendor_code: u16
    }

Notifies that the status code of the service changed.

    event low @ 0x05 {}

Notifies that the low threshold has been crossed

    event high @ 0x06 {}

Notifies that the high threshold has been crossed

    event neutral @ 0x07 {}

Notifies that the threshold is back between ``low`` and ``high``.
