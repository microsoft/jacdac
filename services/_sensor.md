# Sensor

    camel: sensor

Base class for sensors.

## Registers

    rw is_streaming: bool @ is_streaming

Enables/disables broadcast streaming

    rw streaming_interval = 100: u32 ms {typical_min = 1, typical_max = 60000} @ streaming_interval

Period between packets of data when streaming in milliseconds.
