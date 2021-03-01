# Robot Chassis

A bidirectional drive robot.

	identifier: 0x19f4d06b
	extends: _sensor

## Registers

    ro position @ reading {
	    x: i16.16 cm
		y: i16.16 cm
    	vx: i16.16 cm/s
        vy: i16.16 cm/s
		heading: i16.16 °		
    }
    
The current position and orientation of the robot.

    rw enabled: bool @ intensity

Turns on/off the robot motors.

    rw wheel_radius: u16.16 cm @ 0x80
    
Radius of the wheel. 

    rw base_length: u16.16 cm @ 0x81

The distance between the wheels.
