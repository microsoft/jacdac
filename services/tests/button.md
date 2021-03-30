# Button tests

## Press and release

Press and release the button (once)

    events([down, up])

## Hold event

Press and hold the button for more than 500ms, then release

    events([down, hold, up])

## Hold for 2 seconds (4 hold events)

Press and hold the button for 2 seconds, then release

    events([down, hold, hold, hold])
    nextEvent(up, up.time >= 2000 && up.time < 2500)

## Event timing for hold events

Press and hold the button for 2 seconds

    awaitEvent(hold, hold.time >= 500)
    nextEvent(hold, hold.time >= 1000)
    nextEvent(hold, hold.time >= 1500)
    nextEvent(hold, hold.time >= 2000)


