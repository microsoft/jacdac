# Button

    identifier: 0x1473a263
    extends: _sensor
    group: button
    tags: C, 8bit

A push-button, which returns to inactive position when not operated anymore.

## Registers

    ro pressed: bool @ reading

Indicates whether the button is currently active (pressed).

    rw hold_time: u16 { absolute_min=500 } ms @ 0x80

The amount of time a button needs to be held for a `hold` event to be generated.

## Events

    event down @ active

Emitted when button goes from inactive (`pressed == 0`) to active.

    event up { time: u32 ms } @ inactive

Emitted when button goes from active (`pressed == 1`) to inactive. The 'time' parameter 
records the amount of time between the down and up events.

    event click @ 0x80

Emitted together with `up` when the press time was not longer than 500ms.

    event hold @ 0x81

Emitted after the button is held for more than `hold_time' (default/minimum 500ms). Hold events are followed by a separate up event.

