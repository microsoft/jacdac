# Motor

    identifier: 0x17004cd8
    tags: C, 8bit

A bi-directional DC motor.

## Registers

    rw duty: i1.15 / @ value

PWM duty cycle of the motor. Use negative/positive values to run the motor forwards and backwards.
Positive is recommended to be clockwise rotation and negative counterclockwise. A duty of ``0`` 
while ``enabled`` acts as brake.

    rw enabled: bool @ intensity

Turn the power to the motor on/off.

    const load_torque?: u16.16 kg/cm @ 0x180

Torque required to produce the rated power of an electrical motor at load speed.

    const load_speed?: u16.16 rpm @ 0x181

Revolutions per minute of the motor under full load.