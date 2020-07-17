# Power

    identifier: 0x1fa4c95a

A power-provider service.

## Registers

    rw enabled = 1: bool @ intensity

Turn the power to the bus on/off.

    rw max_power = 500: u16 mA @ 0x07

Limit the power provided by the service.

    ro overload: bool @ 0x181

Indicates whether the power has been shut down due to overdraw.

    ro current_draw: u16 mA @ reading

Present current draw from the bus.

    ro battery_voltage: u16 mV @ 0x180

Voltage on input.

    ro battery_charge?: u16 frac @ 0x182

Fraction of charge in the battery.

    const battery_capacity?: u32 mWh @ 0x183

Energy that can be delivered to the bus when battery is fully charged.
This excludes conversion overheads if any.

    rw keep_on_pulse_duration = 600: u16 ms @ 0x80
    rw keep_on_pulse_period = 20000: u16 ms @ 0x81

Many USB power packs need current to be drawn from time to time to prevent shutdown.
This regulates how often and for how long such current is drawn.
Typically a 1/8W 22 ohm resistor is used as load limiting the duty cycle to 10%.
