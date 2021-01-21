# Equivalent CO²

Measures equivalent CO² levels.

    identifier: 0x169c9dc6
    extends: _sensor
    camel: eCO2

## Registers

     ro e_CO2: u16 ppm { typical_min=400, typical_max=8192 }  @ reading

Equivalent CO² (eCO²) readings.

    const min_e_CO2?: u16 ppm @ min_reading

Minimum measurable value

    const max_e_CO2?: u16 ppm @ max_reading

Minimum measurable value

    const conditioning_period?: u16 min @ 0x180

Time required to achieve good sensor stability before measuring after long idle period.