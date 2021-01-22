# Vibration motor

    identifier: 0x183fc4a2

A vibration motor.

## Registers

    ro speed: u8 / @ reading

Rotation speed of the motor. If only one rotation speed is supported,
then `0` shell be off, and any other number on. 
Use the ``vibrate`` command to control the register.

    rw enabled: bool @ intensity

Determines if the vibration motor responds to vibrate commands.

## Commands

    command vibrate @ 0x80 {
    repeats:
        duration: u8 8ms,
        speed: u8 /
    }

Starts a sequence of vibration and pauses.
