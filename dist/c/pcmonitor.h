// Autogenerated C header file for PC monitor
#ifndef _JACDAC_SPEC_PCMONITOR_H
#define _JACDAC_SPEC_PCMONITOR_H 1

#define JD_SERVICE_CLASS_PCMONITOR  0x18627b15

/**
 * Read-only % uint8_t. CPU usage in percent.
 */
#define JD_PCMONITOR_REG_CPU_USAGE 0x190

/**
 * Read-only °C uint8_t. CPU temperature in Celsius.
 */
#define JD_PCMONITOR_REG_CPU_TEMPERATURE 0x191

/**
 * Read-only % uint8_t. RAM usage in percent.
 */
#define JD_PCMONITOR_REG_RAM_USAGE 0x192

/**
 * GPU info.
 */
#define JD_PCMONITOR_REG_GPU_INFORMATION 0x193
typedef struct jd_pcmonitor_gpu_information {
    uint8_t usage; // %
    uint8_t temperature; // °C
} jd_pcmonitor_gpu_information_t;


/**
 * Network transmit/receive speed in Kbytes per second.
 */
#define JD_PCMONITOR_REG_NETWORK_INFORMATION 0x195
typedef struct jd_pcmonitor_network_information {
    uint16_t tx; // KB
    uint16_t rx; // KB
} jd_pcmonitor_network_information_t;


#endif
