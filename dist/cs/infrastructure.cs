namespace Jacdac {
    // Service: Infrastructure
    public static class InfrastructureConstants
    {
        public const uint ServiceClass = 0x1e1589eb;
    }

    public enum InfrastructureVariant: byte { // uint8_t
        Pipe = 0x1,
    }

    public enum InfrastructureReg {
        /**
         * Constant Variant (uint8_t). Describes the type of infrastructure feature supported.
         *
         * ```
         * const [variant] = jdunpack<[InfrastructureVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
