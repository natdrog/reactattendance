require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const WeekCodes = require("../../models/Week_Code");
const date = require("date-and-time");

var now = new Date();
date.format(now, "YYYY-MM-DD");

router.post("/attend", async (req, res) => {
  token = await checkToken(req.body.token);
  let code = req.body.code;
  if (!token) {
    res.end({ success: "false", err: "Token is undefined", errno: "0" });
  } else {
    //console.log(user);
    WeekCodes.findOne({ code: code }).then(found => {
      if (found === null) {
        res.end({ success: "false", err: "Invalid Code", errno: "1" });
      } else {
        if (found.date === now) {
          res.end({ success: "true" });
          User.findOneAndUpdate(
            { slack_ID: token },
            { $push: { attendance_history: { $date: now, dojo: found._id } } }
          ).then(user);
        }
      }
    });
  }
});

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
