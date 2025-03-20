import express from 'express';
import jwt from 'jsonwebtoken';
import UserCredential from '../models/user-credential.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

export const SECRET = "d1a6221764e51eeb6fa0b8cd1bc6fd1b0b4a781bc3f3f1defadaee448742659a5801b7ed9e499264707d0060295d6531a558a8b41655873d05b086fc94c23fdf";

const getJWTToken = (data) => {
    return jwt.sign(data, SECRET);
}

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

        const token = getJWTToken(user.id);
        req.session.userId = user.id;

        async function f(){
            for(let i=0; i<cartArray.length; i++){
                const item = cartArray[i];
                await User.updateOne({ userId: req.session.userId, "cart.productId": {$ne: item.productId} }, { $push: { cart: item } })
                .then(()=>{})
                .catch(error=>{
                    console.log('cart not updated!');
                })
            }
            delete req.session.cart;
            res.status(200).send({token: token, message: 'Login successfull'});
        }

        f();
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

export default router;