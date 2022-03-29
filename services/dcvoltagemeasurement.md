# DC Voltage Measurement

    identifier: 0x1633ac19
    status: experimental
    extends: _sensor
    camel: dcVoltageMeasurement
    
A service that reports a voltage measurement.

## Registers

    enum VoltageMeasurementType:u8 {
        Absolute = 0,
        Differential = 1
    }

    const measurement_type: VoltageMeasurementType @ 0x181
The type of measurement that is taking place. Absolute results are measured with respect to ground, whereas differential results are measured against another signal that is not ground.

    const measurement_name: string @ 0x182
A string containing the net name that is being measured e.g. `POWER_DUT` or a reference e.g. `DIFF_DEV1_DEV2`. These constants can be used to identify a measurement from client code.

    ro measurement: f64 V @ reading
    
The voltage measurement.
