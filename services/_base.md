# Base service

    camel: base

Base class for all services.

## Registers

    ro status_code? @ status_code {
        code: u16
        vendor_code: u16
    }

Reports the current state or error status of the device. ``code`` is a standardized value from 
the Jacdac status/error codes. ``vendor_code`` is any vendor specific error code describing the device
state. This report is typically not queried, when a device has an error, it will typically
add this report in frame along with the announce packet.

    event status_code_changed? @ status_code_changed {
        code: u16
        vendor_code: u16
    }

Notifies that the status code of the service changed.
