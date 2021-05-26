# Power

    identifier: 0x1fa4c95a

A power-provider service.

## Power negotiation protocol

The purpose of the power negotiation is to ensure that there is no more than ~900mA
delivered to the power rail.
This is realized by limiting the number of enabled power provider services to one.

Note, that it's also possible to have low-current power providers,
which are limited to 100mA and do not run a power provider service.
These are **not** accounted for in the power negotiation protocol.

The protocol is based on `shutdown` commands, which are sent as broadcast
to the power service.
They follow a very narrow format:
* they need to be the only packet in the frame
* the second word of `device_id` needs to be set to `0xAA_AA_AA_AA` (alternating 0 and 1)
* the service index is set to `0x3d`
* the CRC is therefore fixed
* therefore, the packet can be recognized by reading the first 8 bytes

Multi-channel power-providers (which provide a separate 900mA to each of their channels)
will detect that a `shutdown` command is being received after 8 bytes.
They will then briefly deactivate a switch which connects their internal and external
Jacdac data lines.
If the `shutdown` is still received correctly, it means it came from the internal network,
and thus there's some other power provider active.
This makes the current power provider shut down.
Alternatively, if the provider handles multiple channels, but has only one Jacdac input,
it can just see if the internal line wiggles after the switch deactivation.

After queuing a `shutdown` command, the service enters a grace period
until the report has been sent on the wire.
During the grace period incoming `shutdown` commands are ignored.

* Upon reset, a power service enables itself, and then only after 0-300ms (random)
  sends the first `shutdown` command
* Every enabled power service emits `shutdown` commands every 400-600ms (random; first few packets can be even sent more often)
* If an enabled power service sees a power `shutdown` command from somebody else,
  it disables itself (unless in grace period)
* If a disabled power service sees no power `shutdown` command for more than ~1200ms, it enables itself
  (this is when the previous power source is unplugged or otherwise malfunctions)
* If a power service has been disabled for 50-60s (random), it enables itself.

### Rationale for the grace period

Consider the following scenario:

* device A queues `shutdown` command for sending
* A receives external `shutdown` packet from B (thus disabling A)
* the A `shutdown` command is sent from the queue (thus eventually disabling B)

To avoid that, we make sure that at the precise instant when `shutdown` command is sent,
the power is enabled (and thus will stay enabled until another `shutdown` command arrives).
This could be achieved by inspecting the enable bit, aftering acquiring the line
and before starting UART transmission, however that would require breaking abstraction layers.
So instead, we never disable the service, while the `shutdown` packet is queued.
This may lead to delays in disabling power services, but these should be limited due to the
random nature of the `shutdown` packet spacing.

### Rationale for timings

The initial 0-300ms delay is set to spread out the `shutdown` periods of power services,
to minimize collisions.
The `shutdown` periods are randomized 400-600ms, instead of a fixed 500ms used for regular
services, for the same reason.

The 1200ms period is set so that droping two `shutdown` packets in a row
from the current provider will not cause power switch, while missing 3 will.

The 50-60s power switch period is arbitrary, but chosen to limit amount of switching between supplies,
while keeping it short enough for user to notice any problems such switching may cause.

## Registers

    rw enabled = 1: bool @ intensity

Turn the power to the bus on/off.
See `power_status` for the actual current state.

    rw max_power = 900: u16 mA {typical_max = 900} @ max_power

Limit the power provided by the service. The actual maximum limit will depend on hardware.
This field may be read-only in some implementations - you should read it back after setting.

    enum PowerStatus : u8 {
        Disabled = 0
        Powering = 1
        Overload = 2
        Overprovision = 3
    }
    ro power_status: PowerStatus @ 0x181

Indicates whether the power provider is currently providing power, and if not why not.
`Overprovision` means there was another power provider, and we stopped not to overprovision the bus.

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

## Commands

    command shutdown @ 0x80 {}

Sent by the power service periodically, as broadcast.

## Events

    event power_status_changed @ change {
        power_status: PowerStatus
    }

Emitted whenever `power_status` changes.