# Rotary encoder manual tests

- prompt("turn the knob back and forth"):changes(position)
- establish(position != 0):prompt("press reset button"):check(position == 0)
- establish(position == 0);prompt("turn knob clockwise");check(position > 0)
- establish(position == 0);prompt("turn knob counter-clockwise"):check(position < 0)
- establish(position == 0);prompt("turn one complete rotation clockwise");check(position == clicks_per_turn)
- establish(position == 0);prompt("turn one complete rotation counter-clockwise");check(position == -clicks_per_turn)
- establish(position == 0);prompt("slowly turn clockwise one complete rotation");observe(position, 0...clicks_per_turn)
- establish(position == 0);prompt("slowly turn counter-clockwise one complete rotation");observe(position, 0...-clicks_per_turn)
- establish(position == 0);prompt("note physical position, quickly turn clockwise one complete rotation");check(position == clicks_per_turn);ask("same physical position")
- establish(position == 0);prompt("note physical position, quickly turn counter-clockwise one complete rotation");check(position == -clicks_per_turn);ask("observe same physical position")