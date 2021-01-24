# Real time clock

    
    identifier: 0x1a8b1a28
    extends: _sensor

## Registers

    ro now @ reading {
        year: u16
        month: u8
        day: u8
        day_of_week: u8
        hour: u8
        min: u8
        sec: u8
    }

Current time in 24h representation. Default streaming period is 1 second.

## Commands

    command set_time @ 0x80 {
         year: u16
         month: u8
         day: u8
         day_of_week: u8
         hour: u8
         min: u8
         sec: u8
    }

Sets the current day time on the clock.
