# Rotary encoder

    identifier: 0x10fa29c9
    extends: _sensor

An incremental rotary encoder - converts angular motion of a shaft to digital signal.

## Registers

    ro position: i32 # @ reading

Upon device reset starts at `0` (regardless of the shaft position).
Increases by `1` for a clockwise "click", by `-1` for counter-clockwise.

    const clicks_per_turn?: u16 # @ 0x180

This specifies by how much `position` changes when the crank does 360 degree turn. Typically 12 or 24.