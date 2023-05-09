# DeviceScript Manager

    identifier: 0x1134ea2b
    tags: management, devicescript
    restricted: true

Allows for deployment and control over DeviceScript virtual machine.

Programs start automatically after device restart or uploading of new program.
You can stop programs until next reset by setting the `running` and `autostart` registers to `false`.

## Commands

    unique command deploy_bytecode @ 0x80 {
        bytecode_size: u32 B
    }
    report {
        bytecode_port: pipe_port
    }

Open pipe for streaming in the bytecode of the program. The size of the bytecode has to be declared upfront.
To clear the program, use `bytecode_size == 0`.
The bytecode is streamed over regular pipe data packets.
The bytecode shall be fully written into flash upon closing the pipe.
If `autostart` is true, the program will start after being deployed.
The data payloads, including the last one, should have a size that is a multiple of 32 bytes.
Thus, the initial bytecode_size also needs to be a multiple of 32.

    command read_bytecode @ 0x81 {
        bytecode: pipe
    }
    pipe report bytecode {
        data: bytes
    }

Get the current bytecode deployed on device.


## Registers

    rw running: bool @ 0x80

Indicates if the program is currently running.
To restart the program, stop it (write `0`), read back the register to make sure it's stopped,
start it, and read back.

    rw autostart: bool @ 0x81

Indicates wheather the program should be re-started upon `reboot()` or `panic()`.
Defaults to `true`.

    ro program_size: u32 @ 0x180

The size of current program.

    ro program_hash: u32 @ 0x181

Return FNV1A hash of the current bytecode.

    ro program_sha256: bytes { max_bytes = 32 } @ 0x182

Return 32-byte long SHA-256 hash of the current bytecode.

    const runtime_version? @ 0x183 {
        patch: u16
        minor: u8
        major: u8
    }

Returns the runtime version number compatible with [Semver](https://semver.org/).
When read as 32-bit little endian integer a version `7.15.500` would be `0x07_0F_01F4`.

    ro program_name: string @ 0x184

The name of currently running program. The compiler takes is from `package.json`.

    ro program_version: string @ 0x185

The version number of currently running program. The compiler takes is from `package.json`
and `git`.


## Events

When program is running, `status_code == Ready`.
When there is a valid program, but it is not running, `status_code == Sleeping`.
When there is no valid program, `status_code == WaitingForInput`.

    event program_panic @ 0x80 {
        panic_code: u32
        program_counter: u32
    }

Emitted when the program calls `panic(panic_code)` or `reboot()` (`panic_code == 0` in that case).
The byte offset in byte code of the call is given in `program_counter`.
The program will restart immediately when `panic_code == 0` or in a few seconds otherwise.

    event program_change @ change

Emitted after bytecode of the program has changed.
