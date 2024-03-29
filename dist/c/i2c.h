// Autogenerated C header file for I2C
#ifndef _JACDAC_SPEC_I2C_H
#define _JACDAC_SPEC_I2C_H 1

#define JD_SERVICE_CLASS_I2C  0x1c18ca43

// enum Status (uint8_t)
#define JD_I2C_STATUS_OK 0x0
#define JD_I2C_STATUS_NACK_ADDR 0x1
#define JD_I2C_STATUS_NACK_DATA 0x2
#define JD_I2C_STATUS_NO_I2C 0x3

/**
 * Read-only bool (uint8_t). Indicates whether the I2C is working.
 */
#define JD_I2C_REG_OK 0x180

/**
 * `address` is 7-bit.
 * `num_read` can be 0 if nothing needs to be read.
 * The `write_buf` includes the register address if required (first one or two bytes).
 */
#define JD_I2C_CMD_TRANSACTION 0x80
typedef struct jd_i2c_transaction {
    uint8_t address;
    uint8_t num_read; // B
    uint8_t write_buf[0];
} jd_i2c_transaction_t;


/**
 * Report: 
 */
typedef struct jd_i2c_transaction_report {
    uint8_t status;  // Status
    uint8_t read_buf[0];
} jd_i2c_transaction_report_t;


#endif
