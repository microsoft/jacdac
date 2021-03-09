# Rotary encoder tests

## knob turn

turn the knob back and forth
    
    say()
    changes(position)

## clockwise turn

turn the knob clockwise

    say()
    increases(position)

## counter-clockwise turn

turn the knob counter-clockwise

    say()
    decreases(position)

## one rotation clockwise

turn one complete rotation clockwise

    say()
    increasesBy(position, clicks_per_turn)

## one rotation counter-clockwise

turn one complete rotation counter-clockwise
    
    say()
    decreasesBy(position, clicks_per_turn)

## no missing value clockwise

slowly turn clockwise one complete rotation

    say()
    rangesFromUpTo(position, position, position + clicks_per_turn)

## no missing value counter-clockwise

slowly turn counter-clockwise one complete rotation

    say()
    rangesFromDownTo(position, position, position - clicks_per_turn)

## check physical position clockwise

note knob's physical position and quickly turn clockwise one complete rotation

    say()
    increasesBy(position, clicks_per_turn)

is the knob at the same physical position?

    ask()

## check physical position counter-clockwise

note knob's physical position and quickly turn counter-clockwise one complete rotation

    say()
    decreasesBy(position, clicks_per_turn)

is the knob at the same physical position?

    ask()

## reset test

reset test (automated)

    say()
    reset()
    check(position == 0)
