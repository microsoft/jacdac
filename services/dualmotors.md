# Dual Motors

    identifier: 0x1529d537
    group: motor

A synchronized pair of motors.

## Registers

    rw speed @ value {
        left: i1.15 /
        right: i1.15 /
    }

Relative speed of the motors. Use positive/negative values to run the motor forwards and backwards.
A speed of ``0`` while ``enabled`` acts as brake.

    rw enabled: bool @ intensity

Turn the power to the motors on/off.

    const load_torque?: u16.16 kg/cm @ 0x180

Torque required to produce the rated power of an each electrical motor at load speed.

    const load_rotation_speed?: u16.16 rpm @ 0x181

Revolutions per minute of the motor under full load.

    const reversible?: bool @ 0x182

Indicates if the motors can run backwards.

