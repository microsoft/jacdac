# Motor

    identifier: 0x17004cd8

A bi-directional DC motor.

## Registers

    rw duty: i16 frac @ value

PWM duty cycle of the motor. Use negative/positive values to run the motor forwards and backwards.
Positive is recommended to be clockwise rotation and negative counterclockwise.

    rw enabled: bool @ intensity

Turn the power to the motor on/off.
