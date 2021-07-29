namespace Jacdac {
    // Service: Random Number Generator
    public static class RngConstants
    {
        public const uint ServiceClass = 0x1789f0a2;
    }

    public enum RngVariant: byte { // uint8_t
        Quantum = 0x1,
        ADCNoise = 0x2,
        WebCrypto = 0x3,
    }

    public enum RngReg {
        /**
         * Read-only bytes. A register that returns a 64 bytes random buffer on every request.
         * This never blocks for a long time. If you need additional random bytes, keep querying the register.
         *
         * ```
         * const [random] = jdunpack<[Uint8Array]>(buf, "b")
         * ```
         */
        Random = 0x180,

        /**
         * Constant Variant (uint8_t). The type of algorithm/technique used to generate the number.
         * `Quantum` refers to dedicated hardware device generating random noise due to quantum effects.
         * `ADCNoise` is the noise from quick readings of analog-digital converter, which reads temperature of the MCU or some floating pin.
         * `WebCrypto` refers is used in simulators, where the source of randomness comes from an advanced operating system.
         *
         * ```
         * const [variant] = jdunpack<[RngVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

}
