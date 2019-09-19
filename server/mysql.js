var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3307',
  user     : 'admin1',
  password : 'mom123',
  database : 'momdb'
});
 
connection.connect();
 
connection.query('SELECT * FROM USERS', function (error, results, fields) {
  if (error) {
      console.log(error);
  }
  console.log(results);
});
 
connection.end();