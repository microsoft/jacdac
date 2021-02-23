# Servo

    identifier: 0x12fc9103

Servo is a small motor with arm that can be pointing at a specific direction.

The `min/max_angle/pulse` may be read-only if the servo is permanently affixed to its Jacdac controller.

## Registers

    rw angle: i16.16 ° { typical_min=-90, typical_max=90 } @ value

Specifies the angle of the arm.

    rw enabled: bool @ intensity

Turn the power to the servo on/off.

    rw offset: i16.16 ° @ 0x81

Correction applied to the angle to account for the servo arm drift.

    rw min_angle = -90: i16.16 ° @ 0x82

Lowest angle that can be set.

    rw min_pulse = 500: u16 us @ 0x83

The length of pulse corresponding to lowest angle.

    rw max_angle = 90: i16.16 ° @ 0x84

Highest angle that can be set.

    rw max_pulse = 2500: u16 us @ 0x85

The length of pulse corresponding to highest angle.

    enum Variant: u8 {
        PositionalRotation = 1,
        Linear = 2,
    }
    const variant: Variant @ variant

Specifies the type of servo motor.
* Positional Rotation Servos: Positional servos can rotate the shaft in about half of the circle,
with features to avoid over-rotating. Most servo have a range of 180° but some allow 270° or 360°.
* Linear Servos: linear servos are also like a positional servo, but with additional gears to the adjust the output from circular to back-and-forth.

    const stall_torque?: u16.16 kg/cm @ 0x180

The servo motor will stop rotating when it is trying to move a ``stall_torque`` weight at a radial distance of ``1.0`` cm.

    const response_speed?: u16.16 s/60° @ 0x181

Time to move 60°.
