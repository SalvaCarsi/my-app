import express from 'express';
import mongodb from 'mongodb';
import { mongo_url } from '../config.js';

const router = express.Router();
const MongoClient = mongodb.MongoClient;

router.post('/register', (req, res) => {
    MongoClient.connect(mongo_url, (err, db) => {
        const users = db.collection('users');
        users.findOne({ email: req.body.email }, (err, doc) => {
            res.setHeader('Content-Type', 'application/json');
            if (doc === null) {
                users.insertOne({ email: req.body.email, password: req.body.password });
                res.send({
                    message: 'auth.register.success',
                    email: req.body.email,
                });
            } else {
                res.send({ message: 'auth.register.error.user.exist' });
            }
            db.close();
        });
    });
});

export default router;
