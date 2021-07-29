namespace Jacdac {
    // Service: Rover
    public static class RoverConstants
    {
        public const uint ServiceClass = 0x19f4d06b;
    }
    public enum RoverReg {
        /**
         * The current position and orientation of the robot.
         *
         * ```
         * const [x, y, vx, vy, heading] = jdunpack<[number, number, number, number, number]>(buf, "i16.16 i16.16 i16.16 i16.16 i16.16")
         * ```
         */
        Kinematics = 0x101,
    }

}
