# Role Manager

    identifier: 0x119c3ad1

Assign roles to devices on JACDAC bus.

## Registers

    ro all_roles_allocated: bool @ 0x181

Indicates if all required roles have been allocated to devices.

## Commands

    command get_role @ 0x80 {
        device_id: u64
    }
    report {
        device_id: u64
        role: string
    }

Get the role corresponding to given device identifer. Returns empty string if unset.

    command set_role @ 0x81 {
        device_id: u64
        role: string
    }

Set role. Can set to empty to remove role binding.

    command clear_all_roles @ 0x84 {}

Remove all role bindings.

    command list_stored_roles @ 0x82 {
        stored_roles: pipe
    }
    pipe report stored_roles {
        device_id: u64
        role: string
    }

Return all roles stored internally.

    command list_required_roles @ 0x83 {
        required_roles: pipe
    }
    pipe report required_roles {
        device_id: u64
        service_class: u32
        roles: string
    }

List all roles required by the current program. `device_id` is `0` if role is unbound.
