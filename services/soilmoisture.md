# Soil moisture

    identifier: 0x1d4aa3b3
    extends: _sensor

A soil moisture sensor.

## Registers

    ro moisture: u16 / @ reading

Indicates the wetness of the soil, from ``dry`` to ``wet``.

    enum Variant: u8 {
         Resistive = 1
         Capacitive = 2
    }
    const variant?: Variant @ variant

Describe the type of physical sensor.
