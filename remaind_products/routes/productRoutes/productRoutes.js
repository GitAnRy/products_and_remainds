const express = require(`express`);
const historyMiddleware = require(`../../middlewares/addHistoryOperationMiddleware`);
const router = express.Router();

const createProduct = require(`./createProduct`);
const getProduct = require(`./getProduct`);

router.post(`/`, historyMiddleware.createProduct, createProduct);
router.get(`/`, getProduct);

module.exports = router;