namespace Jacdac {
    public static class MatrixKeypadConstants
    {
    // Service: Matrix Keypad
        public const uint ServiceClass = 0x13062dc8;
    }

    public enum MatrixKeypadVariant { // uint8_t
        Membrane = 0x1,
        Keyboard = 0x2,
        Elastomer = 0x3,
        ElastomerLEDPixel = 0x4,
    }

    public enum MatrixKeypadReg {
        /**
         * Read-only. The coordinate of the button currently pressed. Keys are zero-indexed from left to right, top to bottom:
         * ``row = index / columns``, ``column = index % columns``.
         *
         * ```
         * const [index] = jdunpack<[number[]]>(buf, "u8[]")
         * ```
         */
        Pressed = 0x101,

        /**
         * Constant uint8_t. Number of rows in the matrix
         *
         * ```
         * const [rows] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Rows = 0x180,

        /**
         * Constant uint8_t. Number of columns in the matrix
         *
         * ```
         * const [columns] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Columns = 0x181,

        /**
         * Constant. The characters printed on the keys if any, in indexing sequence.
         *
         * ```
         * const [label] = jdunpack<[string[]]>(buf, "z[]")
         * ```
         */
        Labels = 0x182,

        /**
         * Constant Variant (uint8_t). The type of physical keypad. If the variant is ``ElastomerLEDPixel``
         * and the next service on the device is a ``LEDPixel`` service, it is considered
         * as the service controlling the LED pixel on the keypad.
         *
         * ```
         * const [variant] = jdunpack<[MatrixKeypadVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

    public enum MatrixKeypadEvent {
        /**
         * Argument: uint8_t. Emitted when a key, at the given index, goes from inactive (`pressed == 0`) to active.
         *
         * ```
         * const [down] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Down = 0x1,

        /**
         * Argument: uint8_t. Emitted when a key, at the given index, goes from active (`pressed == 1`) to inactive.
         *
         * ```
         * const [up] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Up = 0x2,

        /**
         * Argument: uint8_t. Emitted together with `up` when the press time was not longer than 500ms.
         *
         * ```
         * const [click] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Click = 0x80,

        /**
         * Argument: uint8_t. Emitted together with `up` when the press time was more than 500ms.
         *
         * ```
         * const [longClick] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        LongClick = 0x81,
    }

}
