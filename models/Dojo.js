const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DojoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  street_address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  owner_email: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model("Dojo", DojoSchema);
