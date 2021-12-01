const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Order = require('../models/order')
const { v4: uuidv4 } = require('uuid');

//get orders
router.get('/', auth.authenticate, (req, res, next)=>{

    Order.find({ userId : req.session.userId})
    .then((orders)=>{
        res.status(200).send({ orders: orders })
    })
    .catch(()=>{
        res.status(500).send({error: 'internal server error'})
    })
})

//get one order
router.get('/:orderId', (req, res, next)=>{
    if(!auth.authenticate()){
        res.status(400).send({error: 'User not loggedin'})
    }

    Order.findOne({ orderId : req.params.orderId, userId: req.session.userId })
    .then((order)=>{
        res.status(200).send({ order: order })
    })
    .catch(()=>{
        res.status(500).send({error: 'internal server error'})
    })
})

//create new order
router.post('/', (req, res, next)=>{
    if(!auth.authenticate()){
        res.status(400).send({error: 'User not loggedin'})
    }

    const { products, total } = req.body;

    const orderId = uuidv4();

    const orderObject = new Order({ orderId: orderId, userId: req.session.userId, products: products, total: total, status: 'Active' });

    orderObject.save()
    .then((order)=>{
        res.status(200).send({orderId: order.orderId})
    })
    .catch(()=>{
        res.status(500).send({error: 'Internal server error'})
    })

})

//Cancel one order
router.patch('/', (req, res, next)=>{
    if(!auth.authenticate()){
        res.status(400).send({error: 'User not loggedin'})
    }

    const orderId = req.query.orderId;

    Order.updateOne({ orderId: orderId, userId: req.session.userId }, { $set: { status: "Cancelled" } })
    .then(()=>{
        res.status(200).send({message: 'Item Removed'})
    })
    .catch(()=>{
        res.status(500).send({error: 'Internal server error'})
    })

})



module.exports = router;