// app.js
// Main module of the app.

'use strict';
require('dotenv').config();
const express = require('express');
const sass = require('node-sass-middleware');
const cors = require('cors');
const app = express();

// Imports Font Awesome
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));

// Use Sass
app.use(sass({
  src: __dirname + '/assets',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed',
}));

// Import public assets
app.use(express.static(__dirname + '/public'));

// Enable CORS
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// Mount the client page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

let dateInput, dateString, newDate, year, month, day;
app.get('/api/timestamp/', (req, res, next) => {
  if (req.query.date_string === '') {
    dateInput = new Date();
  } else {
    if (new Date(req.query.date_string) == 'Invalid Date') {
      res.json({ "error": "Invalid Date" });
    }
    dateInput = new Date(req.query.date_string);
    if (!dateInput.getTime()) {
      dateInput = new Date(parseInt(req.query.date_string));
    }
  }
  next();
}, (req, res) => {
    res.json({ "unix": dateInput.getTime(), "utc": dateInput.toUTCString() });
});

module.exports = app;
