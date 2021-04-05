# Button tests

## Press and release

Press and release the button (once)

    events([down, up])

## Register and event correspondence

Press and release the button

    check(start(!pressed) && pressed)
    nextEvent(down)
    check(start(pressed) && !pressed)
    nextEvent(up)

## One hold event

Press and hold the button for more than 500ms, then release

    events([down, hold, up])

## Hold for three hold events

Press and hold the button for 3 hold events, then release

    events([down, hold, hold, hold])
    nextEvent(up, up.time >= 1500 && up.time < 2000)

## Event timing for hold events

Press and hold the button for 4 hold events

    awaitEvent(hold, hold.time >= 500)
    nextEvent(hold, hold.time >= 1000)
    nextEvent(hold, hold.time >= 1500)
    nextEvent(hold, hold.time >= 2000)

