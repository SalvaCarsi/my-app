import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { MONGO_URL, BCRYPT_ROUNDS } from '../config.js';
import User from '../models/User.model';
import logInfo from '../utils/logger';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, { useMongoClient: true });

const router = express.Router();

const dealWithError = (error, res, messageId) => {
    logInfo(`error: ${error}`);
    res.json({
        messageId,
        error: error.toString(),
    });
}

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, BCRYPT_ROUNDS).then((encryptedPassword) => {
        new User({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
        }).save().then(() => {
            logInfo(`user with email ${req.body.email} has been registered`);
            res.json({
                messageId: 'auth.register.success',
                email: req.body.email,
            });
        }).catch( error => dealWithError(error, res, 'auth.register.error'));
    }).catch( error => dealWithError(error, res, 'auth.register.error'));
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }).then( user => {
        console.log(`user ${user}`);
        if (!user) res.status(401).end();
        
        bcrypt.compare(req.body.password, user.password).then( passwordMatches => {
            if (passwordMatches) res.json('logged in!');
            else res.status(401).end();
        }).catch( error => dealWithError(error, res, 'auth.login2.error'));
    }).catch( error => dealWithError(error, res, 'auth.login1.error'));
});

export default router;
