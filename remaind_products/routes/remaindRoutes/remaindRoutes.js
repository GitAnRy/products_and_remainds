const express = require(`express`);
const historyMiddleware = require(`../../middlewares/addHistoryOperationMiddleware`);
const router = express.Router();

const createRemaind = require(`./createRemaind`);
const addRemaind = require(`./addRemaind`);
const reduceRemaind = require(`./reduceRemaind`);
const getRemainds = require(`./getRemainds`);

router.post(`/`, historyMiddleware.createRemaind, createRemaind);
router.put(`/add`, historyMiddleware.addRemaindQuantity, addRemaind);
router.put(`/reduce`, historyMiddleware.reduceRemaindQuantity, reduceRemaind);
router.get(`/`, getRemainds);

module.exports = router;