# Total volatile organic compound

Measures equivalent TVOC levels.

    identifier: 0x12a5b597
    extends: _sensor
    camel: TVOC

## Registers

     ro TVOC: u16 ppm { typical_min=0, typical_max=1187 }  @ reading

Total volatile organic compound readings.

    const min_TVOC?: u16 ppm @ min_reading

Minimum measurable value

    const max_TVOC?: u16 ppm @ max_reading

Minimum measurable value

    const conditioning_period?: u16 min @ 0x180

Time required to achieve good sensor stability before measuring after long idle period.