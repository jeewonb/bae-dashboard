var express = require('express');
var router = express.Router();
var _ = require('underscore');
var config = require('../serverconfig.js');
const mysql = require('mysql');

const connection = mysql.createConnection(config);

connection.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

/* GET users listing. */
router.get('/', function (req, res, next) {
	connection.query('SELECT * From users', function (err, results, fields) {
		if (!err) {
			res.send(JSON.stringify(results));
			// console.log(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});

router.post('/edit', function (req, res, next) {
	// execute the UPDATE statement
	
	connection.query('UPDATE USERS SET NAME = "' + req.body.name + '", EMAIL = "' + req.body.email + '" WHERE ID = ' + Number(req.body.id), function (error, results, fields) {
		if (!error) {
			res.send(JSON.stringify(results));
		console.log('Rows affected:', results.affectedRows);
		} else {
			console.log(error);
		}
	});
});

router.post('/add', function (req, res, next) {
	connection.query('insert into users (name, email, bloodGroup, phone_number, dob) values ("' + req.body.name + '", "' + req.body.email + '", "' + req.body.bloodGroup + '", "' + req.body.phone_number + '", "' + req.body.dob + '")', function (err, results, fields) {
		if (!err) {
			res.send(JSON.stringify(results));
			console.log(results);
		} else {
			console.log(err);
		}
	});
});

router.post('/delete', function (req, res, next) {
	connection.query('DELETE from users where id = ' + Number(req.params.id), function (error, results, fields) {
		if (!error) {
			res.send(JSON.stringify(results));
			console.log(results);
		} else {
			console.log(error);
		}
	});
});

module.exports = router;
