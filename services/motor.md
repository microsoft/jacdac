# Motor

    identifier: 0x17004cd8
    tags: C, 8bit
    status: rc

A DC motor.

## Registers

    rw speed: i1.15 / @ value

Relative speed of the motor. Use positive/negative values to run the motor forwards and backwards.
Positive is recommended to be clockwise rotation and negative counterclockwise. A speed of ``0`` 
while ``enabled`` acts as brake.

    rw enabled: bool @ intensity

Turn the power to the motor on/off.

    const load_torque?: u16.16 kg/cm @ 0x180

Torque required to produce the rated power of an electrical motor at load speed.

    const load_rotation_speed?: u16.16 rpm @ 0x181

Revolutions per minute of the motor under full load.

    const reversible?: bool @ 0x182

Indicates if the motor can run backwards.