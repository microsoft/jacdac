# Planar position

    identifier: 0x1dc37f55
    status: experimental
    tags: input

A sensor that repors 2D position, typically an optical mouse tracking sensor.

The sensor starts at an arbitrary origin (0,0) and reports the distance from that origin.

# Registers

    ro position @ reading {
        x: i22.10 mm
        y: i22.10 mm
    }

The current position of the sensor.

