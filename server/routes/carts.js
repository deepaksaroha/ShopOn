const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user')


//get cart
router.get('/', (req, res, next)=>{
    if(req.session.userId === undefined){
        res.status(200).send({cart : req.session.cart});
    }else{
        User.findOne({ userId: req.session.userId }, { cart: 1 })
        .then(cart=>{
            res.status(200).send({cart: cart.cart})
        })
        .catch(()=>{
            res.status(500).send({error: 'internal server error'})
        })
    }
})

//put product in cart
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

    const { productId, incValue } = req.body;

    if(incValue === undefined){
        if(req.session.userId === undefined){
            req.session.cart = req.session.cart.filter(ele=>ele.productId !== productId)
            res.status(200).send({message: 'Item removed from cart'});
        }else{
            User.updateOne({ userId: req.session.userId }, { $pull: { cart: { productId: productId } } })
            .then(()=>{
                res.status(200).send({message: 'Item Removed'})
            })
            .catch(()=>{
                res.status(500).send({error: 'Internal server error'})
            })
        }
    
        
    }else{
        if(req.session.userId === undefined){
            const cart = req.session.cart;
            for(let index in cart){
                let item = cart[index];
                if(item.productId === productId){
                    if(incValue < 0){
                        if(item.quantity > 1){
                            item.quantity = item.quantity+incValue;
                        }
                    }else{
                        item.quantity = item.quantity+incValue;
                    }
                    res.status(200).send({message: 'Quantity Incremented/Decremented'});
                    return;
                }
            }
            res.status(200).send({message: 'Quantity Incremented/Decremented'});
            return;
        }else{
            let query = { userId: req.session.userId, 'cart.productId': productId };
            if(incValue < 0){
                query['cart.quantity'] = {$gt:1};
            }
    
            User.updateOne(query , { $inc: { 'cart.$.quantity': incValue } })
            .then(()=>{
                res.status(200).send({message: 'Quantity Incremented/Decremented'})
            })
            .catch(()=>{
                res.status(500).send({error: 'Internal server error'})
            })
        }
    }
})

module.exports = router;