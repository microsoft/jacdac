# Pressure Button

    identifier: 0x1865adc9
    extends: _sensor

A simple pressure sensitive push-button.

## Registers

    ro pressure @ reading {
        force: u16 /
        velocity: i16 /
    }

Indicates the current pressure (``force`` and ``velocity``) on the button.
The ``velocity`` can be useful to approximate the intensity of the button press.

    rw threshold @ 0x80 {
        down: u16 /
        up: u16 /
    }
    
Indicates the lower threshold and upper threshold for the ``down`` and ``up`` events.


## Events

    event down @ 0x01
    
Emitted when pressure goes below the ``down`` threshhold

    event up @ 0x02
    
Emitted when button goes from aboce the ``up`` threshold
