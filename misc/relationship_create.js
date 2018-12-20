const Relationship = require("../models/Relationship");

// This is for creating a user relationship ( test purposes only )

var relationshipInfo = {
  person_1: "5bb8fc5bb80d7fd50e03120c",
  person_2: "5bb8fcf6c3df88d591ef74df",
  type: "Parent",
  access: "false"
};

module.exports.createRelationship = () => {
  const newRelationship = new Relationship(relationshipInfo);
  newRelationship.save();
};
