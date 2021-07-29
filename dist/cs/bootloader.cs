namespace Jacdac {
    // Service: Bootloader
    public const SRV_BOOTLOADER = 0x1ffa9948

    public enum BootloaderError { // uint32_t
        NoError = 0x0,
        PacketTooSmall = 0x1,
        OutOfFlashableRange = 0x2,
        InvalidPageOffset = 0x3,
        NotPageAligned = 0x4,
    }

    public enum BootloaderCmd {
        /**
         * No args. The `service_class` is always `0x1ffa9948`. The `firmware_identifier` identifies the kind of firmware
         * that "fits" this device.
         */
        Info = 0x0,

        /**
         * report Info
         * ```
         * const [serviceClass, pageSize, flashableSize, firmwareIdentifier] = jdunpack<[number, number, number, number]>(buf, "u32 u32 u32 u32")
         * ```
         */

        /**
         * Argument: session_id uint32_t. The flashing server should generate a random id, and use this command to set it.
         *
         * ```
         * const [sessionId] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        SetSession = 0x81,

        /**
         * report SetSession
         * ```
         * const [sessionId] = jdunpack<[number]>(buf, "u32")
         * ```
         */

        /**
         * Use to send flashing data. A physical page is split into `chunk_max + 1` chunks, where `chunk_no = 0 ... chunk_max`.
         * Each chunk is stored at `page_address + page_offset`. `page_address` has to be equal in all chunks,
         * and is included in response.
         * Only the last chunk causes writing to flash and elicits response.
         *
         * ```
         * const [pageAddress, pageOffset, chunkNo, chunkMax, sessionId, pageData] = jdunpack<[number, number, number, number, number, Uint8Array]>(buf, "u32 u16 u8 u8 u32 x[4] x[4] x[4] x[4] b[208]")
         * ```
         */
        PageData = 0x80,

        /**
         * report PageData
         * ```
         * const [sessionId, pageError, pageAddress] = jdunpack<[number, BootloaderError, number]>(buf, "u32 u32 u32")
         * ```
         */
    }

}
