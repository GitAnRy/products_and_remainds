require(`dotenv`).config();

//экспортируем и инциализируем экспресс
const express = require(`express`);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//импорт портов и маршрутизатора
const PORT = process.env.PORT || 3001;
const router = require(`./routes/router`);

//инициализируем и подключаем брокер сообщений
require(`./rabbitmqService`).consumeFromQueue();

app.use(`/`, function(req, res, next) {
    console.log(`Url - `, req.originalUrl);
    next();
});

//назначаем обработчик маршрутов
app.use(`/`, router);

//запускаем сервер
app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`);
});