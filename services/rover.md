# Rover

A roving robot.

    identifier: 0x19f4d06b
    extends: _sensor
    status: experimental

## Registers

    ro kinematics @ reading {
        x: i16.16 cm
        y: i16.16 cm
        vx: i16.16 cm/s
        vy: i16.16 cm/s
        heading: i16.16 °		
    }
    
The current position and orientation of the robot.
