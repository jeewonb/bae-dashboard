// just for mysql connection test

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: '10.81.34.99',
  port:  '3306',
  user: 'root',
  password: 'mom123',
  database:'mom'
});
 
connection.connect();
 
connection.query('SELECT * FROM USERS', function (error, results, fields) {
  if (error) {
      console.log(error);
  }
  console.log(results);
});
 
connection.end();