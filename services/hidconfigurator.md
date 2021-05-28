# HID Configurator

    identifier: 0x1e5758b5
    
A service for configuring how Jacdac device map to HID input events. Users can have multiple configurations and swap between them using the `swapTo` or `next` commands.

## Registers

    rw num_configurations: u16 @ 0x80
 
The number of configurations stored on this device.

## Commands

    command retrieve_configuration @ 0x80 {
        configuration_number: u16
    }
    report {
        configuration_number: u16
    repeats:
        device_id: u8[8]
        service_class: u32
        service_idx: u8
        trigger_context:u8
        trigger_value: u32
        selector: u16
        modifiers:u16
    }
    
Retrieves a configuration stored on the server. If the configuration does not exist, an empty report will be returned

    command store_configuration @0x81 {
    configuration_number: u16
    repeats:
        device_id: u8[8]
        service_class: u32
        service_idx: u8
        trigger_context:u8
        trigger_value: u32
        selector: u16
        modifiers:u16
    }
Stores the given configuration on the server. If a configuration exists at this index, the new configuration will replace it.

    command swap_to_configuration @0x82 {
        configuration_number: u16
    }
    
    command next_configuration @0x83 {
        configuration_number: u16
    }


