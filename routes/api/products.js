const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product')

const productService = new ProductService();

router.get('/', async function (req, res, next) {
    const { tags } = req.query;

    try {
        const products = await productService.getProducts({ tags });

        res.status(200).json({
            data: products,
            message: 'products listed'
        })
    } catch (e) {
        next(e);
    }

})

router.get('/:productId', async function (req, res, next) {
    const { productId } = req.params;

    try {
        const product = await productService.getProduct({ productId });

        res.status(200).json({
            data: product,
            message: 'product retrived'
        })
    } catch (e) {
        next(e);
    }
})

router.post('/', async function (req, res, next) {
    const { body: product } = req;

    try {
        const productResponse = await productService.createProduct({ product });

        res.status(201).json({
            data: productResponse,
            message: 'product created'
        })
    } catch (e) {
        next(e);
    }
})

router.put('/:productId', async function (req, res, next) {
    const { productId } = req.params;
    const { body: product } = req;

    try {
        const productResponse = await productService.updateProduct({ productId, product });

        res.status(200).json({
            data: productResponse,
            message: 'products updated'
        })
    } catch (e) {
        next(e);
    }

})

router.delete('/:productId', async function (req, res, next) {
    const { productId } = req.params;

    try {
        const product = await productService.deleteProduct({ productId });

        res.status(200).json({
            data: product,
            message: 'products deleted'
        })
    } catch (e) {
        next(e);
    }

})
module.exports = router;