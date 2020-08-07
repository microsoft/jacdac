# Sensor

    camel: sensor

Base class for sensors.

## Registers

    rw is_streaming: bool @ is_streaming

Enables/disables broadcast streaming

    rw streaming_interval = 100: u32 ms {typicalMin = 1, typicalMax = 60000} @ streaming_interval

Period between packets of data when streaming in milliseconds.
