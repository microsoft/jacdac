# Power supply
    
    identifier: 0x1f40375f
    status: experimental
    
A power supply with a static or variable voltage range

## Registers

    rw enabled: bool @ intensity;

Turns the power supply on with `true`, off with `false`. 
    
    rw output_voltage: u16.16 @ value
    
The current output voltage of the power supply. Values provided must be in the range `minimum_voltage` to `maximum_voltage`

    const minimum_voltage: u16.16 @ min_reading
    
The minimum output voltage of the power supply. For static power supplies, `minimum_voltage` should be equal to `maximum_voltage`.

    const maximum_voltage: u16.16 @ max_reading
    
The maximum output voltage of the power supply. For static power supplies, `minimum_voltage` should be equal to `maximum_voltage`.

