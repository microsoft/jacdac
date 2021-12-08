# Distance

A sensor that determines the distance of an object without any physical contact involved.

    identifier:  0x141a6b8a
    extends: _sensor
    tags: 8bit
    status: rc

## Registers

    ro distance: u16.16 m { typical_min=0.02, typical_max=4 } @ reading

Current distance from the object

    ro distance_error?: u16.16 m @ reading_error

Absolute error on the reading value.

    const min_range?: u16.16 m @ min_reading

Minimum measurable distance

    const max_range?: u16.16 m @ max_reading

Maximum measurable distance

    enum Variant: u8 {
        Ultrasonic = 1,
        Infrared = 2,
        LiDAR = 3,
        Laser = 4,
    }
    const variant?: Variant @ variant

Determines the type of sensor used.
