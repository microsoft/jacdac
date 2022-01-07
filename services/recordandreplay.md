# Record and Replay

    identifier: 0x1b72bf50
    group: sound
    tags: C, 8bit, padauk
    
A record and replay service for modules that may play/record stored music or sound files.

## Commands

    enum PlayType : u8 {
        None = 0x0
        Index = 0x1
        Filepath = 0x2
        Random = 0x3
        Next = 0x4
        Previous = 0x5
    }

    command play @ 0x80 {
        file: PlayType
        index?: u8
        path?: string
    }
    
Play stored audio. The first byte of payload indicates the sound file type, which could be index, a specific name or control commands. For device don't support multiples please use `None`.
    
    command record? @ 0x81 {
        milliseconds: u16 ms
        path?: string
    }
    
Record audio for N milliseconds, and save to dedicated file if supported.

    stop @ 0x82 {}
    
Stop current replay or record session.

    pause? @ 0x83 {}
    
Pause current play session, resumed by issuing a play command.

    rw sleep? @ 0x89 {
        seconds?: u16 s
    }

Put the device into sleep mode. Some implements may support sleep mode to save power for amplifier or the decoder DSP, awake by timer, or any onboard buttons. 

## Registers

    enum Status: u8 {
        Idle = 0
        Playing = 1
        Pause = 2
        Recording = 3
    }

    ro status: Status @ value

Indicate the current status 

    ro time?: u16 ms / @ 0x180
    
Milliseconds of the current filepointer.

    ro numfile?: u16 @ 0x181
    
Number of files stored in the module.

    rw volumn?: u8 @ intensity

Volumn control 

    rw samplerate?: u8 @ 0x08

Read the samplerate for current file or change the samplerate for recording.

    enum EQ: u8 {
        Normal = 0
        POP = 1
        ROCK = 2
        JAZZ = 3
        Classic = 4
    }
    rw effect?: u8 @ 0x05

Set the playback effect if supported.

## Events

    event stoped @ 0x02 {}

Emitted if the current playing/recording session is completed.


