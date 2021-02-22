# Rotary encoder tests

## position changes on knob turn

    say turn the knob back and forth
    changes position

## clockwise turn registers positive

    establish position == 0
    say turn knob clockwise
    check position > 0

## counter-clockwise turn registers negative

    establish position == 0
    say turn knob counter-clockwise
    check position < 0

## one rotation clockwise

    establish position == 0
    say turn one complete rotation clockwise
    check position == clicks_per_turn

## one rotation counter-clockwise

    establish position == 0
    say turn one complete rotation counter-clockwise
    check position == -clicks_per_turn

## no missing value clockwise

    establish position == 0
    say slowly turn clockwise one complete rotation
    observe position 0...clicks_per_turn

## no missing value counter-clockwise

    establish position == 0
    say slowly turn counter-clockwise one complete rotation
    observe position 0...-clicks_per_turn

## check physical position clockwise

    establish position == 0
    say note physical position, quickly turn clockwise one complete rotation
    check position == clicks_per_turn
    ask same physical position?

## check physical position counter-clockwise

    establish position == 0
    say note physical position, quickly turn counter-clockwise one complete rotation
    check position == -clicks_per_turn
    ask same physical position?






