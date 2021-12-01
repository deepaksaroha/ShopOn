const express = require('express');
const router = express.Router();

const users = require('./routes/users');
const sessions = require('./routes/sessions');
const products = require('./routes/products');
const categories = require('./routes/categories')

// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/users', users);

router.use('/sessions', sessions);

router.use('/products', products);

router.use('/categories', categories);

module.exports = router;