const amqp = require(`./rabbitmq-config`)();

module.exports = {

    sendInQueue(body) {

        const data = JSON.stringify(body);

        amqp.then((channel) => {
            channel.assertQueue(`history_products`, {
                durable: false
            });
    
            channel.sendToQueue(`history_products`, Buffer.from(data));
        })

    }
}