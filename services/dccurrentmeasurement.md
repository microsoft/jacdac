# DC Current Measurement

    identifier: 0x1912c8ae
    status: experimental
    extends: _sensor
    camel: dcCurrentMeasurement
    
A service that reports a current measurement.

## Registers

    const measurement_name: string @ 0x182
A string containing the net name that is being measured e.g. `POWER_DUT` or a reference e.g. `DIFF_DEV1_DEV2`. These constants can be used to identify a measurement from client code.

    ro measurement: f64 A @ reading
    
The current measurement.

    ro measurement_error?: f64 A @ reading_error

Absolute error on the reading value.

    const min_measurement?: f64 A @ min_reading

Minimum measurable current

    const max_measurement?: f64 A @ max_reading

Maximum measurable current
