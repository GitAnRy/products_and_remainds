//создадим экземпляр класса роутер
const express = require(`express`);
const router = express.Router();

//импортируем обработчики маршрутов
const historyRoutes = require(`./historyRoutes/historyRoutes`);

//добаляем необходимый функционал к роутеру
router.use(`/history`, historyRoutes);

//экспортируем роутер
module.exports = router;