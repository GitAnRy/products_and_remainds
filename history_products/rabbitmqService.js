const amqp = require(`./rabbitmq-config`)();
const db = require(`./database`);

module.exports = {

    consumeFromQueue() {

        amqp.then((channel) => {

            channel.assertQueue(`history_products`, {
                durable: false
            });
    
            channel.consume(`history_products`, (data) => {
                const body = JSON.parse(data.content.toString());
                db.addProductsOperation(body);
            }, {
                noAck: true
            });
        })

        
    }
}