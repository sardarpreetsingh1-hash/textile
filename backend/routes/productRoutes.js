const express = require('express');
const router = express.Router();
const { getProducts, getProductByIdentifier, createProduct } = require('../controllers/productController');

router.route('/').get(getProducts).post(createProduct);
router.route('/:identifier').get(getProductByIdentifier);

module.exports = router;
