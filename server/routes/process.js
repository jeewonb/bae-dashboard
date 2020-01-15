var express = require("express");
var router = express.Router();
var _ = require("underscore");
var config = require("../serverconfig.js");
const mysql = require("mysql");

const connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) throw err;
});

/* GET systems listing. */
router.get("/", function(req, res, next) {
  connection.query("SELECT * FROM process", function(err, results, fields) {
    if (!err) {
      res.send(JSON.stringify(results));
    } else {
      console.log("Error while performing Query.");
    }
  });
});

router.post("/edit", function(req, res, next) {
  // execute the UPDATE statement
  connection.query(
    "UPDATE process SET NAME = ?, DESCRIPTION = ?, PATH = ?, EXE_FILE_NAME = ? WHERE ID = ?",
    [
      req.body.NAME,
      req.body.DESCRIPTION,
      req.body.PATH,
      req.body.EXE_FILE_NAME,
      req.body.ID
    ],
    function(error, results, fields) {
      if (!error) {
        res.send(JSON.stringify(results));
        console.log("Rows affected:", results.affectedRows);
      } else {
        console.log(error);
      }
    }
  );
});

router.post("/add", function(req, res, next) {
  connection.query(
    "INSERT INTO process (ID, NAME, DESCRIPTION, PATH, EXE_FILE_NAME ) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.ID,
      req.body.NAME,
      req.body.DESCRIPTION,
      req.body.PATH,
      req.body.EXE_FILE_NAME
    ],
    function(err, results, fields) {
      if (!err) {
        res.send(JSON.stringify(results));
        console.log(results);
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/delete", function(req, res, next) {
  connection.query("DELETE FROM process WHERE ID = ?", req.body.ID, function(
    error,
    results,
    fields
  ) {
    if (!error) {
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      console.log(error);
    }
  });
});

module.exports = router;
