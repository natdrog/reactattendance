let defaultState = [];

const attendReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_ATTEND":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default attendReducer;
