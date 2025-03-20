import jwt from 'jsonwebtoken';

import { SECRET } from '../routes/sessions.js';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        res.status(401).send({error:'Not Logged In'});
    }
    try{
        const userId = jwt.verify(token, SECRET);
    }catch{
        res.status(401).send({error:'Not Logged In'});
    }
    if (!req.session.userId) {
        res.status(401).send({error:'Not Logged In'});
        return;
    }

    next();
};

const obd = {
    authenticate
};
export default obd