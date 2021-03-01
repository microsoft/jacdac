# Rotary encoder tests

## reset test

reset test (automated)
    reset()
    check(position == 0)

## knob turn

turn the knob back and forth
    changes(position)

## clockwise turn

turn the knob clockwise
    increases(position)

## counter-clockwise turn

turn the knob counter-clockwise
    decreases(position)

## one rotation clockwise

turn one complete rotation clockwise
    increasesBy(position, clicks_per_turn)

## one rotation counter-clockwise

turn one complete rotation counter-clockwise
    decreasesBy(position, clicks_per_turn)

## no missing value clockwise

slowly turn clockwise one complete rotation
    rangesFromUpTo(position, start(position), start(position) + clicks_per_turn)

## no missing value counter-clockwise

slowly turn counter-clockwise one complete rotation
    rangesFromDownTo(position, start(position), start(position) - clicks_per_turn)

## check physical position clockwise

note knob's physical position and quickly turn clockwise one complete rotation
    increasesBy(position, clicks_per_turn)
    ask("is the knob at the same physical position?")

## check physical position counter-clockwise

note knob's physical position and quickly turn counter-clockwise one complete rotation
    decreasesBy(position, clicks_per_turn)
    ask("is the knob at the same physical position?")






