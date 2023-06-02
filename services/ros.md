# ROS

    identifier: 0x1524f42c
    tags: robotics
    
A ROS (Robot Operating System https://www.ros.org/) controller that can act as a broker for messages.

## Commands

    command advertise_node @ 0x80 {
        name: string0
        namespace: string
    }

Assigns a node namespace and name to the current service. Any client of the service should periodically advertise itself.

    command publish_message @ 0x81 {
        topic: string0,
        message: string
    }

Publishes a JSON-encoded message to the given topic.

    command subscribe_message @ 0x82 {
        topic: string0
    }

Subscribes to a message topic. Subscribed topics will be published on the Jacdac bus as reports

    report message @ 0x82 {
        topic: string0
        message: string
    }

A message published on the bus. Message is JSON encoded.