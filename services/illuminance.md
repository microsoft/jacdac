# Illuminance

Measures light in Lux

    identifier: 0x1e6ecaf2
    extends: _sensor

## Registers

    ro light: u16.16 lux { typical_min=0, typical_max=6555 } @ reading

The amount of illuminance, as lumens per square metre.