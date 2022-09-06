# Planar position

    identifier: 0x1dc37f55
    status: experimental
    extends: _sensor
    group: movement

A sensor that repors 2D position, typically an optical mouse tracking sensor.

The sensor starts at an arbitrary origin (0,0) and reports the distance from that origin.

The `streaming_interval` is respected when the position is changing. When the position is not changing, the streaming interval may be throttled to `500ms`.

# Registers

    ro position @ reading {
        x: i22.10 mm
        y: i22.10 mm
    }

The current position of the sensor.

    enum Variant : u8 {
        OpticalMousePosition = 1,
    }
    const variant? : Variant @ variant
    
Specifies the type of physical sensor.
