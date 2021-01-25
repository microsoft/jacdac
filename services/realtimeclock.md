# Real time clock

    identifier: 0x1a8b1a28
    extends: _sensor

Real time clock to support collecting data with precise time stamps.
## Registers

    ro now @ reading {
        year: u16
        month: u8 { absolute_min=1, absolute_max=12 }
        day: u8 { absolute_min=1, absolute_max=31 }
        hour: u8 { absolute_min=0, absolute_max=23 }
        min: u8 { absolute_min=0, absolute_max=59 }
        sec: u8 { absolute_min=0, absolute_max=59 }
    }

Current time in 24h representation. Default streaming period is 1 second.

## Commands

    command set_time @ 0x80 {
         year: u16
         month: u8
         day: u8
         hour: u8
         min: u8
         sec: u8
    }

Sets the current day time on the clock.
