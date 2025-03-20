import { Router } from 'express';
import userModel from '../models/user.js';
const router = Router();

//get cart
router.get('/', (req, res, next)=>{
    if(req.session.userId === undefined){
        res.status(200).send({cart : req.session.cart});
    }else{
        userModel.findOne({ userId: req.session.userId }, { cart: 1 })
        .then(cart=>{
            res.status(200).send({cart: cart.cart});
        })
        .catch(()=>{
            res.status(500).send({error: 'internal server error'});
        })
    }
    return;
})

//put product in cart
router.put('/', (req, res, next)=>{
    const { productId, name, quantity, price } = req.body;

    if(req.session.userId === undefined){
        req.session.cart.push({ productId, name, quantity: parseInt(quantity), price });
        res.status(200).send({message: 'Item added to cart'});
        return;
    }

    userModel.updateOne({ userId: req.session.userId }, { $push: { cart: { productId: productId, name: name, quantity: quantity, price: price } } })
    .then(()=>{
        res.status(200).send({message: 'Item Added'})
    })
    .catch(()=>{
        res.status(500).send({error: 'internal server error'})
    })
    return;
})

//update quantity of a product
router.patch('/', (req, res, next)=>{
    const { productId, incValue } = req.body;

    if(incValue === undefined){
        if(req.session.userId === undefined){
            req.session.cart = req.session.cart.filter(ele=>ele.productId !== productId)
            res.status(200).send({message: 'Item removed from cart'});
        }else{
            userModel.updateOne({ userId: req.session.userId }, { $pull: { cart: { productId: productId } } })
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
                            cart[index].quantity = item.quantity+incValue;
                        }
                    }else{
                        cart[index].quantity = item.quantity+incValue;
                    }
                    res.status(200).send({message: 'Quantity Incremented/Decremented'});
                    return;
                }
            }
            res.status(200).send({message: 'Quantity Incremented/Decremented'});
            return;
        }else{
            let query = { userId: req.session.userId, cart: { $elemMatch: { "productId": productId } } };
            if( incValue<0 ){
                query["cart"]["$elemMatch"]["quantity"] = {$gt: 1} 
            }
    
            userModel.updateOne(query, {$inc: { "cart.$.quantity" : incValue}} )
            .then((user)=>{
                res.status(200).send({message: 'Quantity Incremented/Decremented'})
            })
            .catch(()=>{
                res.status(500).send({error: 'Internal server error'})
            })
        }
    }
    return;
})

//delete cart
router.delete('/', (req, res)=>{

    if(req.session.userId === undefined){
        res.status(200).send({message: 'Insufficient permissions'});
        return;
    }

    userModel.updateOne({ userId: req.session.userId }, { $set: { cart: [] } })
    .then(()=>{
        res.status(204).send();
    })
    .catch(()=>{
        res.status(500).send({error: 'internal server error'})
    })
    return;
})

export default router;