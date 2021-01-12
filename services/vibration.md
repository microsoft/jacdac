# Vibration motor

    identifier: 0x183fc4a2

Control a vibration motor.

## Registers

    rw speed: u8 / @ intensity

Rotation speed of the motor.
If only one rotation speed is supported, then `0` shell be off, and any other number on.
