let defaultState = 0;
const currentUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.payload;
    default:
      return state;
  }
};

export default currentUserReducer;
