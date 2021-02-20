# Rotary encoder manual tests

    say turn the knob back and forth
    changes position

    establish position != 0
    say press reset button 
    check position == 0

basic tests

    establish position == 0
    say turn knob clockwise
    check position > 0

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

    establish position == 0
    say slowly turn clockwise one complete rotation
    observe position 0...clicks_per_turn

    establish position == 0
    say slowly turn counter-clockwise one complete rotation
    observe position 0...-clicks_per_turn

    establish position == 0
    say note physical position, quickly turn clockwise one complete rotation
    check position == clicks_per_turn
    ask same physical position?

    establish position == 0
    say note physical position, quickly turn counter-clockwise one complete rotation
    check position == -clicks_per_turn
    ask same physical position?






