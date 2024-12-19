//создадим экземпляр класса роутер
const express = require(`express`);
const router = express.Router();

/*импортируем функции промежуточной обработки
для фиксации неиобходимых событий с товарами
в сервисе истории товаров*/
const historyMiddleware = require(`../../middlewares/addHistoryOperationMiddleware`);

//импортируем обработчики маршрутов
const createProduct = require(`./createProduct`);
const getProduct = require(`./getProduct`);

//добаляем необходимый функционал к роутеру
router.post(`/`, historyMiddleware.createProduct, createProduct);
router.get(`/`, getProduct);

//экспортируем роутер
module.exports = router;