const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    firstName: String,
    lastName: String
  },
  email: {
    type: String,
    required: true
  },
  slack_ID: {
    type: String,
    required: true
  },
  rank: {
    type: Number,
    required: true,
    default: "0"
  },
  primary_dojo: {
    type: Schema.Types.ObjectId,
    ref: "Dojo",
    required: false
  },
  birthday: {
    type: Date,
    required: false
  }
});

module.exports = User = mongoose.model("User", UserSchema);
