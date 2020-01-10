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

/* GET systems listing. */
router.get('/', function (req, res, next) {
	connection.query('select * FROM users', function (err, results, fields) {
		if (!err) {
			res.send(JSON.stringify(results));
		} else {
			console.log('Error while performing Query.');
		}
	});
});

router.post('/edit', function (req, res, next) {
	// execute the UPDATE statement
	connection.query('update users set name = "' + req.body.name + '", email = "' + req.body.email + '", phone_number = "' + req.body.phone_number + '", date = "' + req.body.date + '", type = "' + req.body.type + '" where id = ' + Number(req.body.id), function (error, results, fields) {
		if (!error) {
			res.send(JSON.stringify(results));
		console.log('Rows affected:', results.affectedRows);
		} else {
			console.log(error);
		}
	});
});

router.post('/add', function (req, res, next) {
	connection.query('insert into users (name, email, phone_number, date, type) values ("' + req.body.name + '", "' + req.body.email + '", "' + req.body.phone_number + '", "' + req.body.date + '", "' + req.body.type + '")', function (err, results, fields) {
		if (!err) {
			res.send(JSON.stringify(results));
			console.log(results);
		} else {
			console.log(err);
		}
	});
});

router.post('/delete', function (req, res, next) {
	connection.query('delete from users where id = ' + Number(req.body.id), function (error, results, fields) {
		if (!error) {
			res.send(JSON.stringify(results));
			console.log(results);
		} else {
			console.log(error);
		}
	});
});

module.exports = router;
