require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const SlackStrategy = require("passport-slack").Strategy;
// Import Routes
const dashboard = require("./routes/api/dashboard");
const signup = require("./routes/api/signup");
const attendance = require("./routes/api/attendance");
//Import Database
const db = require("./models/db");

// Passport Setup
passport.use(
  new SlackStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      scope: ["identity.basic", "identity.email"]
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  db.User.findOne({ slackID: id }, function(err, user) {
    done(err, user);
  });
});
app.use(passport.initialize());
app.use(passport.session());

// Use BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/dashboard", dashboard);
app.use("/api/signup", signup);
app.use("/api/attendance", attendance);

db.sequelize.sync({ force: false,  }).then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
