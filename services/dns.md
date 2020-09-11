# Device Name Service

    camel: DNS
    identifier: 0x119c3ad1

Assign names and functions to devices on JACDAC bus.


## Commands

    command get_name @ 0x80 {
        device_id: u64
    }
    report {
        device_id: u64
        name: string
    }

Get the name corresponding to given device identifer. Returns empty string if unset.

    command set_name @ 0x81 {
        device_id: u64
        name: string
    }

Set name. Can set to empty to remove name binding.

    command clear_all_names @ 0x84 {}

Remove all name bindings.

    command list_stored_names @ 0x82 {
        stored_names: pipe
    }
    pipe report stored_names {
        device_id: u64
        name: string
    }

Return all names stored internally.

    command list_required_names @ 0x83 {
        required_names: pipe
    }
    pipe report required_names {
        device_id: u64
        service_class: u32
        name: string
    }

List all names required by the current program. `device_id` is `0` if name is unbound.
