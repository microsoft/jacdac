# Motion

A sensor, typically PIR, that detects object motion within a certain range

    identifier: 0x1179a749
    extends: _sensor
    group: movement
    tags: 8bit
    status: experimental

## Registers

    ro moving: bool { preferred_interval=1000 } @ reading

Reports is movement is currently detected by the sensor.

    const max_distance?: u16.16 m @ 0x180

Maximum distance where objects can be detected.

    const angle?: u16 ° @ 0x181

Opening of the field of view

    enum Variant: u8 {
      PIR = 1
    }
    const variant?: Variant @ variant

Type of physical sensor

## Events

    event movement @ active { }

A movement was detected.