# Power

    identifier: 0x1fa4c95a
    status: experimental

A power-provider service.

## Power negotiation protocol

The purpose of the power negotiation is to ensure that there is no more than [I<sub>out_hc(max)</sub>](https://microsoft.github.io/jacdac-docs/reference/electrical-spec/#power-providers) delivered to the power rail.
This is realized by limiting the number of enabled power provider services to one.

Note, that it's also possible to have low-current power providers,
which are limited to [I<sub>out_lc(max)</sub>](https://microsoft.github.io/jacdac-docs/reference/electrical-spec/#power-providers) and do not run a power provider service.
These are **not** accounted for in the power negotiation protocol.

Power providers can have multiple _channels_, typically multiple Jacdac ports on the provider.
Each channel can be limited to [I<sub>out_hc(max)</sub>](https://microsoft.github.io/jacdac-docs/reference/electrical-spec/#power-providers) separately.
In normal operation, the data lines of each channels are connected together.
The ground lines are always connected together.
Multi-channel power providers are also called _powered hubs_.

While channels have separate current limits, there's nothing to prevent the user
from joining two or more channels outside of the provider using a passive hub.
This would allow more than [I<sub>out_hc(max)</sub>](https://microsoft.github.io/jacdac-docs/reference/electrical-spec/#power-providers) of current to be drawn, resulting in cables or components
getting hot and/or malfunctioning.
Thus, the power negotiation protocol seeks to detect situations where
multiple channels of power provider(s) are bridged together
and shut down all but one of the channels involved.

The protocol is built around the power providers periodically sending specially crafted
`shutdown` commands in broadcast mode.
Note that this is unusual - services typically only send reports.

The `shutdown` commands can be reliably identified based on their first half (more details below).
When a power provider starts receiving a `shutdown` command, it needs to take
steps to identify which of its channels the command is coming from.
This is typically realized with analog switches between the data lines of channels.
The delivery of power over the channel which received the `shutdown` command is then shut down.
Note that in the case of a single-channel provider, any received `shutdown` command will cause a shut down.

A multi-channel provider needs to also identify when a `shutdown` command it sent from one channel
is received on any of its other channels and shut down one of the channels involved.

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

The exact byte structure of `shutdown` command is:
`15 59 04 05 5A C9 A4 1F AA AA AA AA 00 3D 80 00`

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
* If a power service has been disabled for around 10s, it enables itself.

Additionally:
* While the `allowed` register is set to `0`, the service will not enable itself (nor send `shutdown` commands)
* When a current overdraw is detected, the service stop providing power and enters `Overload` state for around 2 seconds,
  while still sending `shutdown` commands.

### Client notes

If a client hears a `shutdown` command it just means it's on a branch of the
network with a (high) power provider.
As clients (brains) typically do not consume much current (as opposed to, say, servos),
the `shutdown` commands are typically irrelevant to them.

For power monitoring, the `power_status_changed` event (and possibly `power_status` register)
can be used.
In particular, user interfaces may alert the user to `Overload` status.
The `Overprovision` status is generally considered normal (eg. when two multi-channel power providers are linked together).

### Server implementation notes

#### A dedicated MCU per channel

Every channel has:
* a cheap 8-bit MCU (e.g. PMS150C, PFS122),
* a current limiter with FAULT output and ENABLE input, and
* an analog switch.

The MCU here needs at least 4 pins per channel.
It is connected to data line of the channel, the control input of the switch, and to the current limiter's FAULT and ENABLE pins.

The switch connects the data line of the channel (JD_DATA_CHx) with the internal shared data bus, common to all channels (JD_DATA_COM).
Both the switch and the limiter are controlled by the MCU.
A latching circuit is not needed for the limiter because the MCU will detect an overcurrent fault and shut it down immediately. 

During reception, after the beginning of `shutdown` frame is detected,
the switch is opened for a brief period.
If the `shutdown` frame is received correctly, it means it was on MCU's channel.

In the case of only one power delivery channel that's controlled by a dedicated MCU, the analog switch is not necessary. 

#### A shared MCU for multiple channels

Every channel has:
* a current limiter with FAULT output and ENABLE input, 
* an analog switch, and
* a wiggle-detection line connecting the MCU to data line of the channel

The MCU again needs at least 4 pins per channel.
Switches and limiters are set up like in the configuration above.
The Jacdac data line of the MCU is connected to internal data bus.

While a Jacdac packet is being received, the MCU keeps checking if it is a 
beginning of the `shutdown` frame.
If that is the case, it opens all switches and checks which one(s) of the channel
data lines wiggle (via the wiggle lines; this can be done with EXTI latches).
The one(s) that wiggle received the `shutdown` frame and need to be disabled.

Also, while sending the `shutdown` frames itself, it needs to be done separately
for each channel, with all the other switches open.
If during that operation we detect wiggle on other channels, then we have detected
a loop, and the respective channels needs to be disabled.

#### A brain-integrated power supply

Here, there's only one channel of power and we don't have hard real time requirements,
so user-programmable brain can control it.
There is no need for analog switch or wiggle-detection line,
but a current limiter with a latching circuit is needed.

There is nothing special to do during reception of `shutdown` packet.
When it is received, the current limiter should just be disabled.

Ideally, exception/hard-fault handlers on the MCU should also disable the current limiter.
Similarly, the limiter should be disabled while the MCU is in bootloader mode,
or otherwise unaware of the power negotiation protocol. 

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

    rw max_power? = 900: u16 mA {typical_max = 900} @ max_power

Limit the power provided by the service. The actual maximum limit will depend on hardware.
This field may be read-only in some implementations - you should read it back after setting.

    enum PowerStatus : u8 {
        Disallowed = 0
        Powering = 1
        Overload = 2
        Overprovision = 3
    }
    ro volatile power_status: PowerStatus @ 0x181

Indicates whether the power provider is currently providing power (`Powering` state), and if not, why not.
`Overprovision` means there was another power provider, and we stopped not to overprovision the bus.

    ro current_draw?: u16 mA @ reading

Present current draw from the bus.

    ro volatile battery_voltage?: u16 mV {typical_min = 4500, typical_max = 5500} @ 0x180

Voltage on input.

    ro volatile battery_charge?: u0.16 / @ 0x182

Fraction of charge in the battery.

    const battery_capacity?: u32 mWh @ 0x183

Energy that can be delivered to the bus when battery is fully charged.
This excludes conversion overheads if any.

    rw keep_on_pulse_duration? = 600: u16 ms @ 0x80
    rw keep_on_pulse_period? = 20000: u16 ms @ 0x81

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
