namespace Jacdac {
    // Service: Arcade Gamepad
    public static class ArcadeGamepadConstants
    {
        public const uint ServiceClass = 0x1deaa06e;
    }

    public enum ArcadeGamepadButton { // uint8_t
        Left = 0x1,
        Up = 0x2,
        Right = 0x3,
        Down = 0x4,
        A = 0x5,
        B = 0x6,
        Menu = 0x7,
        Select = 0x8,
        Reset = 0x9,
        Exit = 0xa,
    }

    public enum ArcadeGamepadReg {
        /**
         * Indicates which buttons are currently active (pressed).
         * `pressure` should be `0xff` for digital buttons, and proportional for analog ones.
         *
         * ```
         * const [rest] = jdunpack<[([ArcadeGamepadButton, number])[]]>(buf, "r: u8 u0.8")
         * const [button, pressure] = rest[0]
         * ```
         */
        Buttons = 0x101,

        /**
         * Constant. Indicates number of players supported and which buttons are present on the controller.
         *
         * ```
         * const [button] = jdunpack<[ArcadeGamepadButton[]]>(buf, "u8[]")
         * ```
         */
        AvailableButtons = 0x180,
    }

    public enum ArcadeGamepadEvent {
        /**
         * Argument: button Button (uint8_t). Emitted when button goes from inactive to active.
         *
         * ```
         * const [button] = jdunpack<[ArcadeGamepadButton]>(buf, "u8")
         * ```
         */
        Down = 0x1,

        /**
         * Argument: button Button (uint8_t). Emitted when button goes from active to inactive.
         *
         * ```
         * const [button] = jdunpack<[ArcadeGamepadButton]>(buf, "u8")
         * ```
         */
        Up = 0x2,
    }

}
