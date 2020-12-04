# Protocol Test

    identifier: 0x16c7466a
    camel: protoTest

This is test service to validate the protocol packet transmissions.

### Test procedure

For each ``rw`` registers, set a random value ``x``
  * read ``rw`` and check value is equal to ``x``
  * read ``ro`` and check value is equal to ``x``
  * listen to ``e`` event and check that data is equal to ``x``
  * call ``c`` command with new random value ``y``
  * read ``rw`` and check value is equal to ``y``

## Registers

Every ``rw`` register has a corresponding ``ro`` regisrer
and a corresponding ``set_...`` command to also set the value.

    rw rw_bool : bool @ 0x181

A read write bool register.

    ro ro_bool : bool @ 0x182

A read only bool register. Mirrors rw_bool.

    rw rw_u32 : u32 @ 0x190

A read write u32 register.

    ro ro_u32 : u32 @ 0x191

A read only u32 register.. Mirrors rw_u32.

    rw rw_i32 : i32 @ 0x192

A read write i32 register.

    ro ro_i32 : i32 @ 0x193

A read only i32 register.. Mirrors rw_i32.

    rw rw_string : string @ 0x1a0

A read write string register.

    ro ro_string : string @ 0x1a1

A read only string register. Mirrors rw_string.

    rw rw_bytes : bytes @ 0x1b0

A read write string register.

    ro ro_bytes : bytes @ 0x1b1

A read only string register. Mirrors ro_bytes.


A read only u8/u16/u32 register.

## Events

    event e_bool @ 0x180 { 
        bool: bool 
    }

An event raised when rw_bool is modified

    event e_u32 @ 0x190 { 
        u32: u32 
    }

An event raised when rw_u32 is modified

    event e_i32 @ 0x192 { 
        i32: i32 
    }

An event raised when rw_i32 is modified

## Commands

    command c_bool @ 0x80 {
        bool: bool
    }

A command to set rw_bool. Returns the value.

    command c_u32 @ 0x81 {
        u32: u32
    }

A command to set rw_u32. Returns the value.

    command c_i32 @ 0x82 {
        i32: i32
    }

A command to set rw_i32. Returns the value.
