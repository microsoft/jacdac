# UV index

The UV Index is a measure of the intensity of ultraviolet (UV) rays from the Sun. 

    identifier: 0x1f6e0d90
    extends: _sensor
    camel: uvIndex
    group: environment

## Registers

    ro uv_index: u16.16 uv { typical_max=11 } @ reading

Ultraviolet index, typically refreshed every second.

    ro uv_index_error?: u16.16 uv @ reading_error

Error on the UV measure.

    enum Variant: u8 {
        UVA_UVB = 1,
        Visible_IR = 2
    }
    const variant?: Variant @ variant

The type of physical sensor and capabilities.
