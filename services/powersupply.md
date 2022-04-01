# Power supply
    
    identifier: 0x1f40375f
    status: experimental
    
A power supply with a fixed or variable voltage range

## Registers

    rw enabled: bool @ intensity;

Turns the power supply on with `true`, off with `false`. 
    
    rw output_voltage: f64 V @ value
    
The current output voltage of the power supply. Values provided must be in the range `minimum_voltage` to `maximum_voltage`

    const minimum_voltage: f64 V @ min_value
    
The minimum output voltage of the power supply. For fixed power supplies, `minimum_voltage` should be equal to `maximum_voltage`.

    const maximum_voltage: f64 V @ max_value
    
The maximum output voltage of the power supply. For fixed power supplies, `minimum_voltage` should be equal to `maximum_voltage`.

