var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
var morganLogger = require('morgan');

var url = 'mongodb://localhost:27017/my-app';

app.use(logger('dev'));

app.post('/register', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        var users = db.collection('users');
        users.insertOne({ name: "salva", password: "test1234" });
        db.close();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ message: 'user inserted' }));
    });
});

app.listen(3000, function () {
  console.log('my app API listening on port 3000!');
});
