# Record and Replay

    identifier: 0x1b72bf50
    group: sound
    tags: 8bit, padauk
    
A record and replay module. You can record a few seconds of audio and play it back.

## Commands

    command replay @ 0x80 {}
    
Replay cached audio.
    
    command record @ 0x81 {
        seconds: u16
    }
    
Record audio for N seconds.

## Registers

    rw seconds: u0.16 / @ intensity
    
Seconds of audio to record and play back.

