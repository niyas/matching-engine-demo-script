const kafka = require('kafka-node');
const config = require('config');
const Consumer = kafka.Consumer;
let client = new kafka.KafkaClient({kafkaHost: config.get("kafka.uri")});
let consumer = new Consumer(
    client,
    [
        { topic: 'engine.orders.btc.usd', partition: 0 }
    ],
    {
        autoCommit: true,
        encoding: 'utf8'
    }
);

consumer.on('message', function (message) {
    console.log(message);
});