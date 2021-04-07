# Rotary encoder tests

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

    stepsUpTo(position, position + clicks_per_turn)

is the knob at the same physical position as when you started turning?

    ask()

## no missing value counter-clockwise

slowly turn counter-clockwise one complete rotation

    stepsDownTo(position, position - clicks_per_turn)

is the knob at the same physical position as when you started turning?

    ask()
