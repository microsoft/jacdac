namespace Jacdac {
    // Service: HID Adapter
    public const SRV_H_IDADAPTER = 0x1e5758b5
    public enum HIDAdapterReg {
        /**
         * Read-write uint8_t. The number of configurations stored on the server.
         *
         * ```
         * const [numConfigurations] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        NumConfigurations = 0x80,

        /**
         * Read-write uint8_t. The current configuration the server is using.
         *
         * ```
         * const [currentConfiguration] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        CurrentConfiguration = 0x81,
    }

    public enum HIDAdapterCmd {
        /**
         * Retrieves a configuration stored on the server. If the configuration does not exist, an empty report will be returned
         *
         * ```
         * const [results, configurationNumber] = jdunpack<[Uint8Array, number]>(buf, "b[12] u8")
         * ```
         */
        GetConfiguration = 0x80,

        /**
         * Stores the given binding on the server. If a binding exists at this index, the new binding will replace it.
         *
         * ```
         * const [configurationNumber, bindingIndex, deviceId, serviceClass, triggerValue, triggerContext, serviceIndex, selector, modifiers] = jdunpack<[number, number, number, number, number, number, number, number, number]>(buf, "u8 u8 x[2] u64 u32 u32 u8 u8 u16 u16")
         * ```
         */
        SetBinding = 0x82,

        /**
         * Clears a specific binding stored on the device.
         *
         * ```
         * const [configurationNumber, bindingIndex] = jdunpack<[number, number]>(buf, "u8 u8")
         * ```
         */
        ClearBinding = 0x83,

        /**
         * Argument: configuration_number uint8_t. Clears a specific configuration stored on the device.
         *
         * ```
         * const [configurationNumber] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        ClearConfiguration = 0x84,

        /**
         * No args. Clears all configurations and bindings stored on the device.
         */
        Clear = 0x85,
    }


    /**
     * pipe_report Configuration
     * ```
     * const [configurationNumber, bindingIndex, deviceId, serviceClass, triggerValue, triggerContext, serviceIndex, selector, modifiers] = jdunpack<[number, number, number, number, number, number, number, number, number]>(buf, "u8 u8 x[2] u64 u32 u32 u8 u8 u16 u16")
     * ```
     */


    public enum HIDAdapterEvent {
        /**
         * Event that notifies clients that the server has swapped to a new configuration or changed key bindings.
         */
        Changed = 0x3,
    }

}
