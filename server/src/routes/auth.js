import express from 'express';
import mongodb from 'mongodb';
import { mongo_url } from '../config.js';

const router = express.Router();
const MongoClient = mongodb.MongoClient;

router.post('/register', (req, res) => {
    MongoClient.connect(mongo_url, function(err, db) {
        const users = db.collection('users');
        users.insertOne({ email: req.body.email, password: req.body.password });
        db.close();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            message: 'registration successfull',
            email: req.body.email,
        }));
    });
});

export default router;
