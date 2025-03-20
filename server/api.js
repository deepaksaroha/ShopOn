import { Router, json, urlencoded } from 'express';
import users from './routes/users.js';
import sessions from './routes/sessions.js';
import products from './routes/products.js';
import categories from './routes/categories.js';
import orders from './routes/orders.js';
const router = Router();


// Add json and urlencoded middleware
router.use(json());
router.use(urlencoded({ extended: true }));

router.use('/users', users);

router.use('/sessions', sessions);

router.use('/products', products);

router.use('/categories', categories);

router.use('/orders', orders);

export default router;