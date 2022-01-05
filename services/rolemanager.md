# Role Manager

    identifier: 0x1e4b7e66
    tags: infrastructure

Assign roles to services on the Jacdac bus.

Internally, the role manager stores a mapping from `(device_id, service_idx)` to role name.
Users refer to services by using role names (eg., they instantiate an accelerometer client with a given role name).
Each client has a role, and roles are unique to clients
(ie., one should not have both a gyro and accelerometer service with role `left_leg`).

Role names can be hierarchical, using slash character as a separator.
Examples: `left_leg/acc`, `left_leg/gyro`, `right_leg/acc`.
If two roles share the prefix before first slash, it should be used as a hint that the services
should be co-located on a single device
(eg., here the `left_leg` "location" is expected to have both an accelerometer and a gyro service on a single device).

## Registers

    rw auto_bind = 1: bool @ 0x80

Normally, if some roles are unfilled, and there are idle services that can fulfill them,
the brain device will assign roles (bind) automatically.
Such automatic assignment happens every second or so, and is trying to be smart about
co-locating roles that share "host" (part before first slash),
as well as reasonably stable assignments.
Once user start assigning roles manually using this service, auto-binding should be disabled to avoid confusion.

    ro all_roles_allocated: bool @ 0x181

Indicates if all required roles have been allocated to devices.

## Commands

    command set_role @ 0x81 {
        device_id: devid
        service_idx: u8
        role: string
    }

Set role. Can set to empty to remove role binding.

    command clear_all_roles @ 0x84 {}

Remove all role bindings.

    command list_roles @ 0x83 {
        roles: pipe
    }
    pipe report roles {
        device_id: devid
        service_class: u32
        service_idx: u8
        role: string
    }

List all roles and bindings required by the current program. `device_id` and `service_idx` are `0` if role is unbound.

## Events

    event change @ change { }

Notifies that role bindings have changed.
