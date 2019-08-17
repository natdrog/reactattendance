let defaultState = {
  firstName: "",
  lastName: "",
  rank: 0,
  userID: ""
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_RANK":
      return { ...state, rank: action.payload };
    case "SET_USER_ID":
      return { ...state, userID: action.payload };
    default:
      return state;
  }
};

export default userReducer;
