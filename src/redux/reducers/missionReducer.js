const missionDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_MISSION_DETAILS':
            return action.payload;
    
        default:
            return state;
    }
}

export default missionDetails;