export const setCurrentUser = user_id => {
  return {
    type: "SET_CURRENT_USER",
    payload: user_id
  };
};
