# ROS

    identifier: 0x1524f42c
    tags: robotics
    camel: ros
    
A ROS (Robot Operating System https://www.ros.org/) controller that can act as a broker for messages.

## Commands

    command publish_message @ 0x81 {
        node: string0
        topic: string0
        message: string
    }

Publishes a JSON-encoded message to the given topic.

    command subscribe_message @ 0x82 {
        node: string0
        topic: string
    }

Subscribes to a message topic. Subscribed topics will emit message reports.

    report message @ 0x83 {
        node: string0
        topic: string0
        message: string
    }

A message published on the bus. Message is JSON encoded.