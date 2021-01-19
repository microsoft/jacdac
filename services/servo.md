# Servo

    identifier: 0x12fc9103

Servo is a small motor with arm that can be pointing at a specific direction.

## Registers

    rw angle: i16.16 ° {typical_min = -90, typical_max = 90} @ value

Specifies the angle of the arm.

    rw enabled: bool @ intensity

Turn the power to the servo on/off.

    rw offset?: i16.16 ° @ 0x81

Correction applied to the angle to account for the servo arm drift.

    const min_angle?: i16.16 ° @ min_reading

Lowest angle that can be set.

    const max_angle?: i16.16 ° @ max_reading

Highest angle that can be set.

    enum Variant: u32 {
        PositionalRotation = 1,
        ContinuousRotation = 2,
        Linear = 3,
    }
    const variant: Variant @ variant

Specifies the type of thermometer.
* Positional Rotation Servos: Positional servos can rotate the shaft in about half of the circle,
with features to avoid over-rotating. Most servo have a range of 180° but some allow 270° or 360°.
* Continuous Rotation Servos: Continous servos can move in both clockwise and anticlockwise directions without restrictions. The angle is typically interpreted as a throttle.
* Linear Servos: linear servos are also like a positional servo, but with additional gears to the adjust the output from circular to back-and-forth.