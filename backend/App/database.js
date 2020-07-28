'use strict';
var mysql = require('mysql');

// Local mysql db connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'luraco',
  multipleStatements: true,
});

// Error handling
connection.connect(function(err) {
  if (err) throw err;
});

// Export SQL conn
module.exports = connection;