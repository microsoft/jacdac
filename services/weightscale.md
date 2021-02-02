# Weight Scale

    identifier: 0x1f4d5040
    extends: _sensor

A weight measuring sensor.

## Registers

    ro weight: u22.10 g @ reading

The reported weight.

    ro weight_error?: u22.10 g @ reading_error

The estimate error on the reported reading.

    rw zero_offset: u22.10 g 0x80
    
Calibrated zero offset error on the scale, i.e. the measured weight when nothing is on the scale.

    rw gain: u16.16 g 0x81
    
Calibrated gain on the weight scale error.

    enum Variant: u32 {
        LoadCell = 1
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
