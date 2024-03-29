// Autogenerated C header file for Protocol Test
#ifndef _JACDAC_SPEC_PROTO_TEST_H
#define _JACDAC_SPEC_PROTO_TEST_H 1

#define JD_SERVICE_CLASS_PROTO_TEST  0x16c7466a

/**
 * Read-write bool (uint8_t). A read write bool register.
 */
#define JD_PROTO_TEST_REG_RW_BOOL 0x81

/**
 * Read-only bool (uint8_t). A read only bool register. Mirrors rw_bool.
 */
#define JD_PROTO_TEST_REG_RO_BOOL 0x181

/**
 * Read-write uint32_t. A read write u32 register.
 */
#define JD_PROTO_TEST_REG_RW_U32 0x82

/**
 * Read-only uint32_t. A read only u32 register.. Mirrors rw_u32.
 */
#define JD_PROTO_TEST_REG_RO_U32 0x182

/**
 * Read-write int32_t. A read write i32 register.
 */
#define JD_PROTO_TEST_REG_RW_I32 0x83

/**
 * Read-only int32_t. A read only i32 register.. Mirrors rw_i32.
 */
#define JD_PROTO_TEST_REG_RO_I32 0x183

/**
 * Read-write string (bytes). A read write string register.
 */
#define JD_PROTO_TEST_REG_RW_STRING 0x84

/**
 * Read-only string (bytes). A read only string register. Mirrors rw_string.
 */
#define JD_PROTO_TEST_REG_RO_STRING 0x184

/**
 * Read-write bytes. A read write string register.
 */
#define JD_PROTO_TEST_REG_RW_BYTES 0x85

/**
 * Read-only bytes. A read only string register. Mirrors ro_bytes.
 */
#define JD_PROTO_TEST_REG_RO_BYTES 0x185

/**
 * A read write i8, u8, u16, i32 register.
 */
#define JD_PROTO_TEST_REG_RW_I8_U8_U16_I32 0x86
typedef struct jd_proto_test_rw_i8_u8_u16_i32 {
    int8_t i8;
    uint8_t u8;
    uint16_t u16;
    int32_t i32;
} jd_proto_test_rw_i8_u8_u16_i32_t;


/**
 * A read only i8, u8, u16, i32 register.. Mirrors rw_i8_u8_u16_i32.
 */
#define JD_PROTO_TEST_REG_RO_I8_U8_U16_I32 0x186
typedef struct jd_proto_test_ro_i8_u8_u16_i32 {
    int8_t i8;
    uint8_t u8;
    uint16_t u16;
    int32_t i32;
} jd_proto_test_ro_i8_u8_u16_i32_t;


/**
 * A read write u8, string register.
 */
#define JD_PROTO_TEST_REG_RW_U8_STRING 0x87
typedef struct jd_proto_test_rw_u8_string {
    uint8_t u8;
    char str[0];  // string
} jd_proto_test_rw_u8_string_t;


/**
 * A read only u8, string register.. Mirrors rw_u8_string.
 */
#define JD_PROTO_TEST_REG_RO_U8_STRING 0x187
typedef struct jd_proto_test_ro_u8_string {
    uint8_t u8;
    char str[0];  // string
} jd_proto_test_ro_u8_string_t;


/**
 * Argument: bo bool (uint8_t). An event raised when rw_bool is modified
 */
#define JD_PROTO_TEST_EV_E_BOOL 0x81

/**
 * Argument: u32 uint32_t. An event raised when rw_u32 is modified
 */
#define JD_PROTO_TEST_EV_E_U32 0x82

/**
 * Argument: i32 int32_t. An event raised when rw_i32 is modified
 */
#define JD_PROTO_TEST_EV_E_I32 0x83

/**
 * Argument: str string (bytes). An event raised when rw_string is modified
 */
#define JD_PROTO_TEST_EV_E_STRING 0x84

/**
 * Argument: bytes bytes. An event raised when rw_bytes is modified
 */
#define JD_PROTO_TEST_EV_E_BYTES 0x85

/**
 * An event raised when rw_i8_u8_u16_i32 is modified
 */
#define JD_PROTO_TEST_EV_E_I8_U8_U16_I32 0x86
typedef struct jd_proto_test_e_i8_u8_u16_i32 {
    int8_t i8;
    uint8_t u8;
    uint16_t u16;
    int32_t i32;
} jd_proto_test_e_i8_u8_u16_i32_t;


/**
 * An event raised when rw_u8_string is modified
 */
#define JD_PROTO_TEST_EV_E_U8_STRING 0x87
typedef struct jd_proto_test_e_u8_string {
    uint8_t u8;
    char str[0];  // string
} jd_proto_test_e_u8_string_t;


/**
 * Argument: bo bool (uint8_t). A command to set rw_bool.
 */
#define JD_PROTO_TEST_CMD_C_BOOL 0x81

/**
 * Argument: u32 uint32_t. A command to set rw_u32.
 */
#define JD_PROTO_TEST_CMD_C_U32 0x82

/**
 * Argument: i32 int32_t. A command to set rw_i32.
 */
#define JD_PROTO_TEST_CMD_C_I32 0x83

/**
 * Argument: str string (bytes). A command to set rw_string.
 */
#define JD_PROTO_TEST_CMD_C_STRING 0x84

/**
 * Argument: bytes bytes. A command to set rw_string.
 */
#define JD_PROTO_TEST_CMD_C_BYTES 0x85

/**
 * A command to set rw_bytes.
 */
#define JD_PROTO_TEST_CMD_C_I8_U8_U16_I32 0x86
typedef struct jd_proto_test_c_i8_u8_u16_i32 {
    int8_t i8;
    uint8_t u8;
    uint16_t u16;
    int32_t i32;
} jd_proto_test_c_i8_u8_u16_i32_t;


/**
 * A command to set rw_u8_string.
 */
#define JD_PROTO_TEST_CMD_C_U8_STRING 0x87
typedef struct jd_proto_test_c_u8_string {
    uint8_t u8;
    char str[0];  // string
} jd_proto_test_c_u8_string_t;


/**
 * Argument: p_bytes pipe (bytes). A command to read the content of rw_bytes, byte per byte, as a pipe.
 */
#define JD_PROTO_TEST_CMD_C_REPORT_PIPE 0x90

/**
 * Argument: byte uint8_t. A command to read the content of rw_bytes, byte per byte, as a pipe.
 */

#endif
