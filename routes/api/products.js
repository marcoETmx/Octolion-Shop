const express = require('express');
const router = express.Router();
const productMok = require('../../utils/mocks/products')

router.get('/', function (req, res) {
    const { query } = req.query;

    res.status(200).json({
        data: productMok,
        message: 'products listed'
    })
})

router.get('/:productId', function (req, res) {
    const { productId } = req.params;
    res.status(200).json({
        data: productMok[0],
        message: 'product retrived'
    })
})

router.post('/', function (req, res) {
    res.status(201).json({
        data: productMok[0],
        message: 'product created'
    })
})

router.put('/:productId', function (req, res) {
    res.status(200).json({
        data: productMok,
        message: 'products updated'
    })
})

router.delete('/', function (req, res) {
    res.status(200).json({
        data: productMok[0],
        message: 'products deleted'
    })
})
module.exports = router;