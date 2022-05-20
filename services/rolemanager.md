# Role Manager

Assign roles to services on the Jacdac bus.

    identifier: 0x1e4b7e66
    tags: infrastructure

## Role allocation

Internally, the role manager stores a mapping from role name to `(device_id, service_idx)`.
Users refer to services by using role names (eg., they instantiate an accelerometer client with a given role name).
Each client has a role, and roles are unique to clients
(ie., one should not have both a gyro and accelerometer service with role `left_leg`).

The simplest recommended automatic role assignment algorithm is as follows:

```text
roles.sort(strcmp() on UTF-8 representation of role name)
devices.sort(by device identifier (lexicographic on 8 byte string))
move self device to beginning of devices list
for every role
  if role is not assigned
    for every device
      for every service on device
        if serviceClass matches role
          if service is not assigned to any role
            assign service to role
```

Due to sorting, role names sharing a prefix will tend to be co-located on the single device.
For example, one can have roles `left_leg_acc`, `left_leg_gyro`, `right_leg_acc`, `right_leg_gyro`,
and assuming combined gyro+accelerometer sensors, the pairs will tend to be allocated to a single leg,
however the legs may be reversed.
In such a case the user can swap the physical sensors (note that left leg will always be assigned to
sensor with smaller device identifier).
Alternatively, the user can manually modify assignment using `set_role` command.


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
