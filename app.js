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
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// Mount the client page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

let date, dateString, newDate, year, month, day;
app.get('/api/timestamp/', (req, res, next) => {
  // Check date validity
  if (new Date(req.query.date_string) == 'Invalid Date') {
    res.json({'error': 'Invalid Date'});
  } else {
    if (req.query.date_string === '') {
      dateString = new Date();
      year = parseInt(dateString.getFullYear());
      month = parseInt(dateString.getMonth());
      day = parseInt(dateString.getDate());
    } else {
      // If date_string is yyyy-mm-dd format
      dateString = req.query.date_string.split('-');
      year = parseInt(dateString[0]);
      month = parseInt(dateString[1] - 1);
      day = parseInt(dateString[2]);
    }
    newDate = new Date(Date.UTC(year, month, day));
    next();
  }
}, (req, res) => {
  res.json({"unix": newDate.getTime(), "utc": newDate.toUTCString()});
});

module.exports = app;
