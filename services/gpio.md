# GPIO

    identifier: 0x10d85a69
    tags: io
    extends: _sensor

Access to General Purpose Input/Output (GPIO) pins on a board.
The pins are indexed `0 ... num_pins-1`.
The indexing does not correspond to hardware pin names, nor labels on the board (see `get_pin_info` command for that),
and should **not** be exposed to the user.

## Registers

    ro state: bytes @ reading

For every pin set to `Input*` or `Output*` the corresponding **bit** will be `1` if and only if the pin is high.
When `Disconnected` or `AnalogIn` the value is `0`.
This is normally streamed at low-ish speed, but it's also automatically reported whenever
an input pin changes value.

    ro num_pins: u8 # @ 0x180

Number of pins that can be operated through this service.


## Commands

    enum PinMode : u8 {
        Disconnected   = 0x00
        InputNoPull    = 0x01
        InputPullUp    = 0x11
        InputPullDown  = 0x21
        OutputHigh     = 0x12
        OutputLow      = 0x22
        AnalogIn       = 0x03
    }
    command configure @ 0x80 {
    repeats:
        pin: u8
        mode: PinMode
    }

Configure (including setting the value) zero or more pins.

    flags PinCapabilities : u16 {
        PullUp     = 0x0001
        PullDown   = 0x0002
        Input      = 0x0004
        Output     = 0x0008
        Analog     = 0x0010
    }
    command pin_info @ 0x81 {
        pin: u8
    }
    report {
        pin: u8
        hw_pin: u8
        capabilities: PinCapabilities
        mode: PinMode
        label: string
    }

Report capabilities and name of a pin.

    command analog_read @ 0x82 {
    repeats:
        pin: u8
    }
    report {
    repeats:
        pin: u8
        reserved: u8
        value: u0.16
    }

Configure pin(s) as `AnalogIn` if needed and read the value.
The pins stay `AnalogIn` afterwards.

    command pin_by_label @ 0x83 {
        label: string
    }

This responds with `pin_info` report.