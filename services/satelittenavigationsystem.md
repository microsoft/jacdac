# Satellite Navigation System

    identifier: 0x19dd6136
    extends: _sensor
    camel: satNav
    status: experimental

A satellite-based navigation system like GPS, Gallileo, ...

## Registers

    ro position @ reading {
        timestamp: u64 ms
        latitude: i9.23 lat { absolute_min=-90, absolute_max=90 }
        longitude: i9.23 lon { absolute_min=-180, absolute_max=180 }
        accuracy: u16.16 m
        altitude: i26.6 m
        altitudeAccuracy: u16.16 m
    }

Reported coordinates, geometric altitude and time of position. Altitude accuracy is 0 if not available.

    rw enabled: bool @ intensity

Enables or disables the GPS module

## Events

    event inactive @ inactive

The module is disabled or lost connection with satellites.
