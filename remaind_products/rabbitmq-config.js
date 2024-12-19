//реализуем логику подключения к брокеру сообщений

const amqp = require(`amqplib/callback_api`);

module.exports = () => { return new Promise((resolve, reject) => {

    amqp.connect(`amqp://localhost`, function(err, connection) {
        if (err) {
            console.log(err);
            reject(err);
        }

        connection.createChannel(function(err1, channel) {

            if (err1) {
                console.log(err1);
            reject(err1);
            }

            resolve(channel);

        });

    });
})};


