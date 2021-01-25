# UV index

The UV Index is a measure of the intensity of ultraviolet (UV) rays from the Sun. 

    identifier: 0x1f6e0d90
    extends: _sensor

## Registers

    ro uv_index: u16.16 uv { absolute_min=0, typical_max=11 } @ reading

Ultraviolet index, typically refreshed every second.

    enum Variant: u8 {
        UVA_UVB = 1,
        Visible_IR = 2
    }
    const variant?: Variant @ variant

The type of physical sensor and capabilities.
