# Rotary encoder tests

## position changes on knob turn

    say "turn the knob back and forth"
    changes position

## clockwise turn registers positive

    let save = position
    say "turn knob clockwise"
    check position > save

## counter-clockwise turn registers negative

    let save = position
    say "turn knob counter-clockwise"
    check position < save

## one rotation clockwise

    let save = position
    say "turn one complete rotation clockwise"
    check position == save + clicks_per_turn

## one rotation counter-clockwise

    let save = position
    say "turn one complete rotation counter-clockwise"
    check position == save - clicks_per_turn

## no missing value clockwise

    let save = position
    say "slowly turn clockwise one complete rotation"
    observe position  [ save , save + clicks_per_turn ]

## no missing value counter-clockwise

    let save = position
    say "slowly turn counter-clockwise one complete rotation"
    observe position [ save , save - clicks_per_turn ]

## check physical position clockwise

    let save = position
    say "note knob's physical position"
    say "quickly turn clockwise one complete rotation"
    check position == save + clicks_per_turn
    ask "is the knob at the same physical position?"

## check physical position counter-clockwise

    let save = position
    say "note knob's physical position"
    say "quickly turn counter-clockwise one complete rotation"
    check position == save - clicks_per_turn
    ask "is the knob at the same physical position?"







