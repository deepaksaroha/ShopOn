import { Router } from 'express';
import Razorpay from 'razorpay';
import { createHmac } from 'crypto';

import { authenticate } from '../middlewares/auth.js';
import Order from '../models/order.js';
import userModel from '../models/user.js';
import { config } from 'dotenv';
config();

const { find, findById, findByIdAndUpdate } = Order;

const currency = 'INR';
const router = Router();
const rzpKey = process.env.RZP_KEY_ID;
const secret = process.env.RZP_KEY_SECRET;

const rzpInstance = new Razorpay({
    key_id: rzpKey,
    key_secret: secret
});

//get orders
router.get('/', authenticate, (req, res, next)=>{

    find({ userId : req.session.userId, status: 'Completed'})
    .then((orders)=>{
        res.status(200).send({ orders: orders })
    })
    .catch(()=>{
        res.status(500).send({error: 'internal server error'})
    })
})

// get one order
router.get('/:orderId', authenticate, (req, res, next)=>{

    const id = req.params.orderId;
    findById(id)
    .then((order) => {
        res.status(200).send({orderData: order});
    })
    .catch(()=>{
        res.status(500).send({error: 'internal server error'});
    });
})

// create new order
router.post('/',  authenticate, (req, res, next)=>{

    userModel.findOne({ userId: req.session.userId }, {_id: 0, cart: 1})
    .then(usr=>{
        const items = usr.cart;
        let price = 0;
        items.forEach(element => {
            price += element.quantity*element.price;
        });

        if(price < 500){
            price += 50;
        }

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
router.put('/:id', authenticate, (req, res) => {
    const orderId = req.params.id;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    if (!razorpay_payment_id || !razorpay_signature) {
        res.status(400).send({ error: "Missing razorpay payment id or signature" });
        return;
    }
    const generated_signature = createHmac('sha256', secret).update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex');

    if (generated_signature === razorpay_signature) {
        const id = orderId;
        findByIdAndUpdate(id, { $set: { status: 'Completed' }})
        .then(() => {
            res.status(200).send("done");
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


export default router;