# Sensor

Base class for sensors.

## Registers

    rw is_streaming: bool @ 0x03

Enables/disables broadcast streaming

    rw streaming_interval = 100: u32 ms @ 0x04

Period between packets of data when streaming in milliseconds.
