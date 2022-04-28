# Servo

    identifier: 0x12fc9103
    tags: C
    status: rc

Servo is a small motor with arm that can be pointing at a specific direction.
Typically a servo angle is between 0° and 180° where 90° is the middle resting position.

The `min_pulse/max_pulse` may be read-only if the servo is permanently affixed to its Jacdac controller.

## Registers

    rw angle: i16.16 ° { typical_min=0, typical_max=180 } @ value

Specifies the angle of the arm (request).

    rw enabled: bool @ intensity

Turn the power to the servo on/off.

    rw offset: i16.16 ° @ 0x81

Correction applied to the angle to account for the servo arm drift.

    const min_angle = 0: i16.16 ° @ min_value

Lowest angle that can be set, typiclly 0 °.

    rw min_pulse? = 500: u16 us @ 0x83

The length of pulse corresponding to lowest angle.

    const max_angle = 180: i16.16 ° @ max_value

Highest angle that can be set, typically 180°.

    rw max_pulse? = 2500: u16 us @ 0x85

The length of pulse corresponding to highest angle.

    const stall_torque?: u16.16 kg/cm @ 0x180

The servo motor will stop rotating when it is trying to move a ``stall_torque`` weight at a radial distance of ``1.0`` cm.

    const response_speed?: u16.16 s/60° @ 0x181

Time to move 60°.

    ro actual_angle?: i16.16 ° @ reading

The current physical position of the arm, if the device has a way to sense the position.

