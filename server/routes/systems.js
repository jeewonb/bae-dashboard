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
	connection.query('SELECT * FROM Systems', function (err, results, fields) {
		if (!err) {
			res.send(JSON.stringify(results));
		} else {
			console.log('Error while performing Query.');
		}
	});
});

router.post('/edit', function (req, res, next) {
	// execute the UPDATE statement
	
	connection.query('UPDATE Systems SET NAME = "' + req.body.name + '", DESCRIPTION = "' + req.body.description + '" WHERE ID = "' + req.body.id + '"', function (error, results, fields) {
		if (!error) {
			res.send(JSON.stringify(results));
		console.log('Rows affected:', results.affectedRows);
		} else {
			console.log(error);
		}
	});
});

router.post('/add', function (req, res, next) {
	connection.query('INSERT INTO Systems (ID, NAME, DESCRIPTION) values ("' + req.body.id + '", "' + req.body.name + '", "' + req.body.description + '")', function (err, results, fields) {
		if (!err) {
			res.send(JSON.stringify(results));
			console.log(results);
		} else {
			console.log(err);
		}
	});
});

router.post('/delete', function (req, res, next) {
	connection.query('DELETE FROM Systems WHERE ID = "' + req.params.id + '"', function (error, results, fields) {
		if (!error) {
			res.send(JSON.stringify(results));
			console.log(results);
		} else {
			console.log(error);
		}
	});
});

module.exports = router;
