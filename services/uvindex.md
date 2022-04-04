# UV index

    identifier: 0x1f6e0d90
    extends: _sensor
    camel: uvIndex
    group: environment
    tags: 8bit
    status: stable

The UV Index is a measure of the intensity of ultraviolet (UV) rays from the Sun.

## Registers

    ro uv_index: u16.16 uv { preferred_interval=1000, typical_max=11 } @ reading

Ultraviolet index, typically refreshed every second.

    ro uv_index_error?: u16.16 uv @ reading_error

Error on the UV measure.

    enum Variant: u8 {
        UVA_UVB = 1,
        Visible_IR = 2
    }
    const variant?: Variant @ variant

The type of physical sensor and capabilities.
