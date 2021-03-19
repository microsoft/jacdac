# Button tests

## press and release

Press and release the button (once)

    events([down, up])

## quick press (click)

Quickly press and release the button (within 500ms of press)

    events([down, up, click])

## Hold

Press and hold the button for more than 500ms 

    events([down, hold])

## Change threshold to five seconds

Press and hold the button for between two and five seconds

    assign(click_hold_time, 5000)
    events([down, up, click])

