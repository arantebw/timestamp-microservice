// app.js
// Main module of the app.

'use strict';

require('dotenv').config();
const express = require('express');
const sass = require('node-sass-middleware');

const app = express();

// Font Awesome
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));

// Sass
app.use(sass({
  src: __dirname + "/assets",
  dest: __dirname + "/public",
  debug: true,
  outputStyle: "compressed",
}));

app.use(express.static(__dirname + "/public"));

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// So that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

module.exports = app;
