# GPIO

    identifier: 0x10d85a69
    tags: io
    extends: _sensor

Access to General Purpose Input/Output (GPIO) pins on a board.
The pins are indexed `0 ... num_pins-1`.
The indexing does not correspond to hardware pin names, nor labels on the board (see `get_pin_info` command for that),
and should **not** be exposed to the user.

## Registers

    ro state @ reading {
        digital_values: u8[16]
    repeats:
        analog_pin: u8
        reserved: u8
        analog_value: u0.16
    }

For every pin set to `Input*` or `Output*` the corresponding **bit** in `digital_values` will be `1` if and only if the pin is high.
When `Disconnected` or `AnalogIn` the digital value is `0`.
For every pin set to `AnalogIn` its value is reported in the remainder of the packet.
This is normally streamed at low-ish speed, but it's also automatically reported whenever
a digital input pin changes value (throttled to ~100Hz).

    ro num_pins: u8 # { absolute_max=128 } @ 0x180

Number of pins that can be operated through this service.


## Commands

    enum PinMode : u8 {
        Off            = 0x00
        OffPullUp      = 0x10
        OffPullDown    = 0x20
        InputNoPull    = 0x01
        InputPullUp    = 0x11
        InputPullDown  = 0x21
        OutputHigh     = 0x12
        OutputLow      = 0x22
        AnalogIn       = 0x03
        Alternative    = 0x04
    }
    command configure @ 0x80 {
    repeats:
        pin: u8
        mode: PinMode
    }

Configure (including setting the value) zero or more pins.
`Alternative` settings means the pin is controlled by other service (SPI, I2C, UART, PWM, etc.).

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

    command pin_by_label @ 0x83 {
        label: string
    }

This responds with `pin_info` report.

    command pin_by_hw_pin @ 0x84 {
        hw_pin: u8
    }

This responds with `pin_info` report.
