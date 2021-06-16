# HID Adapter Configurator

    identifier: 0x1e5758b5
    
A service for configuring how Jacdac device map to HID input events. Users can have multiple configurations and swap between them using the `swapTo` or `next` commands.

## Registers

    rw num_configurations: u8 @ 0x80
    
The number of configurations stored on the server.

    rw current_configuration: u8 @ 0x81

The current configuration the server is using.

## Commands

    command get_configuration @ 0x80 {
        results: pipe
        configuration_number: u8
    }
    pipe report configuration {
        configuration_number: u8
        binding_index: u8
        device_id: u8[8]
        service_class: u32
        service_idx: u8
        trigger_context:u8
        trigger_value: u32
        selector: u16
        modifiers:u16
    }
    
Retrieves a configuration stored on the server. If the configuration does not exist, an empty report will be returned

    command set_configuration @ 0x80 {
        bindings: pipe
        configuration_number: u8
    }
    pipe report configuration {
        configuration_number: u8
        binding_index: u8
        device_id: u8[8]
        service_class: u32
        service_idx: u8
        trigger_context:u8
        trigger_value: u32
        selector: u16
        modifiers:u16
    }
    
Retrieves a configuration stored on the server. If the configuration does not exist, an empty report will be returned

    command set_binding @ 0x81 {
        configuration_number: u8
        binding_index: u8
        device_id: u8[8]
        service_class: u32
        service_idx: u8
        trigger_context:u8
        trigger_value: u32
        selector: u16
        modifiers:u16
    }
Stores the given configuration on the server. If a configuration exists at this index, the new configuration will replace it.

    command clear_binding @ 0x82 {
        configuration_number: u8
        binding_index: u8
    }
Clears a specific binding stored on the device.

    command clear_configuration @ 0x83 {
        configuration_number: u8
    }
Clears a specific binding stored on the device.

    command clear @ 0x82 {
    }
Clears all configurations and bindings stored on the device.

## Events

    event changed @ change { }
    
Event that notifies clients that the server has swapped to a new configuration or changed key bindings.
