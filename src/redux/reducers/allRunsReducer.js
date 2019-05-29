const allRunsReducer = (state = [], action) => {
  switch (action.type) {

    case 'SET_RUNS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default allRunsReducer;