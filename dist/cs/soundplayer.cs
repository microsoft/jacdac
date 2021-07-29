namespace Jacdac {
    public static class SoundPlayerConstants
    {
    // Service: Sound player
        public const uint ServiceClass = 0x1403d338;
    }
    public enum SoundPlayerReg {
        /**
         * Read-write ratio u0.16 (uint16_t). Global volume of the output. ``0`` means completely off. This volume is mixed with each play volumes.
         *
         * ```
         * const [volume] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Volume = 0x1,
    }

    public enum SoundPlayerCmd {
        /**
         * Argument: string (bytes). Starts playing a sound.
         *
         * ```
         * const [play] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Play = 0x80,

        /**
         * Argument: sounds_port pipe (bytes). Returns the list of sounds available to play.
         *
         * ```
         * const [soundsPort] = jdunpack<[Uint8Array]>(buf, "b[12]")
         * ```
         */
        ListSounds = 0x81,
    }


    /**
     * pipe_report ListSoundsPipe
     * ```
     * const [duration, name] = jdunpack<[number, string]>(buf, "u32 s")
     * ```
     */


}
