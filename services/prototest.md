# Protocol Test

    identifier: 0x16c7466a
    camel: protoTest
    tags: infrastructure

This is test service to validate the protocol packet transmissions between the browser and a MCU.
Use this page if you are porting Jacdac to a new platform.

### Test procedure

For each ``rw`` registers, set a random value ``x``
  * read ``rw`` and check value is equal to ``x``
  * read ``ro`` and check value is equal to ``x``
  * listen to ``e`` event and check that data is equal to ``x``
  * call ``c`` command with new random value ``y``
  * read ``rw`` and check value is equal to ``y``
  * do all the above steps with acks

For each ``rw`` registers, there shall also
be an ``event`` and a ``command``. The event
should get raised when the value changes;
and the command should set the value.
  
## Registers

Every ``rw`` register has a corresponding ``ro`` regisrer
and a corresponding ``set_...`` command to also set the value.

    rw rw_bool : bool @ 0x081

A read write bool register.

    ro ro_bool : bool @ 0x181

A read only bool register. Mirrors rw_bool.

    rw rw_u32 : u32 @ 0x082

A read write u32 register.

    ro ro_u32 : u32 @ 0x182

A read only u32 register.. Mirrors rw_u32.

    rw rw_i32 : i32 @ 0x083

A read write i32 register.

    ro ro_i32 : i32 @ 0x183

A read only i32 register.. Mirrors rw_i32.

    rw rw_string : string @ 0x084

A read write string register.

    ro ro_string : string @ 0x184

A read only string register. Mirrors rw_string.

    rw rw_bytes : bytes @ 0x085

A read write string register.

    ro ro_bytes : bytes @ 0x185

A read only string register. Mirrors ro_bytes.

    rw rw_i8_u8_u16_i32 @ 0x86 {
        i8: i8
        u8: u8
        u16: u16
        i32: i32
    }

A read write i8, u8, u16, i32 register.

    ro ro_i8_u8_u16_i32 @ 0x186 {
        i8: i8
        u8: u8
        u16: u16
        i32: i32
    }

A read only i8, u8, u16, i32 register.. Mirrors rw_i8_u8_u16_i32.

    rw rw_u8_string @ 0x87 {
        u8: u8
        str: string
    }

A read write u8, string register.

    ro ro_u8_string @ 0x187 {
        u8: u8
        str: string
    }

A read only u8, string register.. Mirrors rw_u8_string.

## Events

    event e_bool @ 0x81 { 
        bo: bool 
    }

An event raised when rw_bool is modified

    event e_u32 @ 0x82 { 
        u32: u32 
    }

An event raised when rw_u32 is modified

    event e_i32 @ 0x83 { 
        i32: i32 
    }

An event raised when rw_i32 is modified

    event e_string @ 0x84 { 
        str: string 
    }

An event raised when rw_string is modified

    event e_bytes @ 0x85 { 
        bytes: bytes 
    }

An event raised when rw_bytes is modified

    event e_i8_u8_u16_i32 @ 0x86 { 
        i8: i8
        u8: u8
        u16: u16
        i32: i32
    }

An event raised when rw_i8_u8_u16_i32 is modified

    event e_u8_string @ 0x87 { 
        u8: u8
        str: string
    }

An event raised when rw_u8_string is modified

## Commands

    command c_bool @ 0x81 {
        bo: bool
    }

A command to set rw_bool.

    command c_u32 @ 0x82 {
        u32: u32
    }

A command to set rw_u32.

    command c_i32 @ 0x83 {
        i32: i32
    }

A command to set rw_i32.

    command c_string @ 0x84 {
        str: string
    }

A command to set rw_string.

    command c_bytes @ 0x85 {
        bytes: bytes
    }

A command to set rw_string.

    command c_i8_u8_u16_i32 @ 0x86 {
        i8: i8
        u8: u8
        u16: u16
        i32: i32
    }

A command to set rw_bytes.

    command c_u8_string @ 0x87 {
        u8: u8
        str: string
    }

A command to set rw_u8_string.

    command c_report_pipe @ 0x90 {
        p_bytes: pipe
    }
    pipe report p_bytes {
        byte: u8
    }

A command to read the content of rw_bytes, byte per byte, as a pipe.