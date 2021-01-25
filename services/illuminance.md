# Illuminance

Measures light in Lux

    identifier: 0x1e6ecaf2
    extends: _sensor

## Registers

    ro light: u16.16 lux { typical_max=100000 } @ reading

The amount of illuminance, as lumens per square metre.

    ro light_error?: u16.16 lux @ reading_error

Error on the reported sensor value.
