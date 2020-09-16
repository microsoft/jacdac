# TFLite

    identifier: 0x140f9a78

Run TensorFlow Lite for Microcontrollers machine learning models.
Only models with a single input tensor and a single output tensor are supported at the moment.
Input is provided by Sensor Aggregator service on the same device.

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

    command predict @ 0x81 {
        outputs: pipe
    }
    report {
        inputs: pipe_port
    }

Open channel that can be used to manually invoke the model. When enough data is sent over the `inputs` pipe, the model is invoked,
and results are send over the `outputs` pipe.

## Registers

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

    ro model_size: u32 bytes @ 0x184

The size of `.tflite` model in bytes.

    ro last_error: string @ 0x185

Textual description of last error when running or loading model (if any).
