
const missionDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MISSION_DETAILS':
            const mission = {}
            mission.name = action.payload[0].name;
            mission.description = action.payload[0].description;
            mission.goals = action.payload;

            return mission;
    
        default:
            return state;
    }
}

export default missionDetails;