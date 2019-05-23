const missionReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_MISSIONS':
        //   console.log('action.payload', action.payload[0].mission_id);
        //   let array = action.payload;
        //   let count = 0;
        //   for (let i = 0; i < array.length; i++) {
        //     if (array[i].mission_id === count)
              
        //   }
          
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default missionReducer;