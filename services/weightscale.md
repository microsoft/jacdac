# Weight Scale

    identifier: 0x1f4d5040
    extends: _sensor

A weight measuring sensor.

## Registers

    ro weight: u16.16 g @ reading

The reported weight.

    ro weight_error?: u16.16 g @ reading_error

The estimate error on the reported reading.

    enum Variant: u32 {
        LoadCell = 1
    }
    const variant?: Variant @ variant

The type of physical scale

## Commands

    command calibrate_zero_offset @ 0x80 { }

Call this command when there is nothing on the scale. If supported, the module should save the calibration data.

    command calibrate_factor @ 0x81 {
        weight: u16.16 g
    }

Call this command with the weight of the thing on the scale.