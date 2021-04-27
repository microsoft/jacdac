# Pressure Button

    identifier: 0x181740c3
    tags: 8bit
    group: button

A pressure sensitive push-button.

## Registers

    rw down_threshold: u0.16 / @ inactive_threshold
    
Indicates the lower threshold for ``down`` events.

    rw up_threshold: u0.16 / @ active_threshold
    
Indicates the threshold for ``up`` events.
