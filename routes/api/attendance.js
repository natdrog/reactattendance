require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../../models/db");

Date.prototype.toISODate = function() {
  return (
    this.getFullYear() +
    "-" +
    ("0" + (this.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + this.getDate()).slice(-2)
  );
};
var now = new Date().toISODate();

router.post("/attend", async (req, res) => {
  token = await checkToken(req.body.token);
  let weekCode = req.body.weekCode;
  if (!token) {
    console.log("{ success: false, err: 'Token is undefined', errno: '0' }");
    res.end("{ success: false, err: 'Token is undefined', errno: '0' }");
  } else {
    db.WeekCode.findOne({ where: { code: weekCode } })
      .then(found => {
        if (found === null) {
          console.log("Not found");
          res.end("{ success: false, err: 'Invalid Code', errno: '1' }");
        } else {
          console.log("week code found");
          if (found.dataValues.date == now) {
            console.log("week code correct date");
            db.User.findOne({ where: { slackID: token } })
              .then(user => {
                db.Attendance.findOrCreate({
                  where: { date: now, attendeeId: user.id },
                  defaults: {
                    date: now,
                    locationId: found.dataValues.DojoId,
                    attendeeId: user.id
                  }
                }).then(created => {
                  res.end('{"success": true}');
                });
              })
              .catch(err => {
                res.end(`{ success: 'false', err: ${err} }`);
              });
          }
        }
      })
      .catch(err => {
        res.end(`{ success: 'false', err: ${err} }`);
      });
  }
});

router.post("/getAttends", async (req, res) => {
  token = await checkToken(req.body.token);
  if (!token) {
    res.end('{"success": false, "err": "Token is undefined"}');
  } else {
    db.Attendance.findAll({ where: { attendeeId: req.body.id } })
      .then(attends => {
        res.end(`{"success": true, "attends": ${JSON.stringify(attends)}}`);
      })
      .catch(err => {
        res.end(`{ success: 'false', err: ${err} }`);
      });
  }
});

router.post("/getWeekCode", async (req, res) => {
  token = await checkToken(req.body.token);
  if (!token) {
    res.end('{"success": false, "err": "Token is undefined"}');
  } else {
    var tempcode = genEventCode();
    db.WeekCode.findOrCreate({
      where: { date: now },
      defaults: { date: now, code: tempcode, DojoId: "1" }
    })
      .then(code => {
        res.end(
          `{"success": true, "code": ${JSON.stringify(
            code[0].dataValues.code
          )}}`
        );
      })
      .catch(err => {
        res.end(`{ success: 'false', err: ${err} }`);
      });
  }
});

//Generate event code.
function genEventCode() {
  return (
    "CD-" +
    Math.random()
      .toString(36)
      .substr(2, 4) +
    "-" +
    Math.random()
      .toString(36)
      .substr(3, 4)
  );
}

async function checkToken(token) {
  return await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err === null) {
      return decoded.id;
    } else {
      return false;
    }
  });
}

module.exports = router;
