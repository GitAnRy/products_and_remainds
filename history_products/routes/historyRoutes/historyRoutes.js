//создадим экземпляр класса роутер
const express = require(`express`);
const router = express.Router();

//импортируем обработчики маршрутов
const getHistoryProducts = require(`./getHistoryProducts`);

//добаляем необходимый функционал к роутеру
router.get(`/:page`, getHistoryProducts);

//экспортируем роутер
module.exports = router;