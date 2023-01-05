# Serial

    identifier: 0x11bae5c4
    tags: io
    
An asynchronous serial communication service capable of sending and receiving buffers of data.

## Registers

    rw connected: bool @ intensity
    
Indicates if the serial connection is active.

    rw baud_rate: u32 # @ 0x80
    
A positive, non-zero value indicating the baud rate at which serial communication is be established.

    rw data_bits: u8 # @ 0x81
    
The number of data bits per frame. Either 7 or 8.

    rw stop_bits: u8 # @ 0x82
    
The number of stop bits at the end of a frame. Either 1 or 2.

    enum ParityType: u8 {
      None = 0,
      Even = 1,
      Odd = 2
    }
    rw parity_mode: ParityType @ 0x83

The parity mode.

    rw buffer_size: u8 @ 0x84
    
A positive, non-zero value indicating the size of the read and write buffers that should be created.

## Commands

    unique command send @ 0x80 {
        data: bytes
    }

Send a buffer of data over the serial transport.

## Events

    event received @ 0x80 {
       data: bytes
    }
    
Raised when a buffer of data is received.
