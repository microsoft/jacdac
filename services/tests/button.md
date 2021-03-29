# Button tests

## press and release

Press and release the button (once)

    events([down, up])

## Hold

Press and hold the button for more than 500ms, then release

    events([down, hold, up])

##  Hold for two seconds

Press and hold the button for two seconds, then release

    events([down, hold, hold, hold, up])
