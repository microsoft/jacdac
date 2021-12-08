# Vibration motor

    identifier: 0x183fc4a2
    status: stable

A vibration motor.

## Registers

    rw enabled: bool @ intensity

Determines if the vibration motor responds to vibrate commands.

## Commands

    command vibrate @ 0x80 {
    repeats:
        duration: u8 8ms,
        speed: u0.8 /
    }

Starts a sequence of vibration and pauses. To stop any existing vibration, send an empty payload.
