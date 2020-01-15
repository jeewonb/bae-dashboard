var express = require("express");
var router = express.Router();
var _ = require("underscore");
var config = require("../serverconfig.js");
const mysql = require("mysql");

const connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) throw err;
});

/* GET servers listing. */
router.get("/", function(req, res, next) {
  connection.query("select * FROM server", function(err, results, fields) {
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
    "UPDATE server SET DESCRIPTION = ?, IP = ?, INSTALL_LOC = ?, INSTALL_TIME = ?, OS_NAME = ?, OS_VERSION = ?, ONLINE_TIME = ? WHERE ID = ?",
    [
      req.body.DESCRIPTION,
      req.body.IP,
      req.body.INSTALL_LOC,
      req.body.INSTALL_TIME,
      req.body.OS_NAME,
      req.body.OS_VERSION,
      req.body.ONLINE_TIME,
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
    "INSERT INTO server ( ID, DESCRIPTION, IP, INSTALL_LOC, INSTALL_TIME, OS_NAME, OS_VERSION, ONLINE_TIME ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.ID,
      req.body.DESCRIPTION,
      req.body.IP,
      req.body.INSTALL_LOC,
      req.body.INSTALL_TIME,
      req.body.OS_NAME,
      req.body.OS_VERSION,
      req.body.ONLINE_TIME
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
  connection.query("DELETE FROM server WHERE ID = ?", req.body.id, function(
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
