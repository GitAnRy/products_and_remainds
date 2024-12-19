//создадим экземпляр класса роутер
const express = require(`express`);
const router = express.Router();

//импортируем обработчики маршрутов
const productRoutes = require(`./productRoutes/productRoutes`);
const remaindRoutes = require(`./remaindRoutes/remaindRoutes`);

//добаляем необходимый функционал к роутеру
router.use(`/products`, productRoutes);
router.use(`/remainds`, remaindRoutes);

//экспортируем роутер
module.exports = router;