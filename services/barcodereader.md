# Barcode reader

    identifier: 0x1c739e6c

A device that reads various barcodes, like QR codes. For the web, see [BarcodeDetector](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector).

## Registers

    rw enabled: bool @ intensity
    
Turns on or off the detection of barcodes.

    enum Format: u32 {
        Aztec = 1
        Code_128 = 2
        Code_39 = 3
        Code_93 = 4
        Codabar = 5
        Data_matrix = 6
        Ean_13 = 8
        Ean_8 = 9
        Itf = 10
        Pdf417 = 11
        Qr_code = 12
        Upc_a = 13
        Upc_e = 14
    }
    const formats? @ 0x80 {
        repeats:
            format: Format;  
    }
    
Reports the list of supported barcode formats, as documented in https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API.

## Events

    event detect @ active {
        format: Format
        data: bytes 
    }
    
Raised when a bar code is detected and decoded. If the reader detects multiple codes, it will issue multiple events.
  
