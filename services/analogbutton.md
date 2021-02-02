# Analog Button

    identifier: 0x1865adc9
    extends: _sensor

A simple pressure sensitive push-button.

## Registers

    ro pressure: u0.16 / @ reading

Indicates the current pressure (``force``) on the button.

    rw low_threshold: u0.16 / @ low_threshold
    
Indicates the lower threshold and upper threshold for ``up`` event.

    rw high_threshold: u0.16 / @ high_threshold
    
Indicates the lower threshold and upper threshold for the ``down`` event.

    enum Variant: u32 {
        Pressure = 1
        Capacitive = 2
    }
    const variant?: Variant @ variant

The type of physical button.

## Events

    event down @ active

Emitted when button goes from inactive (pressure less than threshold) to active.

    event up @ inactive

Emitted when button goes from active (pressure higher than threshold) to inactive.
