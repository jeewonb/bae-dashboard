// just for mysql connection test

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port:  '3307',
  user: 'root',
  password: 'mom123',
  database:'momdb'
});
 
connection.connect();
 
connection.query('SELECT * FROM USERS', function (error, results, fields) {
  if (error) {
      console.log(error);
  }
  console.log(results);
});
 
connection.end();