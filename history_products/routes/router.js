const express = require(`express`);
const router = express.Router();

const historyRoutes = require(`./historyRoutes/historyRoutes`);

router.use(`/history`, historyRoutes);

module.exports = router;