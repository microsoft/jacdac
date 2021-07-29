namespace Jacdac {
    public static class ServoConstants
    {
    // Service: Servo
        public const uint ServiceClass = 0x12fc9103;
    }
    public enum ServoReg {
        /**
         * Read-write ° i16.16 (int32_t). Specifies the angle of the arm.
         *
         * ```
         * const [angle] = jdunpack<[number]>(buf, "i16.16")
         * ```
         */
        Angle = 0x2,

        /**
         * Read-write bool (uint8_t). Turn the power to the servo on/off.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-write ° i16.16 (int32_t). Correction applied to the angle to account for the servo arm drift.
         *
         * ```
         * const [offset] = jdunpack<[number]>(buf, "i16.16")
         * ```
         */
        Offset = 0x81,

        /**
         * Constant ° i16.16 (int32_t). Lowest angle that can be set.
         *
         * ```
         * const [minAngle] = jdunpack<[number]>(buf, "i16.16")
         * ```
         */
        MinAngle = 0x110,

        /**
         * Read-write μs uint16_t. The length of pulse corresponding to lowest angle.
         *
         * ```
         * const [minPulse] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        MinPulse = 0x83,

        /**
         * Constant ° i16.16 (int32_t). Highest angle that can be set.
         *
         * ```
         * const [maxAngle] = jdunpack<[number]>(buf, "i16.16")
         * ```
         */
        MaxAngle = 0x111,

        /**
         * Read-write μs uint16_t. The length of pulse corresponding to highest angle.
         *
         * ```
         * const [maxPulse] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        MaxPulse = 0x85,

        /**
         * Constant kg/cm u16.16 (uint32_t). The servo motor will stop rotating when it is trying to move a ``stall_torque`` weight at a radial distance of ``1.0`` cm.
         *
         * ```
         * const [stallTorque] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        StallTorque = 0x180,

        /**
         * Constant s/60° u16.16 (uint32_t). Time to move 60°.
         *
         * ```
         * const [responseSpeed] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        ResponseSpeed = 0x181,
    }

}
