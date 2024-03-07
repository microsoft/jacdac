# PC monitor

    identifier: 0x18627b15
    status: experimental
    camel: PCMonitor

Measures PC monitor.

## Registers

    ro cpu_usage: u8 % @ 0x190

CPU usage in percent.

    ro cpu_temperature: u8 °C @ 0x191

CPU temperature in Celsius.

    ro ram_usage: u8 % @ 0x192

RAM usage in percent.

    ro gpu_information @ 0x193 {
        usage: u8 %
        temperature: u8 °C
    }

GPU info.

    ro network_information @ 0x195 {
        tx: u16 KB
        rx: u16 KB
    }

Network transmit/receive speed in Kbytes per second.

A measure of PC monitor.
