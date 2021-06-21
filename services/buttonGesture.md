# Button Gesture

    identifier: 0x1421a39d
    extends: _sensor
    group: button
    tags: C, 8bit, padauk

An abstract button supporting high-level feature events like click, click-and-hold, double-click, and double-click-and-hold.


## Events

TODO: is held time useful at all for a high-level gesture service?



    event click @ 0x85 {
    }

Emitted when the button is clicked (down, then up shortly after).
Event emitted on the release edge.

    event clickHold @ 0x86 {
    }

Emitted when the button is clicked and held (down, and held for some period of time).

    event doubleClick @ 0x87 {
    }

Emitted when the button is double-clicked.
Note that a separate (single) click event is generated on the first edge, to allow the events to be responsive.

    event multiClick @ 0x88 {
        clicks: u32
    }

    event multiClickHold @ 0x89 {
        clicks: u32
    }

    event holdRelease @ 0x90 {
        heldTime: u32 ms
    }

Emitted when the button is released after a click-and-hold event.
`heldTime` is the total time the button is held down (not including any prior clicks, eg for a double-click-into-hold)
