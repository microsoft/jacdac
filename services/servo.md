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
