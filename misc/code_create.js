const Week_Code = require("../models/Week_Code");
const date = require("date-and-time");

var now = new Date();
date.format(now, "YYYY-MM-DD");

var codeInfo = {
  date: now,
  dojo_ID: "5bb8ea267f5a39d31927fd56",
  code: genEventCode()
};

//Generate event code.
function genEventCode() {
  return (
    "CD_" +
    Math.random()
      .toString(36)
      .substr(2, 4) +
    "-" +
    Math.random()
      .toString(36)
      .substr(3, 4)
  );
}

module.exports.createCode = () => {
  const WeekCode = new Week_Code(codeInfo);
  WeekCode.save();
};
