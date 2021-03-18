# Button

    identifier: 0x1473a263
    extends: _sensor
    group: button
    tags: C, 8bit

A push-button, which returns to inactive position when not operated anymore.

## Registers

    ro pressed: bool @ reading

Indicates whether the button is currently active (pressed).

    rw click_hold_time = 1000: u32 { absolute_min=500 } ms @ 0x80

Threshold for `click` and `hold` events (see event descriptions below).

## Events

    event down @ active

Emitted when button goes from inactive (`pressed == 0`) to active.

    event up @ inactive { 
        time: u32 ms 
    } 

Emitted when button goes from active (`pressed == 1`) to inactive. The 'time' parameter 
records the amount of time between the down and up events.

    event click @ 0x80

Emitted together with `up` when the press time is not longer than `click_hold_time`.

    event hold @ 0x81

Emitted after the button is held for more than `click_hold_time`. Hold events are followed by a separate up event.
