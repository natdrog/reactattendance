const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WeekCodesSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  dojo_ID: {
    type: Schema.Types.ObjectId,
    ref: "Dojo"
  },
  code: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("Week_Code", WeekCodesSchema);
