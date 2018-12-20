const Dojo = require("../models/Dojo");

// If you need to create a dojo, change this information and uncomment.
// I may add a page to create dojos from the dashboard in the future.
// For dojo_ID, just add 1 to the previous ID.

var dojoInfo = {
  name: "Toledo",
  street_address: "25 S. Huron St",
  city: "Toledo",
  state: "OH",
  zip: "43604",
  dojo_ID: "1",
  owner_email: ""
};


module.exports.createDojo = () => {
  const newDojo = new Dojo(dojoInfo);
  newDojo.save();
};
