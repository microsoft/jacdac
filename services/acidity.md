# Acidity

    identifier: 0x1e9778c5
    extends: _sensor
    tags: C, 8bit
    group: environment

A sensor measuring water acidity, commonly called pH.

## Registers

    ro acidity: u4.12 pH { absolute_min=0, absolute_max=15, typical_min=2.5, typical_max=10.5, preferred_interval=5000 } @ reading

The acidity, pH, of water.

    ro acidity_error?: u4.12 pH @ reading_error

Error on the acidity reading.

    const min_acidity?: u4.12 pH @ min_reading

Lowest acidity that can be reported.

    const max_humidity?: u4.12 pH @ max_reading

Highest acidity that can be reported.
