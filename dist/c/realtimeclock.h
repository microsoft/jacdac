// Autogenerated C header file for Real time clock
#ifndef _JACDAC_SPEC_REAL_TIME_CLOCK_H
#define _JACDAC_SPEC_REAL_TIME_CLOCK_H 1

#define JD_SERVICE_CLASS_REAL_TIME_CLOCK  0x1a8b1a28

/**
 * Current time in 24h representation. Default streaming period is 1 second.
 */
#define JD_REAL_TIME_CLOCK_REG_NOW JD_REG_READING
typedef struct jd_real_time_clock_now {
    uint16_t year;
    uint8_t month;
    uint8_t day;
    uint8_t day_of_week;
    uint8_t hour;
    uint8_t min;
    uint8_t sec;
} jd_real_time_clock_now_t;


/**
 * Sets the current day time on the clock.
 */
#define JD_REAL_TIME_CLOCK_CMD_SET_TIME 0x80
typedef struct jd_real_time_clock_set_time {
    uint16_t year;
    uint8_t month;
    uint8_t day;
    uint8_t day_of_week;
    uint8_t hour;
    uint8_t min;
    uint8_t sec;
} jd_real_time_clock_set_time_t;


#endif
