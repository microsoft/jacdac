namespace Jacdac {
    // Service: Power
    public static class PowerConstants
    {
        public const uint ServiceClass = 0x1fa4c95a;
    }

    public enum PowerPowerStatus { // uint8_t
        Disallowed = 0x0,
        Powering = 0x1,
        Overload = 0x2,
        Overprovision = 0x3,
    }

    public enum PowerReg {
        /**
         * Read-write bool (uint8_t). Can be used to completely disable the service.
         * When allowed, the service may still not be providing power, see
         * `power_status` for the actual current state.
         *
         * ```
         * const [allowed] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Allowed = 0x1,

        /**
         * Read-write mA uint16_t. Limit the power provided by the service. The actual maximum limit will depend on hardware.
         * This field may be read-only in some implementations - you should read it back after setting.
         *
         * ```
         * const [maxPower] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        MaxPower = 0x7,

        /**
         * Read-only PowerStatus (uint8_t). Indicates whether the power provider is currently providing power (`Powering` state), and if not, why not.
         * `Overprovision` means there was another power provider, and we stopped not to overprovision the bus.
         *
         * ```
         * const [powerStatus] = jdunpack<[PowerPowerStatus]>(buf, "u8")
         * ```
         */
        PowerStatus = 0x181,

        /**
         * Read-only mA uint16_t. Present current draw from the bus.
         *
         * ```
         * const [currentDraw] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        CurrentDraw = 0x101,

        /**
         * Read-only mV uint16_t. Voltage on input.
         *
         * ```
         * const [batteryVoltage] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        BatteryVoltage = 0x180,

        /**
         * Read-only ratio u0.16 (uint16_t). Fraction of charge in the battery.
         *
         * ```
         * const [batteryCharge] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        BatteryCharge = 0x182,

        /**
         * Constant mWh uint32_t. Energy that can be delivered to the bus when battery is fully charged.
         * This excludes conversion overheads if any.
         *
         * ```
         * const [batteryCapacity] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        BatteryCapacity = 0x183,

        /**
         * Read-write ms uint16_t. Many USB power packs need current to be drawn from time to time to prevent shutdown.
         * This regulates how often and for how long such current is drawn.
         * Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.
         *
         * ```
         * const [keepOnPulseDuration] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        KeepOnPulseDuration = 0x80,

        /**
         * Read-write ms uint16_t. Many USB power packs need current to be drawn from time to time to prevent shutdown.
         * This regulates how often and for how long such current is drawn.
         * Typically a 1/8W 22 ohm resistor is used as load. This limits the duty cycle to 10%.
         *
         * ```
         * const [keepOnPulsePeriod] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        KeepOnPulsePeriod = 0x81,
    }

    public enum PowerCmd {
        /**
         * No args. Sent by the power service periodically, as broadcast.
         */
        Shutdown = 0x80,
    }

    public enum PowerEvent {
        /**
         * Argument: power_status PowerStatus (uint8_t). Emitted whenever `power_status` changes.
         *
         * ```
         * const [powerStatus] = jdunpack<[PowerPowerStatus]>(buf, "u8")
         * ```
         */
        PowerStatusChanged = 0x3,
    }

}
