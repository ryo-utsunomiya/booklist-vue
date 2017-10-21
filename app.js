/* eslint-disable no-console */
const express = require('express');
const databaseConfig = require('./config/database.json');
const DB = require('./server/DB');
const Book = require('./server/Book');

const app = express();
app.use(express.static(`${__dirname}/dist`));
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With');
  next();
});

const book = () => new Book(new DB(databaseConfig));

app.get('/api/', (_, res) => {
  book().all()
    .then(books => res.json(books))
    .catch((error) => {
      res.status(500);
      res.json(error.message);
    });
});

app.listen(3000, () => console.log('App listening on port 3000!'));
