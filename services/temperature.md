# Temperature

    identifier: 0x1421bac7
    extends: _sensor

A thermometer measuring outside environment.

## Registers

Default streaming interval is 1s.

    ro temperature: u22.10 C @ reading

The temperature.
