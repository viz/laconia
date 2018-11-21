const laconia = require("@laconia/core");
const event = require("@laconia/event");
const AWS = require("aws-sdk");
const SnsRestaurantNotificationTopic = require("./SnsRestaurantNotificationTopic");

const instances = ({ $sns, env }) => ({
  restaurantNotificationTopic: new SnsRestaurantNotificationTopic(
    new AWS.SNS(),
    env.RESTAURANT_NOTIFICATION_TOPIC_ARN
  )
});

const handler = async (orders, { restaurantNotificationTopic }) => {
  return Promise.all(orders.map(o => restaurantNotificationTopic.publish(o)));
};

module.exports.handler = laconia(handler).register([
  event.kinesisJson(),
  instances
]);