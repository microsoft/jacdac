# Volatile organic compound

Measures equivalent VOC levels.

    identifier: 0x12a5b597
    extends: _sensor
    camel: voc

## Registers

     ro VOC: u22.10 ppm { typical_min=0, typical_max=1187 }  @ reading

Total volatile organic compound readings.

    ro VOC_error?: u22.10 ppm @ reading_error

Error on the reading data

    const min_VOC?: u22.10 ppm @ min_reading

Minimum measurable value

    const max_VOC?: u22.10 ppm @ max_reading

Minimum measurable value

    const conditioning_period?: u32 s @ 0x180

Time required to achieve good sensor stability before measuring after long idle period.