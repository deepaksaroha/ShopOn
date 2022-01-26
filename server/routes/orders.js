const express = require('express');
const Razorpay = require('razorpay')
const crypto = require('crypto')

const auth = require('../middlewares/auth');
const Order = require('../models/order');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const currency = 'INR';
const router = express.Router();
const rzpKey = process.env.RZP_KEY_ID;
const secret = process.env.RZP_KEY_SECRET;

const rzpInstance = new Razorpay({
    key_id: rzpKey,
    key_secret: secret
});

//get orders
// router.get('/', auth.authenticate, (req, res, next)=>{

//     Order.find({ userId : req.session.userId})
//     .then((orders)=>{
//         res.status(200).send({ orders: orders })
//     })
//     .catch(()=>{
//         res.status(500).send({error: 'internal server error'})
//     })
// })

//get one order
// router.get('/:orderId', (req, res, next)=>{
//     if(!auth.authenticate()){
//         res.status(400).send({error: 'User not loggedin'})
//     }

//     Order.findOne({ orderId : req.params.orderId, userId: req.session.userId })
//     .then((order)=>{
//         res.status(200).send({ order: order })
//     })
//     .catch(()=>{
//         res.status(500).send({error: 'internal server error'})
//     })
// })

//create new order
router.post('/',  auth.authenticate, (req, res, next)=>{

    User.findOne({ userId: req.session.userId }, {_id: 0, cart: 1})
    .then(usr=>{
        const items = usr.cart;
        let price = 0;
        items.forEach(element => {
            price += element.quantity*element.price;
        });

        const amount = price*100;


        const order = new Order({
            userId: req.session.userId,
            products: items,
            total: amount,
            status: 'Active',
        })
        
        order.save()
        .then(()=>{
            const orderId = order.id;
            const options = {
                amount,
                currency,
                receipt: orderId
            }

            rzpInstance.orders.create(options, (err, rzpOrder)=>{
                if(err){
                    console.log(err);
                    res.status(500).send({ error: 'Error in creating razorpay order' })
                    return;
                }


                res.status(201).send({
                    amount,
                    currency,
                    orderId,
                    //This is required by client to co-ordinate with razorpay
                    rzpOrderId: rzpOrder.id
                });
            });
        })
        .catch(err=>{
            res.status(500).send({error: 'Error in creating order'});
        })
    })
    .catch(err=>{
        res.status(500).send({error: 'Error in getting cart'});
    })
})

//put razorpay order
router.put('/:id', auth.authenticate, (req, res) => {
    const orderId = req.params.id;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    if (!razorpay_payment_id || !razorpay_signature) {
        res.status(400).error({ error: "Missing razorpay payment id or signature" });
        return;
    }
    const generated_signature = crypto.createHmac('sha256', secret).update(orderId + "|" + razorpay_payment_id).digest('hex');
    if (generated_signature === razorpay_signature) {
        Order.updateOne({ id: orderId }, { $set: { status: 'Completed', razorpay_payment_id, razorpay_order_id, razorpay_signature }})
        .then(() => {
            res.send(204).send();
        })
        .catch(()=>{
            res.status(500).send({error: 'internal server error'});
        });
    } else {
        res.status(400).send({ error: 'Signature validation failed' });
        return;
    }
});

//Cancel one order
// router.patch('/', (req, res, next)=>{
//     if(!auth.authenticate()){
//         res.status(400).send({error: 'User not loggedin'})
//     }

//     const orderId = req.query.orderId;

//     Order.updateOne({ orderId: orderId, userId: req.session.userId }, { $set: { status: "Cancelled" } })
//     .then(()=>{
//         res.status(200).send({message: 'Item Removed'})
//     })
//     .catch(()=>{
//         res.status(500).send({error: 'Internal server error'})
//     })

// })



module.exports = router;