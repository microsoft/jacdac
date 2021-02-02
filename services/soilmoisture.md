# Soil moisture

    identifier: 0x1d4aa3b3
    extends: _sensor

A soil moisture sensor.

## Registers

    ro moisture: u0.16 / { preferred_interval=1000 } @ reading

Indicates the wetness of the soil, from ``dry`` to ``wet``.

    enum Variant: u8 {
         Resistive = 1
         Capacitive = 2
    }
    const variant?: Variant @ variant

Describe the type of physical sensor.

## Events

    rw dry_threshold: u0.16 / @ low_threshold

Threshold when reading data gets low and triggers a ``dry`` event.

    rw wet_threshold: u0.16 / @ high_threshold

Thresholds when reading data gets high and triggers a ``wet`` event.

## Events

    event dry @ low {}

Notifies that the dry threshold has been crossed

    event wet @ high {}

Notifies that the wet threshold has been crossed
