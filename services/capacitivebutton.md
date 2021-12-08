# Capacitive Button

    identifier: 0x2865adc9
    tags: 8bit
    group: button
    status: rc

A configuration service for a capacitive push-button.

## Registers

    rw threshold: u0.16 / @ active_threshold
    
Indicates the threshold for ``up`` events.

## Commands

    command calibrate @ calibrate { }
    report { }

Request to calibrate the capactive. When calibration is requested, the device expects that no object is touching the button. 
The report indicates the calibration is done.
