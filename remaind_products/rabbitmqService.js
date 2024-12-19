//подключаем брокер сообщений
const amqp = require(`./rabbitmq-config`)();

module.exports = {

    //экспортируем функцию отправки сообщений
    sendInQueue(body) {

        //преобразуем данные в JSON формат
        const data = JSON.stringify(body);

        amqp.then((channel) => {
            channel.assertQueue(`history_products`, {
                durable: false
            });
    
            //отправляем сообщение в очередь
            channel.sendToQueue(`history_products`, Buffer.from(data));
        })

    }
}