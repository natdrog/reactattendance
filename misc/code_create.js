const date = require("date-and-time");

var now = new Date();
date.format(now, "YYYY-MM-DD");

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

module.exports.createCode = dojoID => {
  var codeInfo = {
    date: now,
    dojoID,
    code: genEventCode()
  };
  const WeekCode = new Week_Code(codeInfo);
};
