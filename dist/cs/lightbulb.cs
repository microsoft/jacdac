namespace Jacdac {
    // Service: Light bulb
    public static class LightBulbConstants
    {
        public const uint ServiceClass = 0x1cab054c;
    }
    public enum LightBulbReg {
        /**
         * Read-write uint16_t. Indicates the brightness of the light bulb. Zero means completely off and 0xffff means completely on.
         * For non-dimmeable lights, the value should be clamp to 0xffff for any non-zero value.
         *
         * ```
         * const [brightness] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        Brightness = 0x1,

        /**
         * Constant bool (uint8_t). Indicates if the light supports dimming.
         *
         * ```
         * const [dimmeable] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Dimmeable = 0x180,
    }

    public enum LightBulbEvent {
        /**
         * Emitted when the light brightness is greater than 0.
         */
        On = 0x1,

        /**
         * Emitted when the light is completely off with brightness to 0.
         */
        Off = 0x2,
    }

}
