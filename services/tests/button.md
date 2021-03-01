# Button tests

## downUp: press down and up
    
press the button and release it immediately
    ask("did you observe an Up event, followed by a Down event?")

## click: click the button

press the button down for 500ms and less than 1500ms and release it
    ask("did you observe a Click event?")

## long click: hold the button

press the button down at least 1500ms and release it
    ask("did you observe a LongClick event?")
