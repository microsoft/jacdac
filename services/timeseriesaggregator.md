# Timeseries Aggregator

    identifier: 0x1192bdcc
    group: iot
    tags: infrastructure, devicescript
    restricted: true
    status: experimental

Supports aggregating timeseries data (especially sensor readings)
and sending them to a cloud/storage service.
Used in DeviceScript.

Note that `f64` values are not necessarily aligned.

## Commands

    command clear @ 0x80 {}

Remove all pending timeseries.

    command update @ 0x83 {
        value: f64
        label: string
    }

Add a data point to a timeseries.

    command set_window @ 0x84 {
        duration: u32 ms
        label: string
    }

Set aggregation window.
Setting to `0` will restore default.

    command set_upload @ 0x85 {
        upload: bool
        label: string
    }

Set whether or not the timeseries will be uploaded to the cloud.
The `stored` reports are generated regardless.

    report stored @ 0x90 {
        num_samples: u32 #
        padding: u8[4]
        avg: f64
        min: f64
        max: f64
        start_time: u32 ms
        end_time: u32 ms
        label: string
    }

Indicates that the average, minimum and maximum value of a given
timeseries are as indicated.
It also says how many samples were collected, and the collection period.
Timestamps are given using device's internal clock, which will wrap around.
Typically, `end_time` can be assumed to be "now".
`end_time - start_time == window`

# Registers

    volatile ro now: u32 us @ 0x180

This can queried to establish local time on the device.

    rw fast_start = 1: bool @ 0x80

When `true`, the windows will be shorter after service reset and gradually extend to requested length.
This is ensure valid data is being streamed in program development.

    rw default_window = 60000: u32 ms @ 0x81

Window for timeseries for which `set_window` was never called.
Note that windows returned initially may be shorter if `fast_start` is enabled.

    rw default_upload = 1: bool @ 0x82

Whether labelled timeseries for which `set_upload` was never called should be automatically uploaded.

    rw upload_unlabelled = 1: bool @ 0x83

Whether automatically created timeseries not bound in role manager should be uploaded.

    rw sensor_watchdog_period: u32 ms @ 0x84

If no data is received from any sensor within given period, the device is rebooted.
Set to `0` to disable (default).
Updating user-provided timeseries does not reset the watchdog.
