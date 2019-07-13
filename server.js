// server.js

'use strict';
const app = require('./app');

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Listening on port http://localhost:' + listener.address().port);
});
