# Power supply
    
    identifier: 0x1f40375f
    
A power supply with a static or variable voltage range

## Registers

    rw enabled: u8 @ 0x81;

Turns the power supply on with a non-zero value, off with a zero value. 
    
    rw output_voltage: u16.16 @0x82
    
The current output voltage of the power supply. Values provided must be in the range `minimum_voltage` to `maximum_voltage`

    const minimum_voltage: u16.16 @ 0x181
    
The minimum output voltage of the power supply. For static power supplies, `minimum_voltage` should be equal to `maximum_voltage`.

    const maximum_voltage: u16.16 @ 0x182
    
The maximum output voltage of the power supply. For static power supplies, `minimum_voltage` should be equal to `maximum_voltage`.

