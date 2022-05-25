# Timeseries Aggregator

    identifier: 0x1192bdcc
    group: iot
    tags: infrastructure, jacscript
    restricted: true
    status: experimental

Supports aggregating timeseries data (especially sensor readings)
and sending them to a cloud/storage service.
Used in Jacscript.

Note that `f64` values following a label are not necessarily aligned.

## Commands

    command clear @ 0x80 {}

Remove all pending timeseries.

    enum DataMode: u8 {
        Continuous = 1
        Discrete = 2
    }
    command start_timeseries @ 0x81 {
        id: u32
        mode: DataMode
        label: string
    }

Starts a new timeseries.
As for `mode`,
`Continuous` has default aggregation window of 60s,
and `Discrete` only stores the data if it has changed since last store,
and has default window of 1s.

    command update @ 0x83 {
        value: f64
        id: u32
    }

Add a data point to a timeseries.

    command set_window @ 0x84 {
        id: u32
        duration: u32 ms
    }

Set aggregation window.

    report stored @ 0x85 {
        id: u32
        num_samples: u32 #
        avg: f64
        min: f64
        max: f64
        start_time: u32 ms
        end_time: u32 ms
    }

Indicates that the average, minimum and maximum value of a given
timeseries are as indicated.
It also says how many samples were collected, and the collection period.
Timestamps are given using device's internal clock, which will wrap around.
Typically, `end_time` can be assumed to be "now".

`end_time - start_time == window`

# Registers

    volatile ro now: u32 us @ 0x180

This register is automatically broadcast and can be also queried to establish local time on the device.

    rw fast_start = 1: bool @ 0x80

When `true`, the windows will be shorter after service reset and gradually extend to requested length.
This makes the sensor look more responsive.

    rw continuous_window = 60000: u32 ms @ 0x81

Window applied to automatically created continuous timeseries.
Note that windows returned initially may be shorter.

    rw discrete_window = 1000: u32 ms @ 0x82

Window applied to automatically created discrete timeseries.

