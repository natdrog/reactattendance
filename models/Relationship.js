const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RelationshipSchema = new Schema({
  person_1: {
    type: Schema.Types.ObjectId,
    required: true
  },
  person_2: {
    type: Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  access: {
    type: Boolean,
    required: true,
    default: "false"
  }
});

module.exports = Relationship = mongoose.model(
  "Relationship",
  RelationshipSchema
);
