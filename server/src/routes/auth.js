import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { MONGO_URL, BCRYPT_ROUNDS } from '../config.js';
import User from '../models/User.model';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, { useMongoClient: true });

const router = express.Router();

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, BCRYPT_ROUNDS).then((encryptedPassword) => {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
        });
        newUser.save().then((doc) => {
                console.log(doc);
                console.log('here we are!');
                res.send({
                    messageId: 'auth.register.success',
                    email: req.body.email,
                });
            }).catch((error) => {
                console.log(`error: ${error}`);
                res.send({
                    messageId: 'auth.register.error',
                    error: error,
                });
            })
    }).catch((error) => {
        console.log(`error: ${error}`);
        res.send(error);
    });
});

export default router;
