# Rotary encoder manual tests

test1

    say turn the knob back and forth
    changes position

test2

    establish position != 0
    say press reset button 
    check position == 0

clockwise

    establish position == 0
    say turn knob clockwise
    check position > 0

counter-clockwise

    establish position == 0
    say turn knob counter-clockwise
    check position < 0

turning each direction works

    establish position == 0
    say turn one complete rotation clockwise
    check position == clicks_per_turn

    establish position == 0
    say turn one complete rotation counter-clockwise
    check position == -clicks_per_turn

one complete rotation

    establish position == 0
    say slowly turn clockwise one complete rotation
    observe position 0...clicks_per_turn

    establish position == 0
    say slowly turn counter-clockwise one complete rotation
    observe position 0...-clicks_per_turn

one complete rotation, slowly

    establish position == 0
    say note physical position, quickly turn clockwise one complete rotation
    check position == clicks_per_turn
    ask same physical position?

    establish position == 0
    say note physical position, quickly turn counter-clockwise one complete rotation
    check position == -clicks_per_turn
    ask same physical position?






