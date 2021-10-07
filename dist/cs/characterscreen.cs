namespace Jacdac {
    // Service: Character Screen
    public static class CharacterScreenConstants
    {
        public const uint ServiceClass = 0x1f37c56a;
    }

    public enum CharacterScreenVariant: byte { // uint8_t
        LCD = 0x1,
        OLED = 0x2,
        Braille = 0x3,
    }


    public enum CharacterScreenTextDirection: byte { // uint8_t
        LeftToRight = 0x1,
        RightToLeft = 0x2,
    }

    public enum CharacterScreenReg {
        /**
         * Read-write string (bytes). Text to show. Use `\n` to break lines.
         *
         * ```
         * const [message] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Message = 0x2,

        /**
         * Read-write ratio u0.8 (uint8_t). Brightness of the screen. `0` means off.
         *
         * ```
         * const [brightness] = jdunpack<[number]>(buf, "u0.8")
         * ```
         */
        Brightness = 0x1,

        /**
         * Constant Variant (uint8_t). Describes the type of character LED screen.
         *
         * ```
         * const [variant] = jdunpack<[CharacterScreenVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,

        /**
         * Read-write TextDirection (uint8_t). Specifies the RTL or LTR direction of the text.
         *
         * ```
         * const [textDirection] = jdunpack<[CharacterScreenTextDirection]>(buf, "u8")
         * ```
         */
        TextDirection = 0x82,

        /**
         * Constant uint8_t. Gets the number of rows.
         *
         * ```
         * const [rows] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Rows = 0x180,

        /**
         * Constant uint8_t. Gets the number of columns.
         *
         * ```
         * const [columns] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Columns = 0x181,
    }

    public enum CharacterScreenCmd {
        /**
         * Overrides the content of a single line at a 0-based index.
         *
         * ```
         * const [index, message] = jdunpack<[number, string]>(buf, "u16 s")
         * ```
         */
        SetLine = 0x80,

        /**
         * No args. Clears all text from the display.
         */
        Clear = 0x81,
    }

}
