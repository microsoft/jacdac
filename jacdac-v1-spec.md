
# JACDAC-v1 spec

What follows is a short operational specification for JACDAC v1.
The main changes with respect to [JACDAC v0](https://jacdac.org/specification/) are:

* there is only one baud-rate supported (1Mbit)
* frame starts (as it did) and ends (new) with a UART break "character";
  the break at the end typically generates an interrupt that can be used to shut down DMA transfer
* all packets include full 64 bit address of either source of destination;
  the 8 bit compressed address is gone, and so it address allocation
* CRC fixed to be CRC-16-CCITT
* announce packets now contain only service classes; device name is gone and
  advertisement data can be queried from the service
* all packets include standardized 16-bit command, plus any custom data
* a protocol-level light-weight acknowledge mechanism is introduced
* several packets sharing device identifier can be sent in one physical frame


Refer to [JACDAC v0 specification](https://jacdac.org/specification/) for general description of use
cases etc.
Please note that _services_ in this document refer to host services in v0 spec,
while _clients_ refer to client services.

## Requirements

MCUs implementing JACDAC typically need the following:
* a UART module
* DMA for said UART (if device does nothing but JACDAC, it may be fine to skip this)
* some source of randomness; can be ADC of a floating input or internal temperature sensor

It is possible not to use DMA, if the MCU isn't doing anything else (eg., our bootloader
implementations doesn't use DMA nor interrupts).

It's important that devices don't come up with the same "random" numbers every time
they power on, and critical that two instances of the same device don't that.
Typically, you can take temperature readings a couple thousand times (they will fluctuate slightly),
hash the results and use that as a random seed.
Other option is a floating ADC.
Yet another is timing pin capacitance.
Initial contents of RAM does not appear to be random, despite the fact that it may look like it is.

## Frames and Packets

All data is little endian.

A JACDAC frame contains one or more JACDAC packets.

```c
struct _jd_frame_t {
    uint16_t frame_crc;
    uint8_t frame_size;
    uint8_t frame_flags;

    uint64_t device_identifier;

    uint8_t data[JD_SERIAL_PAYLOAD_SIZE + 4]; // the actual size is frame_size, this is max
} __attribute__((__packed__, aligned(4)));
typedef struct _jd_frame_t jd_frame_t;
```

|Offset | Size | Description
|------:|-----:| ------------------------------------
|     0 |    2 | CRC-16-CCITT of all following data
|     2 |    1 | size of the payload (`data[]` field), `N`
|     3 |    1 | frame flags
|     4 |    8 | device identifier
|    12 |  `N` | payload

Total size of the frame is thus `N + 12`.
The CRC covers all data from byte 2 on, in both header and payload,
and it is typical [CRC-16-CCITT](https://en.wikipedia.org/wiki/Cyclic_redundancy_check)
(there is an efficient implementation in this repo, and it's also often supported
by hardware).

Packets have the following format:

|Offset | Size | Description
|------:|-----:| ------------------------------------
|     0 |    1 | size of data, `M`
|     1 |    1 | service number
|     2 |    2 | service command
|     4 |  `M` | data

Packets are layed out in the `data[]` field of the frame.
They are padded so they start at 4 byte boundary (ie., there is no padding if `M` is divisible by 4).
The frame header (including `device_identifier`) is **not** repeated.

The packets logically share the `device_identifier` and `flags`.
Typically, packets are uncompressed in place, and the following structure is used
to handle them.

```c
struct _jd_packet_t {
    uint16_t frame_crc;
    uint8_t frame_size;
    uint8_t frame_flags;

    uint64_t device_identifier;

    uint8_t service_size;
    uint8_t service_number;
    uint16_t service_command;

    uint8_t data[JD_SERIAL_PAYLOAD_SIZE]; // the actual size is service_size, this is max
} __attribute__((__packed__, aligned(4)));
typedef struct _jd_packet_t jd_packet_t;
```

To keep the total size of packet under `255` (which is DMA limit on some hardware)
and aligned to 4, `JD_SERIAL_PAYLOAD_SIZE` is `236`.

## Physical layer

Communication is done over a single line, using UART peripheral running at 1MHz,
8 bit per byte, no parity, 1 stop bit, LSB first (standard).
The line is held high when idle with either internal or external pull up of
around 20-50kΩ per device.

### Reception

Normally, devices are set up to trigger an interrupt on line going low, with UART disabled.
When the line goes low, the device performs the following steps:
* zero-out header of the packet to be received
* wait for line going high again
* setup a UART in receive mode
* start reception
* setup a timer for 100us (TODO)
* when the timer fires, if the header is still all zero, signal timeout and abort reception
* otherwise, given that the header declares size to be `N`, setup timer for `(N + 16) * 12 + 60` (and don't touch reception)
* if UART break is detected, abort reception, abort the timer and process incoming packet (see below)
* if timer fires, signal timeout and abort reception
* setup line as input with pull up and reception interrupt
* possibly, start transmission timer (see below)

### Processing incoming packets

We arrive here when a UART break was detected.

* optionally, check if at least `N + 16` bytes was received;
  this may be difficult depending on DMA hardware, so can be skipped
* compute CRC of bytes `2` until `N + 16` of data;
  if it doesn't match the CRC in the first two bytes, signal error and stop processing this packet
* do control layer processing of packet (next section)

### Transmission

Devices should maintain a queue of packets to send.
When either transmission or reception finishes, and the queue is non-empty
the device should set up a timer for a random period roughly between 100us and 200us.
If this timer fires before any reception starts, the device can start
transmitting as described here.

* disable reception interrupt
* if we are already in reception abort transmission
* as quickly as possible, probe the line and if it's high, pull it low
* if the line was low, abort transmission and start reception as if the reception interrupt triggered
* wait ~10us
* pull the line high
* wait ~40us
* configure UART for transmission and start it
* when transmission ends:
* disable UART
* pull the line high
* pull it low
* wait ~10us
* pull the line high
* setup line as input with pull up and reception interrupt
* possibly, start transmission timer (see above)

Wait times need to be determined experimentally, so that the following are observed:
* initial low pulse is 11-15us
* the gap between end of low pulse and start of UART transmission is 40-50us (TODO)
* spacing between characters in UART transmission should be never more than 9us,
  and on average less than 2us
* the gap after UART transmission and before final break is less than 10us
* the final break is 11-15us

The probe-and-pull operation can typically be performed in a few cycles
and is critical to do as quick as possible.
The time difference between probe and set is the collision window of the protocol.
This can be typically brought down to around 50-100ns depending on MCU speed and GPIO hardware.
Typically, you'll want to add a function that is forced to be non-inline
and takes all arguments it needs pre-computed (GPIO port address, pin mask etc.).
It's good idea to look at disassembly of that function.

Such collision window cause about 0.3% packet loss when two devices try to
write on the bus as quickly as possible.
The packet loss grows quadratically with number of devices, but typically
devices do not flood the bus, which results in much lower packet losses.

## Control layer

Every JACDAC device has a unique 64 bit identifier.
It may be generated from hardware unique ID (through hashing if needed;
we recommend [FNV1A](https://tools.ietf.org/html/draft-eastlake-fnv-14#section-3)).
Alternatively, it may be generated at first run using randomness and stored in flash or EPROM.

Another option is to flash a randomly generated 64 bit number during production.
If that is difficult, generate 48 bit (or so) random number, and assign identifiers
starting with that number with lowest bits incrementing.
Make sure to machine-generate the number, do not just bang on the keyboard.
You can use the line at the bottom of [CF2 patcher](https://microsoft.github.io/uf2/patcher/)
to generate random numbers.

If the device already has a 48 bit MAC address, the 64 bit device identifier is formed by prepending
`0xff` and appending `0xfe`. For example, if the MAC address is `11:22:33:44:55:66`, the device
identifier should be `0xFF112233445566FE`.

It's theoretically possible for a device ID collision to occur in a small network of say 200 devices.
With evenly distributed (ie., random) device IDs and 1 trillion such networks 
the probability of collision in any of them is 0.1%.
OTOH, were we to use 32 bit IDs, with 2000 networks the collision probability in any of them
is already 1%, and with 200k networks it's more than 60%.

### Direction of packets

The JACDAC frames contain only one device identifier.
* if lowest frame flag bit is set, we call all packets in that frame _command packets_ and the device identifier is the destination
* otherwise, the packets in frame are _report packet_ and the device identifier is the source

### Multicast commands

Additionally, is the third bit of frame flags is set (_multicast commands_),
the low order 32 bits of device identifier contain service class.
The command is then directed to all services with that service class.

### Services

Services in JACDAC are similar to services like telnet, HTTP, or SMTP in TCP/IP.
Each device can expose zero or more of these.
A service instance is uniquely identified by device identifier and 6 bit service number.
This also maps to a 32 bit service class.

Devices periodically advertise services they provide.
This advertisement lists all service classes in order of their respective service numbers.

For example, a device A may advertise the that it exposes the following services:
* control (0)
* accelerometer (1)
* magnetometer (2)
* LED strip (3)
* LED strip (4)
One can then send command packets with device identifier of A and service number of 2 to reach
the magnetometer service on A, for example to enable streaming of readings.
The readings would then similarly arrive with device identifier of A and service
number of 2, but as reports.
The same service class can occur more than once, in the example above the device might have
two connectors for LED strips.

When device advertises, the control service has to always reside at service number zero.

Service classes have format `0x1xxxxxxx`, except for control service which has service class of `0x00000000`.
If you create new service, the `xxxxxxx` should be randomly generated.

### Advertisement report packets

Advertisement are sent approximately every 500ms.

The service command is 0.
The payload is an array of unsigned 32 bit integers that represent service classes.
The position in the array is the service number.
For services that are missing or disabled use `0xffffffff`.

The first word of advertisement data would logically contain the class of the control
service, which is zero.
Instead, the first word is used to communicate critical information about the device
advertising itself.

| Bits  | Description
|------:| ------------------------------------
|   3:0 | Reset detection counter
|   7:4 | Reserved, keep as 0
|     8 | Device can send ACKs (see below)
|  31:9 | Reserved, keep as 0

The reset detection counter starts at `1` (not `0`) on the first advertisement packet
sent after reset. 
`2` is used for the second, and so on.
Once `15` is reached, all following advertisement packets use `15`.

If a device detects that the counter in advertisements packets of another device
decreases, it can infer that that other device went through reset
(and for example needs to be re-configured).


### ACKs

If a frame is received by the control layer, and is then routed correctly,
an ACK may need to be sent.
This only applies when frame contains command packets,
device identifier equals our device identifier,
and the second bit of frame flags is set.

ACK packet uses our device identifier, service number of `0x3f`,
and uses the CRC of the packet being acknowledged as the service command.
The payload is zero-sized.

All devices, except for the most resource-constrained bootloaders,
should be able to send ACKs.
They should indicate that in their advertisement packet.

## Commands

Commands are partitioned as follows:

* `0x0000-0x007f` - commands common to all services, defined in `jdprotocol.h`
* `0x0080-0x0eff` - commands defined per-service
* `0x0f00-0x0fff` - reserved for implementation, should not be used on wire
* `0x1000-0x1fff` - register read commands
* `0x2000-0x2fff` - register write commands
* `0x3000-0xffff` - reserved for future use

### Virtual registers

Devices can expose virtual registers.
Each register is logically between 1 bit and 236 bytes in size.
If register is written with a value shorter than register size, the
value is zero-extended or sign-extended depending on register.

Registers are identified by 12 bit indices and not memory addresses
and are non-overlapping.
For example, it's possible to have register `0x090` of size `12`
and non-overlapping register `0x091` of size `4`.

Registers are partitioned as follows:

* `0x001-0x07f` - r/w common to all services
* `0x080-0x0ff` - r/w defined per-service
* `0x100-0x17f` - r/o common to all services
* `0x180-0x1ff` - r/o defined per-service
* `0x200-0xeff` - custom, defined per-service - best avoided
* `0xf00-0xfff` - reserved for implementation, should not be on the wire

To read register `0x023` send a command `0x1023`.
A `0x1023` report will contain the current value.
To write that register, send `0x2023` command.

### Registers vs commands

Client implementations should:
* before the client device is connected, queue up all commands
* when the client device enumerates, send all these commands
* when the client device re-attaches (eg., resets), all register-set commands (but not other commands) should be re-send
* when queuing up commands, only queue one instance per each command (including one instance per register)

These requirements can be used as guideline when to use a register vs a command
in a service design.

### Streams

Streams are application-level mechanism for establishing reliable one- and two-way 
point-to-point data links.

Typical packet loss in JACDAC networks is well under 1%.
Anything that can withstand such packet loss should not be done over a stream,
as streams have quite big overhead.

Typical applications where streams should be used:
* a WiFi service, where the stream represents TCP connection
* when a response to a command doesn't fit in one packet (eg. WiFi scan results)
* when events need to be delivered reliably (eg., RFID reader)

Streams should generally not be used for:
* sensor data
* video data
* audio data

The way to initially establish a stream depends on service, but typically
device A would send a command to device B to establish a stream.
Device A would include its device identifier and _port_
(a 9 bit number of A's choosing; there would normally be one port per stream) in the command.
If a two-way communication is desired, device B could then state the port on its side.

Both devices can then start sending commands to their respective ports.
The stream commands use a fixed service number of `0x3e` and set the require-ACK
flag on frames.
The service command is split as follows:

| Bits  | Description
|------:| ------------------------------------
|   4:0 | Wrap around packet counter
|   6:5 | Content type
|  15:7 | Port number

The packet counter starts at `0x0` goes up to `0x1f`, and then back to `0x0`.
Rationale: there can be up to 30 non-empty packets in a frame.

Content type is:
* `0` for regular stream data
* `1` for regular stream data after which the stream is to be closed
* `2` for service-specific out-of-band meta-data
* `3` is reserved

The sending protocol is:
* wait for any data that needs to be sent over the stream
* send it as a command; wait for ACK
* if we timeout waiting for ACK, repeat previous step
* if we repeated 10 times already, close the stream
* increment the stream counter
* go back to the first step

The wait for ACK should follow exponential back-off, starting with 1ms up to 1024ms.

The receiving protocol keeps a counter for each stream. This counter starts at 0.
* when a stream command is received, ACK it (this is usually done generically, not only for streams)
* if stored counter for stream doesn't match the counter in the packet, drop the packet
* increment stored counter
* process data in packet
* repeat

The protocol above has an effective window of 1.
The counter allows increasing that up to 31, but this would require dealing with 
multiple packets per frame and is currently out of scope.

Streams should be considered closed when the device at the other end resets.

TODO: Zero-length stream commands can be sent as keep-alive packets.
Is this needed? 

Note that streams are actually streams of JACDAC packets, not streams of bytes.
They should not be recombined at any layer in the implementation.
For example, a command that returns a list of things can send each thing in a separate
stream packet, without any additional info about how to chunk the data
(provided each thing fits in a packet).
Multiple packets can be grouped in a frame, but are still handled separately at the
destination.

### Event subscriptions

A device like accelerometer can send events eg. when a 2g shock is detected,
when it's moved face-down, etc.
These events a normally just broadcast on the bus, using standard command `0x001`.

For reliable event delivery, a stream can be established, and events delivered
over that stream.
