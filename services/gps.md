# GPS

    identifier: 0x19dd6136
    extends: _sensor
    camel: gps

A Global Positioning Device. NMEA message reference at https://www.sparkfun.com/datasheets/GPS/NMEA%20Reference%20Manual-Rev2.1-Dec07.pdf.

## Registers

    ro position @ reading {
        time: u32 utc_time
        latitude: i12.20 ° { absolute_min=-90, absolute_max=90 }
        longitude: i12.20 ° { absolute_min=-180, absolute_max=180 }
    }

Reported position and time of position.

    rw enabled?: bool @ intensity

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
         quality: FixQuality
         satellites: u8
         hdop: u12.20
         antenna_height: i10.22 m
         geoidal_separation: i10.22 m
         age_of_differential_corretion: u16 s
         differential_reference_station: u16
     }

GPS fix information extracted from a GGA message.

## Event

    event change @ change

The reported position was updated.

    event active @ active

The GPS is enabled and ready to receive position data.

    event inactive @ inactive

The GPS module is disabled or lost connection with satellites.
