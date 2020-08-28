# TFLite

    identifier: 0x13fe118c

Run TensorFlow Lite for Microcontrollers machine learning models.
Only models with a single input tensor and a single output tensor are supported at the moment.

## Commands

    command set_model @ 0x80 {
        model_size: u32 bytes
    }
    report {
        model_port: pipe_port
    }

Open pipe for streaming in the model. The size of the model has to be declared upfront.
The model is streamed over regular pipe data packets, in the `.tflite` flatbuffer format.
When the pipe is closed, the model is written all into flash, and the device running the service may reset.

    command predict @ 0x80 {
        outputs: pipe
    }
    report {
        inputs: pipe_port
    }

Open channel that can be used to manually invoke the model. When enough data is sent over the `inputs` pipe, the model is invoked,
and results are send over the `outputs` pipe.

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
        device_id: u64
        service_class: u32
        service_num: u8
        sample_size: u8 bytes
        sample_type: SampleType
        sample_shift: i8
    }

Set automatic input collection.
These settings are stored in flash.

    rw auto_invoke_every: u16 @ 0x80

When register contains `N > 0`, run the model automatically every time new `N` samples are collected.
Model may be run less often if it takes longer to run than `N * sampling_interval`.
The `outputs` register will stream its value after each run.
This register is not stored in flash.

    ro outputs: bytes @ reading

Results of last model invocation as `float32` array.

    ro input_shape @ 0x180 {
    repeats:
        dimension: u16
    }

The shape of the input tensor.

    ro output_shape @ 0x181 {
    repeats:
        dimension: u16
    }

The shape of the output tensor.

    ro last_run_time: u32 us @ 0x182

The time consumed in last model execution.

    ro allocated_arena_size: u32 bytes @ 0x183

Number of RAM bytes allocated for model execution.
