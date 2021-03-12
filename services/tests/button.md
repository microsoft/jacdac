# Button tests

## press and release

Press and release the button (once)

    say()
    events([down, up])

## quick press (click)

Quickly press and release the button (within 500ms of press)

    say()
    events([down, up, click])

## Long click

Press and hold the button for 500-1500ms and then release

    say()
    events([down, long_click, up])

## Hold

Press and hold the button for more than 1500ms 

    say()
    events([down, hold, up])

