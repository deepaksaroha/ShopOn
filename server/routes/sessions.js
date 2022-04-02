const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const UserCredential = require('../models/user-credential');
const User = require('../models/user')


//user login status
router.get('/', (req, res)=>{
    if(req.session.userId === undefined){
        res.status(200).send({loginStatus: false});
        return;
    }
    res.status(200).send({loginStatus: true});
    return;
});

//user login
router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send({error: "Email and Password not present in request"});
        return;
    }

    const { email, password } = req.body;

    if (!email) {
        res.status(400).send({error: "Email not present in request"});
        return;
    }

    if (!password) {
        res.status(400).send({error: "Password not present in request"});
        return;
    }

    const cartArray = req.session.cart;
        

    UserCredential.findOne({ email: email })
    .then(user => {
        if (!user) {
            res.status(400).send({error: "User not signed up"});
            return;
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            res.status(400).send({error: "Incorrect email or password"});
            return;
        }

        req.session.userId = user.id;

        cartArray.forEach(item => {
            
            User.updateOne({ userId: req.session.userId, "cart.productId": {$ne: item.productId} }, { $push: { cart: item } })
            .then(()=>{})
            .catch(error=>{
                throw new Error();
            })
        });
        return;
        // return User.updateOne({ userId: req.session.userId }, { $addToSet: { cart: { $each: cartArray } } })
        // res.status(204).send();
    })
    .then(()=>{
        delete req.session.cart;
        res.status(200).send({message: 'Login successfull'});
        return;
    })
    .catch(() => {
        if(req.session.userId){
            delete req.session.userId;
        }
        res.status(500).send({ error: "Internal Server Error" });
    });
    return;
});


//user logout
router.delete('/', (req, res) => {
    delete req.session.userId;
    res.status(204).send();
    return;
});

module.exports = router;