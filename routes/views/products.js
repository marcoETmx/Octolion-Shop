const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product')
const { config } = require("../../config");

const productService = new ProductService();


router.get('/', async function (req, res, next) {
  cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
  try {
    const { tags } = req.query;
    const products = await productService.getProducts({ tags });

    res.render("products", { products, dev: config.dev });

  } catch (err) {
    next(err)
  }
})

module.exports = router;