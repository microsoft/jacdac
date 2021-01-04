# Power

    identifier: 0x1fa4c95a

A power-provider service.

## Power negotiation protocol

The purpose of the power negotiation is to ensure that there is no more than ~500mA
delivered to the power rail.
This is realized by limiting the number of enabled power provider services to 1.

Note, that it's also possible to have low-current power providers, which do not
run a power provider service.
These are **not** accounted for in the power negotiation protocol.

The protocol is based on `on` reports, which are always sent in the same frame,
after general device announce packets.
This makes it simpler for other power services to parse them.

The `on` reports contain device priority, which is either its remaining battery
capacity, or a constant.

After sending an announce with `on` report, the service enters 10ms grace period.
During grace period incoming `on` reports are ignored.

* Upon reset, a power service enables itself (instant-on), and after 0-300ms (random)
  send the first announce packet (with `on` report)
* Every enabled power service emits power `on` reports with its announce packets,
  which are sent every 400-600ms (random).
* If an enabled power service sees a power `on` report from somebody else of higher or equal priority,
  it disables itself (unless in grace period).
* If a power service has been disabled for at least 55-60s (random) and in the last second
  it has only seen `on` report of lower or equal priority,
  then just before the next announce period it enables itself.
* If a disabled power service sees no power `on` report for more than ~1100ms, it enables itself
  (this is when the previous power source is unplugged or otherwise malfunctions).

The purpose of the grace period in a new provider is for the other power services to
receive the power `on` report from the new provider and shut down.
Otherwise, a power `on` report from an old provider could arrive in the receive queue of the new
provider, while it's queuing its own initial report.
This would result in both old and new provider shutting down.
It's still possible, though unlikely, for the new power `on` to fail to reach the old provider;
the next old power `on` will disable the new provider, while keeping the old one running.

A separate power `on` report is used, as opposed to `enabled` reading or a service announce packet
because these reports are only emitted directly after the device announce packet, and cannot
be triggered otherwise, minimizing the number of cases to analyze in the protocol.

## Registers

    rw enabled = 1: bool @ intensity

Turn the power to the bus on/off.

    rw max_power = 500: u16 mA {typical_max = 500} @ max_power

Limit the power provided by the service. The actual maximum limit will depend on hardware.
This field may be read-only in some implementations - you should read it back after setting.

    ro overload: bool @ 0x181

Indicates whether the power has been shut down due to overdraw.

    ro current_draw: u16 mA @ reading

Present current draw from the bus.

    ro battery_voltage: u16 mV {typical_min = 4500, typical_max = 5500} @ 0x180

Voltage on input.

    ro battery_charge?: u16 / @ 0x182

Fraction of charge in the battery.

    const battery_capacity?: u32 mWh @ 0x183

Energy that can be delivered to the bus when battery is fully charged.
This excludes conversion overheads if any.

    rw keep_on_pulse_duration = 600: u16 ms @ 0x80
    rw keep_on_pulse_period = 20000: u16 ms @ 0x81

Many USB power packs need current to be drawn from time to time to prevent shutdown.
This regulates how often and for how long such current is drawn.
Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.

## Commands

    report on @ 0x80 {
        priority: u32 mWh
    }

Emitted with announce packets when the service is running.