# Single Wire Serial (SWS)

The JACDAC single wire serial (SWS) implementation provides a universal interface for interconnecting microcontrollers and peripherals. It makes use of an often forgotten protocol that is nearly as common as I2C and SPI, __UART__.

JACDAC devices that use the single wire serial implementation are connected in a bus topology to a shared electrical medium (wire, or PCB trace). Each device operates a software stack consisting of four layers:

1. [Physical](#the-physical-layer): this layer handles the transmission and reception of packets.
2. [Transport](./transport.md): this layer handles packet queuing for user applications and optionally manages reliable communication via pipes.
3. [Control](./control.md): this layer is responsible advertising a device on the bus and receiving control commands from other devices.
4. (optional) [Service](./service.md): this layer contains zero or more services that serve resources to the bus. Services model device resources and can be physical resources like sensors, or virtual resources like memory.

![An image describing the topology of JACDAC. Each device is connected to a shared bus and has a software stack that consists of: physical, transport, control and an optional service layer.](./images/JACDAC-stack.svg)

## The Physical Layer

For communication JACDAC SWS reuses the often forgotten RS232 (UART) peripheral, common to many microcontrollers. Devices operate UART peripherals in half-duplex mode and are connected together to form a single bus. This bus requires a shared data line and a common ground line between devices.

Like with standard UART, a logical one is represented as 3.3V and a logical 0 as 0V. Data bytes are 10 bits long and are composed of 1 start bit, 8 data bits, and one stop bit. JACDAC devices must only communicate at 1 Mbaud. When no data is being transmitted, the bus must read as a logical one.

In the SWS implementation of JACDAC, any device can initiate a transmission at any time. Because of this, devices must assert control over the bus before sending any data. This is where JACDAC differs from half-duplex UART–––devices must assert control over the bus by pulsing the line low before transmitting any data. This low pulse is known as the start pulse and must be between 11 and 15 microseconds in duration. This duration is recognised as a break condition on most UART hardware.

When the start pulse is over, devices have minimally 40 microseconds to configure IO registers to receive UART data. If no data byte is received within 80 microseconds, an error condition must be triggered and devices must wait for the bus to return to an idle state. This means that the first data byte must commence at 69 microseconds after the lo pulse in order to be specification compliant.

After the transmitter has sent its data, it must then pulse the line low one final time to signal to other devices it has finished its transmission. The duration of this end pulse is between 11 and 15 microseconds so to trigger another UART break condition. The end pulse can come immediately after the last data byte, but it must occur within 80 microseconds of the last data byte. If it does not, an error condition is generated and devices must wait until the bus has entered an idle state.

A small amount of time must pass before another transmission can begin. Devices must wait minimally 100 microseconds plus a randomly generated backoff value so that multiple devices do not initiate transmission at precisely the same time. It is therefore extremely important that all devices have some randomness in their transmission sequence to reduce the likelihood of data loss.

A complete JACDAC transmission and the beginning of another are captured in the image below.

![An image depicting a JACDAC transmission. A JACDAC transmission begins with a start pulse of 11-14 us, a inter lo data spacing of minimally 40 us before data commences. A JACDAC transmission ends with an end pulse of 11-14 us.](./images/JACDAC-activity.svg)

### Hardware requirements

There is no silicon implementation of JACDAC SWS and a microcontroller is currently required to implement the behaviour above. The diversity of microcontrollers and the flexibility of UART hardware means that there are many pathways to reaching a specification compliant JACDAC SWS implementation.

To recap, JACDAC SWS requires the following basic functionality:

* Transmitting / receiving UART-style (10 bits: 1 byte, 1 stop bit, 1 start bit) bytes at 1Mbaud in half-duplex mode (implemented in hardware or in software via bit-banging).
* A GPIO with an internal or external 300k pull up and support for interrupts (implemented in hardware or in software by spin waiting).
* The ability to keep time (whether through instruction counting or a hardware timer).
* The ability to generate random numbers (or at least seed a software random number generator).

<!--
We enumerate a few of the options we have explored below.

#### 32-bit ARM processors

Many ARM processors come with DMA-able (Direct Memory Access) UART peripherals. This means that no CPU intervention is required to send or receive UART data. Many of these processors also support half-duplex mode and internally tie RX to TX together when this mode is selected. For microcontrollers that do not support internal ties, these pins can usually be connected to each other externally for the same effect. Internal pull ups and timers often also come built into this class of microcontroller.

JACDAC has been implemented on the following 32-bit ARM processors:

* Atmel SAMD21, SAMD51
* Nordic NRF52832, NRF52833, NRF52840
* STM 32F0, 32F1, 32F4

#### 8-bit processors

8-bit processors are typically not as capable as 32-bit ARM processors, but they are often cheaper. Throughout the design of JACDAC we have considered this class of processor and have implemented JACDAC on 8-bit processors with and without UART support. Through a software UART implementation via the PADAUK PMS150C, JACDAC can be added to any sensor at the cost of 2.5 US cents.-->

## Transmission sequence

1. Place GPIO in high impedence input mode.
2. Check to see if the line is low.
   - If the line is already low, start the reception sequence instead.
3. Place GPIO pin in output mode
4. Pulse the line low for 11––15 microseconds.
5. Configure the UART peripheral with the correct baud rate and begin transmitting data after (minimally) 40 microseconds.


## Reception sequence

1. Place GPIO in high impedence input mode with a PullUp.
2. Enable GPIO edge interrupts, UART break interrupts, or spin wait until the line goes low.
3. When the start pulse has been detected configure UART registers appropriately. We recommend UART hardware is enabled after the start pulse is complete––otherwise the UART hardware may incorrectly detect a data byte or trigger an error condition.
4. Receive data until the end pulse is detected. This can be achieved easily on most hardware via interrupts or by polling the line state from software.

## Error detection

The image below captures key timings of JACDAC SWS. An error condition must be triggered whenever any of the protocol timings are violated.

![An image depicting a JACDAC transmission with portions of the signal labelled, A-F.](./images/JACDAC-proto-timings.svg)

| Identifier 	| Name 	| Duration min/max (us) 	|
|------------	|-------------	|----------	|
| A          	|Start pulse	|11/15	|
| B          	|Start-data gap	|40/89	|
| C          	|Data-byte gap	|0/80	|
| D          	|Data-end gap	|0/80	|
| E          	|End pulse	|11/15	|
| F          	|Frame-to-frame gap	|100/	|

The image below encapsulates how these timings should be used during frame reception:

![An image depicting the state machine to be used when receiving a JACDAC packet. Whenever any timing is exceeded, the device should wait for the frame-to-frame gap to elapse before listening for another packet.](./images/JACDAC-state-diagram.svg)


## Frame layout

The previous sections have discussed how a frame is represented on the wire but there has been little discussion around how data is organised within a frame.

A JACDAC frame has the following layout in memory:

```c
struct _jd_frame_t {
    uint16_t frame_crc;
    uint8_t frame_size;
    uint8_t frame_flags;
    uint64_t device_identifier;
    uint8_t data[240]; // maximum
} __attribute__((__packed__, aligned(4)));
typedef struct _jd_frame_t jd_frame_t;
```

On the wire, the frame must be transmitted in little endian format (i.e. low byte of `frame_crc` first). The total maximum frame size is 252 bytes, selected to keep the total size of packet under `255` (the DMA limit on some hardware)
and aligned to 4. The following table defines the meaning and size of the fields above.

| Memory offset | Field size (bytes) 	| Field name 	| Description  	|
|--------|------------	|-------------	|----------	|
| 0 | 2          	|frame_crc	| 16-bit	CRC CCITT of all following fields. |
| 2 | 1          	|frame_size	| Size of the data field.	|
| 3 | 1          	|frame_flags	| Flags specific to this frame.	|
| 4 | 8          	|device_identifier	| 64-bit device identifier.	|
| 12 | 1 * frame_size   	|data	| The data payload of the frame.	|

The data portion of a JACDAC frame is also structured and is internally divided into 1 or more packets. __Zero length frames are not supported__. Each packet has the following layout in memory:

```c
struct _jd_packet_t {
    uint8_t packet_size;
    uint8_t service_instance;
    uint16_t service_command;
    uint8_t payload[236];
} __attribute__((__packed__, aligned(4)));
typedef struct _jd_packet_t jd_packet_t;
```

The following table defines the meaning and size of the fields above. The meaning of these fields will become clearer later on in this document.

| Memory offset | Field size (bytes) 	| Field name 	| Description  	|
|--------|------------	|-------------	|----------	|
| 12 | 1	|packet_size	| The size of the payload field. Maximum size is 236 bytes. |
| 13 | 1	|service_instance	| The instance number of the destination service.	|
| 14 | 2	|service_command	| The command number for the action to be performed.	|
| 16 | 1 * packet_size	|payload	| The packt data payload destined for a particular service.	|

Packets are placed back-to-back inside the frame `data` field and must be padded so they start at a 4 byte boundary (i.e. `packet_size` is divisible by 4). Logically, packets placed in the same frame all share the frame fields and thus the same `device_identifier`. Therefore only one device can be addressed by a JACDAC frame at a time.