namespace Jacdac {
    // Service: Motor
    public static class MotorConstants
    {
        public const uint ServiceClass = 0x17004cd8;
    }
    public enum MotorReg {
        /**
         * Read-write ratio i1.15 (int16_t). PWM duty cycle of the motor. Use negative/positive values to run the motor forwards and backwards.
         * Positive is recommended to be clockwise rotation and negative counterclockwise. A duty of ``0``
         * while ``enabled`` acts as brake.
         *
         * ```
         * const [duty] = jdunpack<[number]>(buf, "i1.15")
         * ```
         */
        Duty = 0x2,

        /**
         * Read-write bool (uint8_t). Turn the power to the motor on/off.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Constant kg/cm u16.16 (uint32_t). Torque required to produce the rated power of an electrical motor at load speed.
         *
         * ```
         * const [loadTorque] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        LoadTorque = 0x180,

        /**
         * Constant rpm u16.16 (uint32_t). Revolutions per minute of the motor under full load.
         *
         * ```
         * const [loadSpeed] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        LoadSpeed = 0x181,
    }

}
