# Role Manager

    identifier: 0x1e4b7e66

Assign roles to services on the JACDAC bus.

Internally, the role manager stores a mapping from from `(device_id, service_idx)` to role name.
Users refer to services by using role names (eg., they instantiate an accelerometer client with a given role name).
Each client has a role, and roles are unique to clients
(ie., one should not have both a gyro and accelerometer service with role `left_leg`).

Role names can be hierarchical, using slash character as a separator.
Examples: `left_leg/acc`, `left_leg/gyro`, `right_leg/acc`.
If two roles share the prefix before first slash, it should be used as a hint that the services
should be co-located on a single device
(eg., here the `left_leg` "location" is expected to have both an accelerometer and a gyro service on a single device).

## Registers

    ro all_roles_allocated: bool @ 0x181

Indicates if all required roles have been allocated to devices.

## Commands

    command get_role @ 0x80 {
        device_id: devid
        service_idx: u8
    }
    report {
        device_id: devid
        service_idx: u8
        role: string
    }

Get the role corresponding to given device identifer. Returns empty string if unset.

    command set_role @ 0x81 {
        device_id: devid
        service_idx: u8
        role: string
    }

Set role. Can set to empty to remove role binding.

    command clear_all_roles @ 0x84 {}

Remove all role bindings.

    command list_stored_roles @ 0x82 {
        stored_roles: pipe
    }
    pipe report stored_roles {
        device_id: devid
        service_idx: u8
        role: string
    }

Return all roles stored internally.

    command list_required_roles @ 0x83 {
        required_roles: pipe
    }
    pipe report required_roles {
        device_id: devid
        service_class: u32
        service_idx: u8
        role: string
    }

List all roles required by the current program. `device_id` and `service_idx` are `0` if role is unbound.

## Events

    event change @ change { }

Emit notifying that the internal state of the service changed.