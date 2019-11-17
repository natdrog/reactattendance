let defaultState = [];

const relReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_REL":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default relReducer;
