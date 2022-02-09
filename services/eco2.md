# Equivalent CO₂

Measures equivalent CO₂ levels.

    identifier: 0x169c9dc6
    extends: _sensor
    camel: eCO2
    group: environment
    tags: 8bit
    status: rc

## Registers

    ro e_CO2: u22.10 ppm { typical_min=400, typical_max=8192, preferred_interval=1000 }  @ reading

Equivalent CO₂ (eCO₂) readings.

    ro e_CO2_error?: u22.10 ppm @ reading_error

Error on the reading value.

    const min_e_CO2: u22.10 ppm @ min_reading

Minimum measurable value

    const max_e_CO2: u22.10 ppm @ max_reading

Minimum measurable value

    enum Variant: u8 {
        VOC = 1,
        NDIR = 2
    }
    const variant?: Variant @ variant

Type of physical sensor and capabilities.
