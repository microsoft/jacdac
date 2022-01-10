# Sound Recorder with Playback

    identifier: 0x1b72bf50
    group: sound
    tags: 8bit, padauk
    
A record and replay module. You can record a few seconds of audio and play it back.

## Commands

    command play @ 0x80 {}
    
Replay recorded audio.
    
    command record @ 0x81 {
        duration: u16 ms
    }
    
Record audio for N milliseconds.

    command cancel @ 0x82 {}
    
Cancel record, the `time` register will be updated by already cached data.

## Registers

    enum Status: u8 {
        Idle = 0
        Recording = 1
        Playing = 2
    }
    ro status: Status @ 0x180

Indicate the current status 

    ro time: u16 ms @ 0x181
    
Milliseconds of audio recorded.

    rw volume?: u0.8 / @ intensity

Playback volume control 

