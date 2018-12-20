require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

router.get("/auth", passport.authenticate("slack"));

router.get(
  "/auth/callback",
  passport.authenticate("slack", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    var id = req.user.id;
    console.log(id);
    var token = jwt.sign({ id }, process.env.JWT_SECRET);
    res.redirect("http://localhost:3000?token=" + token);
  }
);
router.post("/getInfo", async (req, res) => {
  token = await checkToken(req.body.token);
  if (!token) {
    res.end({ success: "false", err: "Token is undefined" });
  } else {
    User.findOne({ slack_ID: token }, (err, user) => {
      res.end(JSON.stringify(user));
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
