# Bootloader

    identifier: 0x1ffa9948
    tags: C, management
    status: stable

Allows flashing (reprogramming) devices over Jacdac.

This is typically implemented by having a separate _bootloader_ mode, as opposed to _application_ mode
on the module to be flashed.
The bootloader mode is entered on every device reset, for about 300ms.
The bootloader will generally not announce itself, until it gets some command.
Once it gets the command, it will stay in application mode.

Typically, you ask the module (in application mode) to reset, while sending broadcast
`info` commands to all bootloaders every 100ms or so.
Alternatively, you ask the the user to disconnect and re-connect the module, while
broadcasting `info` commands.
The second method works even if the application is damaged (eg., due to an aborted flash).

When device is in bootloader mode, the device ID may change compared to application mode,
by flipping the first bit in the first byte of the device identifier.

## Commands

    command info @ announce { }
    report {
        service_class: u32
        page_size: u32 B
        flashable_size: u32 B
        product_identifier: u32
    }

The `service_class` is always `0x1ffa9948`. The `product_identifier` identifies the kind of firmware
that "fits" this device.

    command set_session @ 0x81 {
        session_id: u32
    }
    report {
        session_id: u32
    }

The flashing server should generate a random id, and use this command to set it.

    enum Error : u32 {
        NoError = 0
        PacketTooSmall = 1
        OutOfFlashableRange = 2
        InvalidPageOffset = 3
        NotPageAligned = 4
    }
    unique command page_data @ 0x80 {
        page_address: u32
        page_offset: u16
        chunk_no: u8
        chunk_max: u8
        session_id: u32
        reserved0: u32
        reserved1: u32
        reserved2: u32
        reserved3: u32
        page_data: bytes { max_bytes = 208}
    }
    report {
        session_id: u32
        page_error: Error
        page_address: u32
    }

Use to send flashing data. A physical page is split into `chunk_max + 1` chunks, where `chunk_no = 0 ... chunk_max`.
Each chunk is stored at `page_address + page_offset`. `page_address` has to be equal in all chunks,
and is included in response.
Only the last chunk causes writing to flash and elicits response.

Errors not listed are also possible. Errors larger than `0xffff` indicate de-synchronization on chunk numbers.

While this command is technically `unique`, the bootloader client will retry failed pages.
Bootloaders typically will not support reliable commands delivered over pipes.
