# Equivalent CO²

Measures equivalent CO² levels.

    identifier: 0x169c9dc6
    extends: _sensor
    camel: eCO2

## Registers

    ro e_CO2: u22.10 ppm { typical_min=400, typical_max=8192, preferred_interval=1000 }  @ reading

Equivalent CO² (eCO²) readings.

    ro e_CO2_error: u22.10 ppm @ reading_error

Error on the reading value.

    const min_e_CO2?: u22.10 ppm @ min_reading

Minimum measurable value

    const max_e_CO2?: u22.10 ppm @ max_reading

Minimum measurable value

    const conditioning_period?: u32 s @ 0x180

Time required to achieve good sensor stability before measuring after long idle period.

    enum Variant: u8 {
        VOC = 1,
        NDIR = 2
    }
    const variant?: Variant @ variant

Type of physical sensor and capabilities.