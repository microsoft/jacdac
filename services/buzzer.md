# Buzzer

    identifier: 0x1b57b1d7
    camel: buzzer
    group: sound
    tags: C, 8bit
    status: rc

A simple buzzer.

## Registers

    rw volume = 1: u0.8 / @ intensity

The volume (duty cycle) of the buzzer.

## Commands

    lowlevel command play_tone @ 0x80 {
        period: u16 us
        duty: u16 us
        duration: u16 ms
    }

Play a PWM tone with given period and duty for given duration.
The duty is scaled down with `volume` register.
To play tone at frequency `F` Hz and volume `V` (in `0..1`) you will want
to send `P = 1000000 / F` and `D = P * V / 2`.

    client command play_note @ 0x81 {
        frequency: u16 AudHz
        volume: u0.16 /
        duration: u16 ms
    }

Play a note at the given frequency and volume.
