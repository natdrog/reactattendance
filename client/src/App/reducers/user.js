let defaultState = {
  first_name: "",
  last_name: ""
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, first_name: action.payload };
    case "SET_LAST_NAME":
      return { ...state, last_name: action.payload };
    default:
      return state;
  }
};

export default userReducer;
