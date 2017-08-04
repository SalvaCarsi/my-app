import express from 'express';
import bodyParser from 'body-parser';
import auth from './routes/auth';

const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

// API routes mapping
app.use('/auth', auth);

app.listen(3000, () => {
  console.log('my app API listening on port 3000!');
});
