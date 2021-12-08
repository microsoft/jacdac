# Sensor Aggregator

    identifier: 0x1d90e1c5
    status: experimental

Aggregate data from multiple sensors into a single stream
(often used as input to machine learning models on the same device, see model runner service).

## Registers

    enum SampleType : u8 {
        U8 = 0x08
        I8 = 0x88
        U16 = 0x10
        I16 = 0x90
        U32 = 0x20
        I32 = 0xA0
    }
    rw inputs @ 0x80 {
        sampling_interval: u16 ms
        samples_in_window: u16
        reserved: u32
    repeats:
        device_id: devid
        service_class: u32
        service_num: u8
        sample_size: u8 B
        sample_type: SampleType
        sample_shift: i8
    }

Set automatic input collection.
These settings are stored in flash.

    ro num_samples: u32 @ 0x180

Number of input samples collected so far.

    ro sample_size: u8 B @ 0x181

Size of a single sample.

    rw streaming_samples: u32 # @ 0x81

When set to `N`, will stream `N` samples as `current_sample` reading.

    ro current_sample: bytes @ reading

Last collected sample.
