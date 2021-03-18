# Button tests

## press and release

Press and release the button (once)

    events([down, up])

## quick press (click)

Quickly press and release the button (within 500ms of press)

    events([down, up, click])

## Long click

Press and hold the button for 500-1500ms and then release

    events([down, long_click, up])

## Hold

Press and hold the button for more than 1500ms 

    events([down, hold])

