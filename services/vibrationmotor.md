# Vibration motor

    identifier: 0x183fc4a2
    status: rc

A vibration motor.

## Commands

    command vibrate @ 0x80 {
    repeats:
        duration: u8 8ms,
        intensity: u0.8 /
    }

Starts a sequence of vibration and pauses. To stop any existing vibration, send an empty payload.
