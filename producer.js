const kafka = require('kafka-node');
const config = require('config');

const buyOrders = [
    {
     "id": "order-01", 
     "side": 1,            
     "type": 1,         
     "event_type": 1,
     "base": "btc",
     "quote": "usd",
     "price": "5600",
     "amount": "5.67"
    },
    {
     "id": "order-02", 
     "side": 1,            
     "type": 1,         
     "event_type": 1,
     "base": "btc",
     "quote": "usd",
     "price": "5610",
     "amount": "7"
    },
    {
     "id": "order-03", 
     "side": 1,            
     "type": 1,         
     "event_type": 1,
     "base": "btc",
     "quote": "usd",
     "price": "5550",
     "amount": "4"
    }
];

const sellOrders = [
    {
     "id": "order-04", 
     "side": 2,            
     "type": 1,         
     "event_type": 1,
     "base": "btc",
     "quote": "usd",
     "price": "5600",
     "amount": "5.67"
    },
    {
     "id": "order-05", 
     "side": 2,            
     "type": 1,         
     "event_type": 1,
     "base": "btc",
     "quote": "usd",
     "price": "5580",
     "amount": "1"
    },
    {
     "id": "order-06", 
     "side": 2,            
     "type": 1,         
     "event_type": 1,
     "base": "btc",
     "quote": "usd",
     "price": "5610",
     "amount": "3"
    }
];


let Producer = kafka.Producer,
    client = new kafka.KafkaClient({kafkaHost: config.get("kafka.uri")})
    producer = new Producer(client),
    payloads = [
        { topic: 'engine.orders.btc.usd', messages: buyOrders, partition: 0 },
        { topic: 'engine.orders.btc.usd', messages: sellOrders, partition: 0 },
    ];

producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});
 
producer.on('error', function (err) {
    console.log(err);
});