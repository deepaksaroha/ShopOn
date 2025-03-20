import express from 'express';
import { join } from 'path';
import { v4 as genuuid } from 'uuid';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import api from './server/api.js';
import { connect, getClient } from './server/db.js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Configure .env
dotenv.config();
const app = express();



//Set port as process.env.PORT if it is present otherwise set it to 4000
const port = process.env.PORT || 4000;

//Initiate connection with database
connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
    // host: 'localhost',
    // database: 'test2',

}).then(() => {
    //Handle /api with the api middleware
    console.log("DB connected");
    app.use('/api', session({
        genid() {
            return genuuid() // use UUIDs for session IDs
        },
        store: new MongoStore({ client: getClient() }),
        secret: process.env.SESSION_SECRET,
        // secret: 'Secret',
        resave: false,
        saveUninitialized: true,
    }),
    (req, res, next)=>{
        if(req.session.userId === undefined){
            if(req.session.cart === undefined){
                req.session.cart = []
            }
        }
        next();
    },
    api);

    //Handle non-api routes with static build folder
    app.use(express.static(join(__dirname, 'build')));

    //Return index.html for routes not handled by build folder
    app.get('*', function (req, res) {
        res.sendFile(join(__dirname, 'build', 'index.html'));
    });

    //Start listening on port
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    });
});