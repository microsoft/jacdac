# Speech synthesis

     identifier: 0x1204d995
     status: rc

A speech synthesizer

## Registers

    rw enabled: bool @ intensity

Determines if the speech engine is in a non-paused state.

    rw lang?: string @ 0x80

Language used for utterances as defined in https://www.ietf.org/rfc/bcp/bcp47.txt.

    rw volume? = 1: u0.8 / @ 0x81

Volume for utterances.

    rw pitch? = 1: u16.16 { absolute_max=2 } @ 0x82

Pitch for utterances

    rw rate? = 1: u16.16 { absolute_min=0.1, absolute_max=10 } @ 0x83

Rate for utterances

## Commands

    unique command speak @ 0x80 {
        text: string
    }

Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.

    command cancel @ 0x81 {}

Cancels current utterance and all utterances from the utterance queue.
