const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credential');
const User = require('../models/user');
const cart = require('./carts');
const orders = require('./orders')

//cart apis
router.use('/cart', cart);
//order apis
router.use('/me/orders', orders);

//user signup
router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send({error: "Email and Password not present in request"});
        return;
    }

    const { firstName, lastName, email, password, phone, age, gender } = req.body;

    if (!email) {
        res.status(400).send({error: "Email not present in request"});
        return;
    }

    if (!password) {
        res.status(400).send({error: "Password not present in request"});
        return;
    }

    UserCredential.findOne({ email }).then(user => {
        if (user) {
            res.status(400).send({error: "User already signed up"});
            return;
        }

        const hash = bcrypt.hashSync(password);

        const userCredential = new UserCredential({ email, password: hash });

        userCredential.save()
        .then(() => {
            let userObject = { userId: userCredential.id, email };

            if(firstName !== undefined) userObject.firstName = firstName;
            if(lastName !== undefined) userObject.lastName = lastName;
            if(phone !== undefined) userObject.phone = phone;
            if(age !== undefined) userObject.age = age;
            if(gender !== undefined) userObject.gender = gender;

            const user = new User(userObject);

            user.save()
            .then(() => {
                res.status(201).send({ id: userCredential.id });
            })
            .catch(error=>{
                res.status(500).send({ error: "Internal Server Error" });
            });
        })
        .catch(error=>{
            res.status(500).send({ error: "Internal Server Error" });
        });;
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});


//get user profile
router.get('/me', auth.authenticate, (req, res) => {
    User.findOne({ userId: req.session.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

//update user data
router.put('/me', auth.authenticate, (req, res) => {
    const { firstName, lastName, phone, age, gender } = req.body;

    const updateQuery = {};
    (firstName !== undefined) && (updateQuery.firstName = firstName);
    (lastName !== undefined) && (updateQuery.lastName = lastName);
    if(phone !== undefined) updateQuery.phone = phone;
    if(age !== undefined) updateQuery.age = age;
    if(gender !== undefined) updateQuery.gender = gender;

    
    User.updateOne({ _id: req.session.userId }, updateQuery).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

module.exports = router;