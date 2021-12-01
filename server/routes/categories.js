const express = require('express');
const router = express.Router();
const Category = require('../models/category')

//get categories
router.get('/', (req, res, next)=>{

    Category.find()
    .then(categories=>{
        res.status(200).send({categories: categories});
    })
    .catch(error=>{
        res.status(500).send({error: 'Internal server error'});
    })

})


module.exports = router;