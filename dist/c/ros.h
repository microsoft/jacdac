// Autogenerated C header file for ROS
#ifndef _JACDAC_SPEC_ROS_H
#define _JACDAC_SPEC_ROS_H 1

#define JD_SERVICE_CLASS_ROS  0x1524f42c

/**
 * Assigns a node namespace and name to the current service. Any client of the service should periodically advertise itself.
 */
#define JD_ROS_CMD_ADVERTISE_NODE 0x80
typedef struct jd_ros_advertise_node {
    char name[0];  // string0
    // char namespace[0];  // string
} jd_ros_advertise_node_t;


/**
 * Publishes a JSON-encoded message to the given topic.
 */
#define JD_ROS_CMD_PUBLISH_MESSAGE 0x81
typedef struct jd_ros_publish_message {
    char topic[0];  // string0
    // char message[0];  // string
} jd_ros_publish_message_t;


/**
 * Argument: topic string0 (bytes). Subscribes to a message topic. Subscribed topics will emit message reports.
 */
#define JD_ROS_CMD_SUBSCRIBE_MESSAGE 0x82

/**
 * A message published on the bus. Message is JSON encoded.
 */
#define JD_ROS_CMD_MESSAGE 0x83
typedef struct jd_ros_message_report {
    char topic[0];  // string0
    // char message[0];  // string
} jd_ros_message_report_t;


#endif
