# Distance

A sensor that determines the distance of an object without any physical contact involved.

        identifier:  0x141a6b8a
        extends: _sensor

## Registers

    ro distance: u6.10 m { typical_min=0.02, typical_max=4 } @ reading

Current distance from the object

    const min_range?: u6.10 m @ min_reading

Minimum measurable distance 

    const max_range?: u6.10 m @ max_reading

Maximum measurable distance

    enum Variant: u32 {
        Ultrasonic = 1,
        Infrared = 2,
        LiDAR = 3,
        TimeOfFlight = 4,
    }
    const variant?: Variant @ variant

Determines the type of sensor used.
