# Sensor

    camel: sensor

Base class for sensors.

## Registers

    rw internal streaming_samples: u8 # @ streaming_samples

Asks device to stream a given number of samples
(clients will typically write `255` to this register every second or so, while streaming is required).

    rw streaming_interval = 100: u32 ms {typical_min = 1, typical_max = 60000} @ streaming_interval

Period between packets of data when streaming in milliseconds.

    const internal streaming_preferred_interval?: u32 ms @ streaming_preferred_interval

Preferred default streaming interval for sensor in milliseconds.
