namespace Jacdac {
    public static class BarcodeReaderConstants
    {
    // Service: Barcode reader
        public const uint ServiceClass = 0x1c739e6c;
    }

    public enum BarcodeReaderFormat { // uint8_t
        Aztec = 0x1,
        Code128 = 0x2,
        Code39 = 0x3,
        Code93 = 0x4,
        Codabar = 0x5,
        DataMatrix = 0x6,
        Ean13 = 0x8,
        Ean8 = 0x9,
        ITF = 0xa,
        Pdf417 = 0xb,
        QrCode = 0xc,
        UpcA = 0xd,
        UpcE = 0xe,
    }

    public enum BarcodeReaderReg {
        /**
         * Read-write bool (uint8_t). Turns on or off the detection of barcodes.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Constant. Reports the list of supported barcode formats, as documented in https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API.
         *
         * ```
         * const [format] = jdunpack<[BarcodeReaderFormat[]]>(buf, "u8[]")
         * ```
         */
        Formats = 0x180,
    }

    public enum BarcodeReaderEvent {
        /**
         * Raised when a bar code is detected and decoded. If the reader detects multiple codes, it will issue multiple events.
         * In case of numeric barcodes, the `data` field should contain the ASCII (which is the same as UTF8 in that case) representation of the number.
         *
         * ```
         * const [format, data] = jdunpack<[BarcodeReaderFormat, string]>(buf, "u8 s")
         * ```
         */
        Detect = 0x1,
    }

}
