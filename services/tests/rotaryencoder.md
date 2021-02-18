# Rotary encoder tests

- twiddle the knob, see digital position value change
- from digital position != 0, on control reset sent message, check digital position is 0 (from now on "position" means "digital position" unless stated otherwise)
- from 0, turn clockwise, check position is > 0
- from 0, turn counter-clockwise, check < 0
- from 0, turn one complete rotation clockwise, check N (N = 12)
- from 0, turn one complete rotation counter-clockwise, check N (N=-12)
- from 0, turn slowly clockwise one complete rotation until N, check sequence of values [0...N]
- from 0, turn slowly counter-clockwise one complete rotation until N, check sequence of values [0...-N]
- from 0, mark physical position, turn quickly as possible clockwise, check N, observe same physical position
- from 0, mark physical position, turn quickly as possible counter-clockwise, check -N, observe same physical position