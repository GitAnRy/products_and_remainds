//создадим экземпляр класса роутер
const express = require(`express`);
const router = express.Router();

/*импортируем функции промежуточной обработки
для фиксации неиобходимых событий с товарами
в сервисе истории товаров*/
const historyMiddleware = require(`../../middlewares/addHistoryOperationMiddleware`);

//импортируем обработчики маршрутов
const createRemaind = require(`./createRemaind`);
const addRemaind = require(`./addRemaind`);
const reduceRemaind = require(`./reduceRemaind`);
const getRemainds = require(`./getRemainds`);

//добаляем необходимый функционал к роутеру
router.post(`/`, historyMiddleware.createRemaind, createRemaind);
router.put(`/add`, historyMiddleware.addRemaindQuantity, addRemaind);
router.put(`/reduce`, historyMiddleware.reduceRemaindQuantity, reduceRemaind);
router.get(`/`, getRemainds);

//экспортируем роутер
module.exports = router;