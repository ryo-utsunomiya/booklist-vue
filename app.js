/* eslint-disable no-console */
const express = require('express');
const databaseConfig = require('./config/database.json');
const DB = require('./server/db');
const Book = require('./server/Book');

const app = express();
app.use(express.static(`${__dirname}/dist`));

app.get('/api/', (_, res) => {
  new Book(new DB(databaseConfig)).all()
    .then(books => res.json(books))
    .catch((error) => {
      res.status(500);
      res.json(error.message);
    });
});

app.listen(3000, () => console.log('App listening on port 3000!'));
