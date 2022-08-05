# Satellite Navigation System

    identifier: 0x19dd6136
    extends: _sensor
    camel: satnav
    status: experimental

A satellite-based navigation system like GPS, Gallileo, ...

## Registers

    ro position @ reading {
        timestamp: u64 ms
        latitude: i9.23 lat { absolute_min=-90, absolute_max=90 }
        longitude: i9.23 lon { absolute_min=-180, absolute_max=180 }
        altitude: i26.6 m
    }

Reported coordinates, geometric altitude and time of position.

    rw enabled: bool @ intensity

Turns on or off the GPS antenna.

    enum FixQuality: u8 {
        NotAvailable = 0
        SinglePoint = 1
        Differential = 2
        RTKFixedAmbiguitySolution = 4
        RTKFloatingAmbiguitySolution = 5
        DeadReckoning = 6
        ManualInput = 7
        Simulator = 8
        WAAS  = 9
     }
     ro GGA @ 0x181 {
         hdop: u12.20
         antenna_height: i10.22 m
         geoidal_separation: i10.22 m
         age_of_differential_corretion: u16 s
         differential_reference_station: u16
         quality: FixQuality
         satellites: u8
     }

Fix information extracted from a GGA message.

## Events

    event fix_available @ active

The module is enabled and ready to receive position data.

    event inactive @ inactive

The module is disabled or lost connection with satellites.
