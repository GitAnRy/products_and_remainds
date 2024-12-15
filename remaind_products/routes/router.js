const express = require(`express`);
const router = express.Router();

const productRoutes = require(`./productRoutes/productRoutes`);
const remaindRoutes = require(`./remaindRoutes/remaindRoutes`);

router.use(`/products`, productRoutes);
router.use(`/remainds`, remaindRoutes);

module.exports = router;