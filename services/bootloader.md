# Bootloader

    identifier: 0x1ffa9948

Allows flashing (reprogramming) devices over Jacdac.

## Commands

    command info @ announce { }
    report {
        service_class: u32
        page_size: u32 B
        flashable_size: u32 B
        firmware_identifier: u32
    }

The `service_class` is always `0x1ffa9948`. The `firmware_identifier` identifies the kind of firmware
that "fits" this device.

    command set_session @ 0x81 {
        session_id: u32
    }
    report {
        session_id: u32
    }

The flashing host should generate a random id, and use this command to set it.

    enum Error : u32 {
        NoError = 0
        PacketTooSmall = 1
        OutOfFlashableRange = 2
        InvalidPageOffset = 3
        NotPageAligned = 4
    }
    command page_data @ 0x80 {
        page_address: u32
        page_offset: u16
        chunk_no: u8
        chunk_max: u8
        session_id: u32
        reserved0: u32
        reserved1: u32
        reserved2: u32
        reserved3: u32
        page_data: bytes {maxBytes = 208}
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
