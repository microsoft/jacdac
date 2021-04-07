#  Sound level tests

## loud event followed by quiet event

Make a loud noise and then be quiet

    check(sound_level > loud_threshold)
    nextEvent(loud)
    check(sound_level < quiet_threshold)
    nextEvent(quiet)
