const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user')


//get cart
router.get('/', (req, res, next)=>{
    if(req.session.userId === undefined){
        res.status(200).send({cart : req.session.cart});
        return;
    }

    User.findOne({ userId: req.session.userId }, { cart: 1 })
    .then(cart=>{
        res.status(200).send({cart: cart})
    })
    .catch(()=>{
        res.status(500).send({error: 'internal server error'})
    })
})

//put cart
router.put('/', (req, res, next)=>{

    const { productId, name, quantity, price } = req.body;


    if(req.session.userId === undefined){
        req.session.cart.push({ productId, name, quantity, price });
        res.status(200).send({message: 'Item added to cart'});
        return;
    }

    User.updateOne({ userId: req.session.userId }, { $push: { cart: { productId: productId, name: name, quantity: quantity, price: price } } })
    .then(()=>{
        res.status(200).send({message: 'Item Added'})
    })
    .catch(()=>{
        res.status(500).send({error: 'internal server error'})
    })
})

//update quantity of a product
router.patch('/', (req, res, next)=>{
    if(!auth.authenticate()){
        res.status(400).send({error: 'User not loggedin'})
    }

    const { productId, incValue } = req.body;

    User.updateOne({ userId: req.session.userId, 'cart.productId': productId } , { $inc: { 'cart.$.quantity': incValue } })
    .then(()=>{
        res.status(200).send({message: 'Quantity Incremented/Decremented'})
    })
    .catch(()=>{
        res.status(500).send({error: 'Internal server error'})
    })

})

//delete product from cart
router.delete('/', (req, res, next)=>{
    if(!auth.authenticate()){
        res.status(400).send({error: 'User not loggedin'})
    }

    const productId = req.query.productId;

    User.updateOne({ userId: req.session.userId }, { $pull: { cart: { productId: productId } } })
    .then(()=>{
        res.status(200).send({message: 'Item Removed'})
    })
    .catch(()=>{
        res.status(500).send({error: 'Internal server error'})
    })

})

module.exports = router;