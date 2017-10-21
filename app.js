/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const databaseConfig = require('./config/database.json');
const DB = require('./server/DB');
const Book = require('./server/Book');

const app = express();
app.use(express.static(`${__dirname}/dist`));
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  next();
});
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

const book = () => new Book(new DB(databaseConfig));
const onError = (error, res) => {
  res.status(500);
  res.json(error.message);
};

app.get('/api/', (_, res) => {
  book().all()
    .then(books => res.json(books))
    .catch(err => onError(err, res));
});

app.post('/api/', (req, res) => {
  book().create(req.body.title)
    .then(books => res.json(books))
    .catch(err => onError(err, res));
});

app.post('/api/:id/rate/inc', (req, res) => {
  book().incRate(req.params.id)
    .then(books => res.json(books))
    .catch(err => onError(err, res));
});

app.post('/api/:id/rate/dec', (req, res) => {
  book().decRate(req.params.id)
    .then(books => res.json(books))
    .catch(err => onError(err, res));
});

app.listen(3000, () => console.log('App listening on port 3000!'));
