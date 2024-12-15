const express = require(`express`);
const router = express.Router();

const getHistoryProducts = require(`./getHistoryProducts`);

router.get(`/:page`, getHistoryProducts);

module.exports = router;