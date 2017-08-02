import express from 'express';
import logger from 'morgan';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/my-app';

app.use(logger('dev'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.post('/register', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        var users = db.collection('users');
        users.insertOne({ email: req.body.email, password: req.body.password });
        db.close();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            message: 'registration successfull',
            email: req.body.email,
        }));
    });
});

app.listen(3000, () => {
  console.log('my app API listening on port 3000!');
});
