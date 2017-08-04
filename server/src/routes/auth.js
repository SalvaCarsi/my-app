import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { MONGO_URL, BCRYPT_ROUNDS } from '../config.js';
import User from '../models/User.model';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, { useMongoClient: true });

const router = express.Router();

const dealWithError = (error, res, messageId) => {
    console.log(`error: ${error}`);
    res.json({
        messageId,
        error: error,
    });
}

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, BCRYPT_ROUNDS).then((encryptedPassword) => {
        new User({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
        }).save().then(() => {
            console.log(`user with email ${req.body.email} has been registered`);
            res.json({
                messageId: 'auth.register.success',
                email: req.body.email,
            });
        }).catch( error => dealWithError(error, res, 'auth.register.error'));
    }).catch( error => dealWithError(error, res, 'auth.register.error'));
});

export default router;
