import express from 'express';
import mongodb from 'mongodb';
import bcrypt from 'bcrypt';
import { MONGO_URL, BCRYPT_ROUNDS } from '../config.js';

const router = express.Router();
const MongoClient = mongodb.MongoClient;

router.post('/register', (req, res) => {
    MongoClient.connect(MONGO_URL).then((db) => {
        const users = db.collection('users');
        users.findOne({ email: req.body.email }).then((doc) => {
            if (doc !== null) {
                db.close();
                res.send({ message: 'auth.register.error.user.exist' });
            }
            else {
                bcrypt.hash(req.body.email, BCRYPT_ROUNDS).then((hash) => {
                    users.insertOne({ email: req.body.email, password: hash });
                    db.close()
                    res.send({
                        message: 'auth.register.success',
                        email: req.body.email,
                    });
                });
            }
        });
    }).catch((error) => console.log(error));
});

export default router;
