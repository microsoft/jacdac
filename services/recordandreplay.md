# Record and Replay

    identifier: 0x1b72bf50
    group: sound
    tags: 8bit, padauk
    
A record and replay module. You can record a few seconds of audio and play it back.

## Commands

    command replay @ 0x80 {}
    
Replay cached audio.
    
    command record @ 0x81 {
        milliseconds: u16 ms
    }
    
Record audio for N milliseconds.

    cancel record @ 0x82 {}
    
Cancel record, the `time` register will be updated by already cached data.

## Registers

    enum Status: u8 {
        Idle = 0
        Recording = 1
        Playing = 2
    }

    ro status: Status @ value

Indicate the current status 

    ro time: u16 ms / @ 0x180
    
Milliseconds of audio recorded.

    rw volumn?: u8 @ intensity

Playback volumn control 

