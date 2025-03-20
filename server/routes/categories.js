import { Router } from 'express';
import Cat from '../models/category.js';
const router = Router();

//get categories
router.get('/', (req, res, next)=>{

    Cat.find()
    .then(categories=>{
        res.status(200).send({categories: categories});
    })
    .catch(error=>{
        res.status(500).send({error: 'Internal server error'});
    })

})


export default router;