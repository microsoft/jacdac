#  Speech synthesis

     identifier: 0x1204d995

A speech synthesizer

## Registers

    ro speaking: bool @ reading

Reports if the engine is speaking.

    rw enabled: bool @ intensity

Determines if the speech engine is in a non-paused state.

    rw lang?: string @ 0x80

Default language used for utterances.

    rw volume?: u8 / @ 0x81

Default volume for utterances

    rw pitch?: u8 / @ 0x82

Default pitch for utterances

    rw rate?: u8 / @ 0x83

Default rate for utterances

## Commands

    command speak @ 0x80 {
        text: string
    }

Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.

    command cancel @ 0x81 {}

Cancels all utterances from the utterance queue.
