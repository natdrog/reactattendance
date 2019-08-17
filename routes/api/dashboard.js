require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../../models/db");

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
    res.end('{"success": false, "err": "Token is undefined"}');
  } else {
    db.User.findOne({ where: { slackID: token } }).then(user => {
      res.end(JSON.stringify(user));
    });
  }
});

router.post("/getList", async (req, res) => {
  token = await checkToken(req.body.token);
  if (!token) {
    res.end('{"success": false, "err": "Token is undefined"}');
  } else {
    db.User.findAll({ where: { position: req.body.position } }).then(users => {
      res.end(`{"success": true, "users": ${JSON.stringify(users)}}`);
    });
  }
});

router.post("/getUser", async (req, res) => {
  token = await checkToken(req.body.token);
  if (!token) {
    res.end('{"success": false, "err": "Token is undefined"}');
  } else {
    db.User.findOne({ where: { id: req.body.id } }).then(async user => {
      if (req.body.relationships === true) {
        relationships = await getRelationships(req.body.id);
        res.end(
          `{"success": true, "user": ${JSON.stringify(
            user
          )}, "relationships": ${JSON.stringify(relationships)}}`
        );
      } else {
        res.end(`{"success": true, "user": ${JSON.stringify(user)}}`);
      }
    });
  }
});

async function getRelationships(id) {
  return await db.Relationship.findAll({
    include: [
      {
        model: db.User,
        as: "person2"
      }
    ],
    where: { person1Id: id }
  }).then(rels => {
    return rels;
  });
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
