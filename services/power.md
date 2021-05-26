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

Power providers can have multiple _channels_, typically multiple Jacdac ports on the provider.
Each channel can be limited to 900mA separately.
In normal operation, the data lines of each channels are connected together.
The ground lines are always connected together.
Multi-channel power providers are also called _powered hubs_.

While channels have separate current limits, there's nothing to prevent the user
from joining two or more channels outside of the provider using a passive hub.
This would allow more than 900mA of current to be drawn, resulting in cables or components
getting hot and/or malfunctioning.
Thus, the power negotiation protocol seeks to detect sitatations where
multiple channels of power provider(s) are bridged together
and shut down all but one of the channels involved.

The protocol is built around the power providers periodically sending specially crafted
`shutdown` commands in broadcast mode.
Note that this is unusual - services typically only send reports.

The `shutdown` commands can be reliably identified based on their first half.
When a power provider starts receiving a `shutdown` command, it needs to take
steps to identify which of its channels the command is coming from.
This is typically realized with analog switches between data lines of channels.
The channel which received the `shutdown` command is then shut down.
Note that in the case a single-channel provider any received `shutdown` command will cause a shut down.

A multi-channel provider needs to also identify when a `shutdown` command it sent from one channel
is received on any of its other channels and shut down one of the involved channels.

It is also possible to build a _data bridge_ device, with two or more ports.
It passes through all data except for `shutdown` commands,
but **does not** connect the power lines.

### Protocol details

The `shutdown` commands follow a very narrow format:
* they need to be the only packet in the frame (and thus we can also call them `shutdown` frames)
* the second word of `device_id` needs to be set to `0xAA_AA_AA_AA` (alternating 0 and 1)
* the service index is set to `0x3d`
* the CRC is therefore fixed
* therefore, the packet can be recognized by reading the first 8 bytes (total length is 16 bytes)

There is one power service per channel.
A multi-channel power provider can be implemented as one device with multiple services (typically with one MCU),
or many devices with one service each (typically multiple MCUs).
The first option is preferred as it fixes the order of channels,
but the second option may be cheaper to implement.

After queuing a `shutdown` command, the service enters a grace period
until the report has been sent on the wire.
During the grace period incoming `shutdown` commands are ignored.

* Upon reset, a power service enables itself, and then only after 0-300ms (random)
  sends the first `shutdown` command
* Every enabled power service emits `shutdown` commands every 400-600ms (random; first few packets can be even sent more often)
* If an enabled power service sees a `shutdown` command from somebody else,
  it disables itself (unless in grace period)
* If a disabled power service sees no `shutdown` command for more than ~1200ms, it enables itself
  (this is when the previous power source is unplugged or otherwise malfunctions)
* If a power service has been disabled for 50-60s (random), it enables itself.

Additionally:
* While the `allowed` register is set to `0`, the service will not enable itself (nor send `shutdown` commands)
* When a current overdraw is detected, the service stop providing power and enters `Overload` state for around 2 seconds,
  while still sending `shutdown` commands.

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

    rw allowed = 1: bool @ intensity

Can be used to completely disable the service.
When allowed, the service may still not be providing power, see 
`power_status` for the actual current state.

    rw max_power = 900: u16 mA {typical_max = 900} @ max_power

Limit the power provided by the service. The actual maximum limit will depend on hardware.
This field may be read-only in some implementations - you should read it back after setting.

    enum PowerStatus : u8 {
        Disallowed = 0
        Powering = 1
        Overload = 2
        Overprovision = 3
    }
    ro power_status: PowerStatus @ 0x181

Indicates whether the power provider is currently providing power (`Powering` state), and if not, why not.
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