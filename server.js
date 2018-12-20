require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const SlackStrategy = require("passport-slack").Strategy;
// Import Functions
const dojoCreate = require("./misc/dojo_create");
const codeCreate = require("./misc/code_create");
const relationshipCreate = require("./misc/relationship_create");
// Import Database
const User = require("./models/User");
// Import Routes
const dashboard = require("./routes/api/dashboard");
const signup = require("./routes/api/signup");

// Express Setup

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
  User.findOne({ slack_ID: id }, function(err, user) {
    done(err, user);
  });
});
app.use(passport.initialize());
app.use(passport.session());

// Use BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log(err));

app.post("/test", (req, res) => {
  res.end("Post worked!");
});

// Use Routes
app.use("/api/dashboard", dashboard);
app.use("/api/signup", signup);

// Use External Function
//dojoCreate.createDojo();
//codeCreate.createCode();
//relationshipCreate.createRelationship();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
