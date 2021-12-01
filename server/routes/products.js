const express = require('express');
const router = express.Router();
const Product = require('../models/product')

//get products
router.get('/', (req, res, next)=>{
    let searchObject = {};

    console.log(req.query.searchWord)

    const reg = new RegExp(req.query.searchWord);
    console.log(reg);
    
    if(req.query.searchWord) { searchObject.name = {$regex: new RegExp(req.query.searchWord), $options: 'i'} }
    if(req.query.category) { searchObject.category = req.query.category }
    if(req.query.priceFrom && req.query.priceTo) { searchObject.price = { $gte: req.query.priceFrom, $lte: req.query.priceTo } }
    if(req.query.color) { searchObject['specification.color'] = req.query.color }

    console.log(searchObject);

    Product.find(searchObject)
    .then(products=>{
        res.status(200).send({products: products});
    })
    .catch(error=>{
        res.status(500).send({error: 'Internal server error'});
    })

})

//get one product
router.get('/:productId', (req, res, next)=>{
    
    Product.findOne({productId: req.params.productId})
    .then(productData=>{
        res.status(200).send({productData: productData});
    })
    .catch(error=>{
        res.status(500).send({error: 'Internal server error'});
    })
})

module.exports = router;