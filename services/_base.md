# Base service

    camel: base

Base class for all services.

## Registers

    const instance_name?: string @ instance_name

A friendly name that describes the role of this service instance in the device.
It often corresponds to what's printed on the device:
for example, `A` for button A, or `S0` for servo channel 0.
Words like `left` should be avoided because of localization issues (unless they are printed on the device).

    ro status_code? @ status_code {
        code: u16
        vendor_code: u16
    }

Reports the current state or error status of the device. ``code`` is a standardized value from 
the Jacdac status/error codes. ``vendor_code`` is any vendor specific error code describing the device
state. This report is typically not queried, when a device has an error, it will typically
add this report in frame along with the announce packet. If a service implements this register,
it should also support the ``status_code_changed`` event defined below.

## Events

    event status_code_changed? @ status_code_changed {
        code: u16
        vendor_code: u16
    }

Notifies that the status code of the service changed.
