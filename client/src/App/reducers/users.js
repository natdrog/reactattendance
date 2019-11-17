let defaultState = {};

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return Object.assign(state, action.payload);
    default:
      return state;
  }
};

export default usersReducer;
