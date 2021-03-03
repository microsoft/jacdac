# Analog Button

    identifier: 0x1865adc9
    extends: _sensor
    tags: button, 8bit

A capacitive or pressure sensitive push-button.

## Registers

    ro pressure: u0.16 / @ reading

Indicates the current pressure (``force``) on the button.

    rw inactive_threshold: u0.16 / @ low_threshold
    
Indicates the lower threshold for ``inactive`` events.

    rw active_threshold: u0.16 / @ high_threshold
    
Indicates the threshold for ``active`` events.

    enum Variant: u8 {
        Pressure = 1
        Capacitive = 2
    }
    const variant?: Variant @ variant

The type of physical button.

## Events

    event active @ active

Emitted when button goes from inactive (pressure less than threshold) to active.

    event inactive @ inactive

Emitted when button goes from active (pressure higher than threshold) to inactive.
