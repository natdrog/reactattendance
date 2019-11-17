import { combineReducers } from "redux";

import user from "./user";
import users from "./users";
import rel from "./relationships";
import attend from "./attendances";

export default combineReducers({
  user,
  users,
  rel,
  attend
});
