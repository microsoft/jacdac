# Illuminance

    identifier: 0x1e6ecaf2
    extends: _sensor
    tags: imaging

Detects the amount of light falling onto a given surface area.

Note that this is different from *luminance*, the amount of light that passes through, emits from, or reflects off an object.

## Registers

    ro light: u22.10 lux { typical_max=100000 } @ reading

The amount of illuminance, as lumens per square metre.

    ro light_error?: u22.10 lux @ reading_error

Error on the reported sensor value.
