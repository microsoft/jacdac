# Microphone

    identifier: 0x113dac86
    group: sound
    status: experimental

A single-channel microphone.

## Commands

    command sample @ 0x81 {
        samples: pipe
        num_samples: u32
    }

The samples will be streamed back over the `samples` pipe.
If `num_samples` is `0`, streaming will only stop when the pipe is closed.
Otherwise the specified number of samples is streamed.
Samples are sent as `i16`.

## Registers

    rw sampling_period: u32 us @ 0x80

Get or set microphone sampling period.
Sampling rate is `1_000_000 / sampling_period Hz`.

