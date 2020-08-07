# Servo

    identifier: 0x12fc9103

Servo is a small motor directed with a PWM signal.
This services fixes the servo period at 20ms, and the pulse can be regulated.

## Registers

    rw pulse: u32 us {typicalMin = 500, typicalMax = 2500} @ value

Specifies length of the pulse in microseconds. The period is always 20ms.

    rw enabled: bool @ intensity

Turn the power to the servo on/off.