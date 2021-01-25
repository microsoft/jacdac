# Illuminance

Measures light in Lux

    identifier: 0x1e6ecaf2
    extends: _sensor

## Registers

    ro light: u22.10 lux { typical_max=100000 } @ reading

The amount of illuminance, as lumens per square metre.

    ro light_error?: u22.10 lux @ reading_error

Error on the reported sensor value.
