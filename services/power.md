# Power

    identifier: 0x1fa4c95a

A power-provider service.

## Power negotiation protocol

The purpose of the power negotiation is to ensure that there is no more than ~500mA
delivered to the power rail.
This is realized by limiting the number of enabled power provider services to one.

Note, that it's also possible to have low-current power providers,
which are limited to 100mA and do not run a power provider service.
These are **not** accounted for in the power negotiation protocol.

The protocol is based on `active` reports, which are always sent 
after general device announce packets, in the same frame.
This makes it simpler for other power services to parse them.

The `active` reports contain device priority, which is formed from the maximum available current
and remaining battery capacity.

After queuing an announce with `active` report, the service enters a grace period
until the report has been sent on the wire.
During the grace period incoming `active` reports are ignored.

* Upon reset, a power service enables itself, and then only after 0-300ms (random)
  send the first device announce packet directly followed by `active` report
* Every enabled power service emits power `active` reports with its announce packets,
  which are sent every 400-600ms (random; first few announce packets can be even sent more often)
* If an enabled power service sees a power `active` report from somebody else of higher or equal priority,
  it disables itself (unless in grace period)
* If a disabled power service sees no power `active` report for more than ~1200ms, it enables itself
  (this is when the previous power source is unplugged or otherwise malfunctions)
* Power services keep track of the current provider
  (device ID from the most recent `active` report, either incoming or outgoing).
  If the current provider has not changed for at least 50-60s (random),
  and its last priority is lower or equal to the current service priority,
  then just before the next announce period, the service enables itself
  (thus also resetting the 50-60s timer).

### Rationale for the grace period

Consider the following scenario:
* device A queues `active` report for sending
* A receives external `active` packet from B (thus disabling A)
* the A `active` report is sent from the queue (thus eventually disabling B)
To avoid that, we make sure that at the precise instant when `active` report is sent,
the device is enabled (and thus will stay enabled until another `active` report arrives).
This could be achieved by inspecting the enable bit, aftering acquiring the line
and before starting UART transmission, however that would require breaking abstraction layers.
So instead, we never disable the service, while the `active` packet is queued.
This may lead to delays in disabling power services, but these should be limited due to the
random nature of the announce packet spacing.

### Rationale for timings

The initial 0-300ms delay is set to spread out the announce periods of power services,
to minimize collisions.
The announce periods are randomized 400-600ms, instead of a fixed 500ms used for regular
services, for the same reason.

The 1200ms period is set so that droping two announce packets in a row
from the current provider will not cause power switch, while missing 3 will.

The 50-60s power switch period is arbitrary, but chosen to limit amount of switching between supplies,
while keeping it short enough for user to notice any problems such switching may cause.

## Registers

    rw enabled = 1: bool @ intensity

Turn the power to the bus on/off.

    rw max_power = 500: u16 mA {typical_max = 500} @ max_power

Limit the power provided by the service. The actual maximum limit will depend on hardware.
This field may be read-only in some implementations - you should read it back after setting.

    ro overload: bool @ 0x181

Indicates whether the power has been shut down due to overdraw.

    ro current_draw?: u16 mA @ reading

Present current draw from the bus.

    ro battery_voltage?: u16 mV {typical_min = 4500, typical_max = 5500} @ 0x180

Voltage on input.

    ro battery_charge?: u0.16 / @ 0x182

Fraction of charge in the battery.

    const battery_capacity?: u32 mWh @ 0x183

Energy that can be delivered to the bus when battery is fully charged.
This excludes conversion overheads if any.

    rw keep_on_pulse_duration = 600: u16 ms @ 0x80
    rw keep_on_pulse_period = 20000: u16 ms @ 0x81

Many USB power packs need current to be drawn from time to time to prevent shutdown.
This regulates how often and for how long such current is drawn.
Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.

    rw priority_offset: i32 @ 0x82

This value is added to `priority` of `active` reports, thus modifying amount of load-sharing
between different supplies.
The `priority` is clamped to `u32` range when included in `active` reports.

## Commands

    report active @ 0x80 {
        priority: u32
    }

Emitted with announce packets when the service is running.
The `priority` should be computed as
`(((max_power >> 5) << 24) | remaining_capacity) + priority_offset`
where the `remaining_capacity` is `(battery_charge * battery_capacity) >> 16`,
or one of the special constants
`0xe00000` when the remaining capacity is unknown,
or `0xf00000` when the capacity is considered infinite (eg., wall charger).
The `priority` is clamped to `u32` range after computation.
In cases where battery capacity is unknown but the charge percentage can be estimated,
it's recommended to assume a fixed (typical) battery capacity for priority purposes,
rather than using `0xe00000`, as this will have a better load-sharing characteristic,
especially if several power providers of the same type are used.
