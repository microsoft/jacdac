# Weight Scale

    identifier: 0x1f4d5040
    extends: _sensor
    tags: 8bit
    status: rc

A weight measuring sensor.

## Registers

    ro weight: u16.16 kg @ reading

The reported weight.

    ro weight_error?: u16.16 kg @ reading_error

The estimate error on the reported reading.

    rw zero_offset?: u16.16 kg @ 0x80
    
Calibrated zero offset error on the scale, i.e. the measured weight when nothing is on the scale.
You do not need to subtract that from the reading, it has already been done.

    rw gain?: u16.16 @ 0x81

Calibrated gain on the weight scale error.

    const max_weight?: u16.16 kg @ max_reading

Maximum supported weight on the scale.

    const min_weight?: u16.16 kg @ min_reading

Minimum recommend weight on the scale.

    const weight_resolution?: u16.16 kg @ reading_resolution

Smallest, yet distinguishable change in reading.

    enum Variant: u8 {
        Body = 1
        Food = 2
        Jewelry = 3
    }
    const variant?: Variant @ variant

The type of physical scale

## Commands

    command calibrate_zero_offset @ 0x80 { }

Call this command when there is nothing on the scale. If supported, the module should save the calibration data.

    command calibrate_gain @ 0x81 {
        weight: u22.10 g
    }

Call this command with the weight of the thing on the scale.
