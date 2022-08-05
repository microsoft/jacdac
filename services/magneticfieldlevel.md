# Magnetic field level

    identifier: 0x12fe180f
    extends: _sensor
    group: environment
    tags: 8bit, padauk, input
    status: stable

A sensor that measures strength and polarity of magnetic field.

## Registers

    ro strength: i1.15 / @ reading

Indicates the strength of magnetic field between -1 and 1.
When no magnet is present the value should be around 0.
For analog sensors,
when the north pole of the magnet is on top of the module
and closer than south pole, then the value should be positive.
For digital sensors,
the value should either `0` or `1`, regardless of polarity.

    client ro detected : bool @ 0x181

Determines if the magnetic field is present.
If the event `active` is observed, `detected` is true; if `inactive` is observed, `detected` is false.

    enum Variant: u8 {
        AnalogNS = 1,
        AnalogN = 2,
        AnalogS = 3,
        DigitalNS = 4,
        DigitalN = 5,
        DigitalS = 6,
    }
    const variant?: Variant @ variant

Determines which magnetic poles the sensor can detected,
and whether or not it can measure their strength or just presence.

## Events

    event active @ active

Emitted when strong-enough magnetic field is detected.

    event inactive @ inactive

Emitted when strong-enough magnetic field is no longer detected.
