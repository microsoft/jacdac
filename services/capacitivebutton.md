# Capacitive Button

    identifier: 0x1865adc9
    tags: 8bit
    group: button

A configuration service for a capacitive push-button.

## Registers

    rw down_threshold: u0.16 / @ inactive_threshold
    
Indicates the lower threshold for ``down`` events.

    rw up_threshold: u0.16 / @ active_threshold
    
Indicates the threshold for ``up`` events.

## Commands

    command calibrate @ calibrate { }
    report { }

Request to calibrate the capactive. When calibration is requested, the device expects that no object is touching the button. 
The report indicates the calibration is done.
