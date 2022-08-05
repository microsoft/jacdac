# Barcode reader

    identifier: 0x1c739e6c
    status: experimental

A device that reads various barcodes, like QR codes. For the web, see [BarcodeDetector](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector).

## Registers

    rw enabled: bool @ intensity
    
Turns on or off the detection of barcodes.

    enum Format: u8 {
        Aztec = 1
        Code128 = 2
        Code39 = 3
        Code93 = 4
        Codabar = 5
        DataMatrix = 6
        Ean13 = 8
        Ean8 = 9
        ITF = 10
        Pdf417 = 11
        QrCode = 12
        UpcA = 13
        UpcE = 14
    }
    const formats? @ 0x180 {
        repeats:
            format: Format;  
    }
    
Reports the list of supported barcode formats, as documented in https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API.

## Events

    event detect @ active {
        format: Format
        data: string
    }
    
Raised when a bar code is detected and decoded. If the reader detects multiple codes, it will issue multiple events.
In case of numeric barcodes, the `data` field should contain the ASCII (which is the same as UTF8 in that case) representation of the number.
